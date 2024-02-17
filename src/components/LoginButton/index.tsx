'use client'
import { UserAuth } from '@/context/AuthContext'
import { Button } from '@nextui-org/react'
import style from './style.module.scss'

const LoginButton = () => {
  const { googleSignIn, user } = UserAuth()

  if (user && !user.completed) {
    return (
      <div className={style.login_button}>
        <p>Debes completar tu perfil para poder continuar</p>
        <Button onClick={googleSignIn} className={style.login_button_complete}>
          Completar perfil
        </Button>
      </div>
    )
  }

  return (
    <div className={style.login_button}>
      <p>Debes iniciar sesion para continuar con el proceso</p>
      <Button onClick={googleSignIn} className={style.login_button_login}>
        Iniciar sesion
      </Button>
    </div>
  )
}

export default LoginButton
