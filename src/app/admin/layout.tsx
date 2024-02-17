'use client'
import LoginButton from '@/components/LoginButton'
import { UserAuth } from '@/context/AuthContext'
import style from './style.module.scss'
import Link from 'next/link'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { user } = UserAuth()

  if (!user)
    return (
      <div>
        <LoginButton />
      </div>
    )

  if (user.rol !== 'admin') return <p>Lo sentimos no tienes permisos</p>
  return (
    <div className={style.admin_layout}>
      <h1 className={style.admin_layout_title}>
        Administracion de cotizaciones
      </h1>
      <nav>
        <ul style={{ display: 'flex', gap: '20px' }}>
          <li>
            <Link href="/admin">Admin</Link>
          </li>
          <li>
            <Link href="/admin/users">Usuarios</Link>
          </li>
          <li>
            <Link href="/admin/quotes">Cotizaciones</Link>
          </li>
        </ul>
      </nav>
      {children}
    </div>
  )
}
