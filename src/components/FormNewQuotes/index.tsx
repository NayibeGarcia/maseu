'use client'
import { useState } from 'react'
import Modals from '../Modals'
import style from './style.module.scss'
import { Button } from '@nextui-org/react'
import { UserType, getUserByEmail, saveUser } from '@/services/user'
import { QuoteType, saveData } from '@/services/crud'

interface FormType {
  name: string
  email: string
  phoneNumber: number
  rol?: string
  userId?: string
  servicio: string
  requestContent: string
  requestAnswer: string
  quotePrice: string
}

const InitialValueForm = {
  name: '',
  email: '',
  phoneNumber: 0,
  rol: '',
  userId: '',
  servicio: '',
  requestContent: '',
  requestAnswer: '',
  quotePrice: '',
}

const FormNewQuotes = () => {
  const [values, setValue] = useState<FormType>(InitialValueForm)
  const [user, setUser] = useState<UserType | null>(null)
  const [createUser, setCreateUser] = useState(false)

  const getUserAndSave = async (createUser = true) => {
    const fireUsers = await getUserByEmail(values.email)

    if (fireUsers.length) {
      const fireUser = fireUsers[0]
      setUser(fireUser)
      setValue({
        ...values,
        email: fireUser.email,
        name: fireUser.name,
        phoneNumber: fireUser.phoneNumber,
        rol: fireUser.rol,
        userId: fireUser.userId,
      })
      !createUser && setCreateUser(false)
    } else {
      setCreateUser(createUser)
    }
  }

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target

    setValue({
      ...values,
      [name]: value,
    })
  }

  const handleSubmitEmail = async (e: React.FormEvent) => {
    e.preventDefault()
    getUserAndSave()
  }

  const handleSubmitUser = async (e: React.FormEvent) => {
    e.preventDefault()
    const newUser = {
      name: values.name,
      phoneNumber: values.phoneNumber,
      email: values.email,
      rol: 'cliente',
      userId: '',
    }

    await saveUser(newUser)
    getUserAndSave(false)
  }

  const handleSubmit = async (e: React.FormEvent, callback: () => void) => {
    e.preventDefault()

    const newQuote: QuoteType = {
      userId: values.userId ?? '',
      name: values.name,
      userEmail: values.email,
      servicio: values.servicio,
      quoteDate: new Date(),
      answerDate: new Date(),
      requestContent: values.requestContent,
      requestAnswer: values.requestAnswer,
      state: 'abierto',
      quotePrice: values.quotePrice,
      cupon: '',
    }
    await saveData(newQuote)
    setValue(InitialValueForm)
    setUser(null)
    callback()
  }

  return (
    <Modals
      title={'Crear Solicitud para un usuario'}
      showBtn={true}
      blockClass="newquote"
      buttonText="Cotizar"
    >
      {(onClose) => (
        <>
          {user || createUser ? (
            createUser ? (
              <form onSubmit={handleSubmitUser}>
                <p className={style.form_sign_title}>Crear Usuario</p>

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

                <Button
                  type="button"
                  color="danger"
                  onClick={() => {
                    onClose()
                    setUser(null)
                    setCreateUser(false)
                    setValue(InitialValueForm)
                  }}
                >
                  Cancelar
                </Button>
                <Button type="submit">Crear Usuario</Button>
              </form>
            ) : (
              <div>
                <p className={style.form_sign_title}>Crear contizacion</p>
                <div>
                  <p>Nombre: {values.name}</p>
                  <p>Email: {values.email}</p>
                  <p>Numero: {values.phoneNumber}</p>
                </div>
                <form
                  className={style.form_sign}
                  onSubmit={(e) => handleSubmit(e, onClose)}
                >
                  <div className={style.form_quotes_text}>
                    <label htmlFor="servicio">servicio.</label>
                    <input
                      type="text"
                      id="servicio"
                      name="servicio"
                      value={values.servicio}
                      onChange={handleChange}
                      placeholder="Nombre del Servicio"
                      required
                    />
                  </div>

                  <div className={style.form_quotes_text}>
                    <label htmlFor="requestContent">
                      Solicitud del cliente.
                    </label>
                    <textarea
                      id="requestContent"
                      name="requestContent"
                      value={values.requestContent}
                      onChange={handleChange}
                      placeholder="Solicitud del cliente..."
                      required
                    />
                  </div>

                  <div className={style.form_quotes_text}>
                    <label htmlFor="requestAnswer">Cotizacion.</label>
                    <textarea
                      id="requestAnswer"
                      name="requestAnswer"
                      value={values.requestAnswer}
                      onChange={handleChange}
                      placeholder="Cotizacion..."
                      required
                    />
                  </div>

                  <div className={style.form_quotes_text}>
                    <label htmlFor="quotePrice">Precio.</label>
                    <input
                      type="text"
                      id="quotePrice"
                      name="quotePrice"
                      value={values.quotePrice}
                      onChange={handleChange}
                      placeholder="Nombre del Servicio"
                      required
                    />
                  </div>

                  <Button
                    type="button"
                    color="danger"
                    onClick={() => {
                      onClose()
                      setUser(null)
                      setValue(InitialValueForm)
                    }}
                  >
                    Cancelar
                  </Button>
                  <Button type="submit">Crear Cotizacion</Button>
                </form>
              </div>
            )
          ) : (
            <div className={style.form}>
              <form className={style.form_quotes} onSubmit={handleSubmitEmail}>
                <div className={style.form_quotes_email}>
                  <label htmlFor="email">Ingresa el correo del cliente:</label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                  />
                </div>
                <Button type="submit">Enviar</Button>
              </form>
            </div>
          )}
        </>
      )}
    </Modals>
  )
}

export default FormNewQuotes
