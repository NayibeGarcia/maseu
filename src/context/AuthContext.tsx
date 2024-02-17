'use client'
import { useContext, createContext, useState, useEffect } from 'react'
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  User,
} from 'firebase/auth'
import { auth } from '../firebase'
import { useRouter } from 'next/navigation'
import { UserType, getUserByEmail } from '@/services/user'

interface authContextType {
  user: UserType | null
  isAdmin: boolean
  googleSignIn: () => void
  logOut: () => void
}

const AuthContext = createContext<authContextType | null>(null)
export const UserAuth = () => useContext(AuthContext) as authContextType

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const router = useRouter()
  const [user, setUser] = useState<UserType | null>(null)
  const isAdmin = true

  const googleSignIn = () => {
    if (user && !user?.completed) {
      router.push('/signup')
      return
    }
    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider)
  }

  const logOut = () => {
    signOut(auth)
    router.push('/')
  }

  useEffect(() => {
    let firstTime = true
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      ;(async () => {
        const data = await getUserByEmail(currentUser?.email)
        console.log({ currentUser })

        if (!firstTime && currentUser && !data.length) {
          router.push('/signup')
        }
        if (currentUser) {
          setUser({
            ...data[0],
            id: currentUser.uid,
            email: currentUser.email ?? '',
            completed: !!data.length,
            photoUrl: currentUser.photoURL ?? '',
          })
        } else {
          setUser(null)
        }
        firstTime = false
      })()
    })

    return () => unsubscribe()
  }, [router])

  return (
    <AuthContext.Provider value={{ user, googleSignIn, logOut, isAdmin }}>
      {children}
    </AuthContext.Provider>
  )
}
