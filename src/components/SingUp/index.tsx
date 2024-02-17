'use client'
import { useState } from 'react'
import { UserAuth } from '@/context/AuthContext'
import style from './style.module.scss'
import { UserType, saveUser } from '@/services/user'
import { useRouter } from 'next/navigation'

const InitialValueForm: UserType = {
  name: '',
  phoneNumber: 0,
  email: '',
}

const SingUp = () => {
  const { user } = UserAuth()
  const [values, setValue] = useState<UserType>({
    ...InitialValueForm,
    email: user?.email ?? '',
  })
  const router = useRouter()
  console.log(user)

  if (user?.completed) {
    router.push('/')
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    setValue({
      ...values,
      [name]: value,
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const newUser = {
      name: values.name,
      phoneNumber: values.phoneNumber,
      email: user?.email ?? '',
      rol: 'cliente',
      userId: user?.id,
    }

    await saveUser(newUser)
    window.location.href = '/'
  }
  return (
    <div className={style.form_container}>
      <form className={style.form_sign} onSubmit={handleSubmit}>
        <p className={style.form_sign_title}>Terminemos tu registro</p>

        <div className={style.form_sign_input}>
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            id="name"
            name="name"
            value={values.name}
            onChange={handleChange}
            placeholder="Ingresa tu nombre"
            required
          />
        </div>
        <div className={style.form_sign_input}>
          <label htmlFor="email">Correo</label>
          <input
            type="text"
            id="name"
            name="email"
            value={values.email}
            disabled
            onChange={handleChange}
            placeholder=""
            required
          />
        </div>
        <div className={style.form_sign_input}>
          <label htmlFor="phoneNumber">Numero celular</label>
          <input
            type="number"
            id="phoneNumber"
            name="phoneNumber"
            value={values.phoneNumber}
            onChange={handleChange}
            placeholder="Ingresa tu numero"
            required
          />
        </div>
        <button style={{ border: 'solid #000 1px' }} type="submit">
          Terminar Registro
        </button>
      </form>
    </div>
  )
}

export default SingUp
