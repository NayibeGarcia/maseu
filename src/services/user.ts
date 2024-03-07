import { collection, addDoc, query, getDocs, where } from 'firebase/firestore'
import { db } from '@/firebase'

export interface UserType {
  id?: string
  userId?: string
  name: string
  lastname: string
  document: number
  typeDocument: string
  dataTreatment: boolean
  conditionsTerms: boolean
  email: string
  phoneNumber: number
  rol?: string
  completed?: boolean
  photoUrl?: string
}

export const saveUser = async (user: UserType) => {
  try {
    await addDoc(collection(db, 'users'), user)
  } catch (e) {
    console.error('Error adding document: ', e)
  }
}

export const getUserByEmail = async (
  email: string | null | undefined
): Promise<UserType[]> => {
  if (email === null || email === undefined) return []
  try {
    const q = query(collection(db, 'users'), where('email', '==', email))

    const querySnapshot = await getDocs(q)

    const quotesData = querySnapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() } as UserType)
    )

    return quotesData
  } catch (e) {
    console.error('Error getting documents: ', e)
    throw e
  }
}

export const getAllUsers = async (): Promise<UserType[]> => {
  try {
    const q = query(collection(db, 'users'))

    const querySnapshot = await getDocs(q)

    const quotesData = querySnapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() } as UserType)
    )

    return quotesData
  } catch (e) {
    console.error('Error getting documents: ', e)
    throw e
  }
}
