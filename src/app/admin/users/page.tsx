'use client'
import style from './style.module.scss'
import { useEffect, useState } from 'react'
import { UserAuth } from '@/context/AuthContext'
import LoadingPage from '@/app/loading'
import { getAllUsers, UserType } from '@/services/user'

export default function Page() {
  const { user } = UserAuth()
  const [users, setUsers] = useState<UserType[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      const data = await getAllUsers()
      setUsers(data)
      setLoading(false)
    })()
  }, [user])

  return (
    <div className={style.users}>
      <h1 className={style.users_title}>Nuestros Usuarios</h1>

      <table className={style.users_table}>
        <thead>
          <tr>
            <td>Nombre</td>
            <td>Correo</td>
            <td>Telefono</td>
            <td>Rol</td>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <LoadingPage />
          ) : (
            users.map((user, i) => (
              <tr key={i}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phoneNumber}</td>
                <td>{user.rol}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
