'use client'
import LoginButton from '@/components/LoginButton'
import { UserAuth } from '@/context/AuthContext'
import { usePathname } from 'next/navigation'
import style from './style.module.scss'
import Link from 'next/link'

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { user } = UserAuth()
  const pathname = usePathname()
  const active = pathname.split('/')[2]


  if (!user) {
    <div><LoginButton /></div>
  }

  if (user?.rol !== 'admin') {
    return <p>Lo sentimos no tienes permisos</p>
  }

  return (
    <div className={style.admin_layout}>
      <h1 className={style.admin_layout_title}>
        Administración de cotizaciones
      </h1>

      <nav className={style.admin_layout_nav}>
        <ul>
          <li className={active === 'quotes' ? style.admin_layout_active : ''}>
            <Link href="/admin/quotes">Cotizaciones</Link>
          </li>
          <li className={active === 'users' ? style.admin_layout_active : ''}>
            <Link href="/admin/users">Usuarios</Link>
          </li>
          <li className={active === 'ratings' ? style.admin_layout_active : ''}>
            <Link href="/admin/ratings">Calificaciones</Link>
          </li>
        </ul>
      </nav>
      {children}
    </div>
  )
}
