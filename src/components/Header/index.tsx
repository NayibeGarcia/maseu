'use client'
import Link from 'next/link'
import style from './styles.module.scss'
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Avatar,
} from '@nextui-org/react'
import { UserAuth } from '@/context/AuthContext'
import './style.css'

const Header = () => {
  const { googleSignIn, user, logOut } = UserAuth()

  return (
    <header className={style.header}>
      <Link href="/">
        <img
          className={style.logo}
          src="https://www.mantenimientoseu.com/images/logo-mantenimientoseu-horizontal.png"
          alt="Logo"
        />
      </Link>
      <Dropdown className={style.header_drop}>
        <DropdownTrigger>
          <Button className={style.header_menu_btn}>
            {user?.completed ? (
              <>
                <Avatar size="sm" src={user?.photoUrl} />
                Hola, <strong>{user.name.split(' ')[0]}</strong>
              </>
            ) : (
              'Menu'
            )}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.25rem"
              height="1.25rem"
              fill="currentColor"
              viewBox="0 0 256 256"
            >
              <rect width="16rem" height="16rem" fill="none"></rect>
              <path d="M215.39111,92.93848A8.00015,8.00015,0,0,0,208,88H48a8,8,0,0,0-5.65674,13.657l80,79.99976a7.99945,7.99945,0,0,0,11.31348,0l80-79.99976A8.00011,8.00011,0,0,0,215.39111,92.93848Z"></path>
            </svg>
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          disabledKeys={[
            user === null ? 'signUp' : '',
            user?.rol !== 'admin' ? 'admin' : '',
          ]}
          aria-label="Static Actions"
        >
          <DropdownItem key="home">
            <Link className={style.header_links} href="/">
              Inicio
            </Link>
          </DropdownItem>
          <DropdownItem key="ayuda">
            <Link className={style.header_links} href="/ayuda">
              Centro de ayuda
            </Link>
          </DropdownItem>
          {user?.completed ? (
            <DropdownItem key="account">
              <Link className={style.header_links} href="/account">
                Mis Solicitudes
              </Link>
            </DropdownItem>
          ) : (
            <DropdownItem key="signUp">
              <Link className={style.header_links} href="/signup">
                Completar Registro
              </Link>
            </DropdownItem>
          )}

          <DropdownItem className={style.header_admin} key="admin">
            <Link className={style.header_links} href="/admin">
              Admin
            </Link>
          </DropdownItem>
          {user?.id ? (
            <DropdownItem
              key="logOut"
              className={style.header_logout}
              onPress={logOut}
            >
              Cerrar Sesion
            </DropdownItem>
          ) : (
            <DropdownItem key="login" onPress={googleSignIn} className={style.header_login}>
              Iniciar Sesion
            </DropdownItem>
          )}
        </DropdownMenu>
      </Dropdown>
    </header>
  )
}

export default Header
