'use client'
import { useEffect, useState } from 'react'
import Modals from '../Modals'
import style from './style.module.scss'
import { UserType, getUserByEmail, saveUser } from '@/services/user'
import { QuoteType, saveData } from '@/services/crud'
import { ServicesType, getAllServices } from '@/services/servicios'

interface FormType {
  name: string
  email: string
  phoneNumber: number | string
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
  phoneNumber: '',
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
  const [services, setServices] = useState<ServicesType[]>([])

  useEffect(() => {
    const getServices = async () => {
      const data = await getAllServices()
      setServices(data)
    }

    getServices()
  }, [])

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
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
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
      phoneNumber: Number(values.phoneNumber),
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
      buttonText="Nueva Cotización"
    >
      {(onClose) => (
        <>
          {user || createUser ? (
            createUser ? (
              <form
                className={`${style.form_quotes} ${style.form_create}`}
                onSubmit={handleSubmitUser}
              >
                <label>
                  Nombre:
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    placeholder="Ingresa tu nombre"
                    required
                  />
                </label>

                <label>
                  Correo:
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
                </label>

                <label>
                  Número celular:
                  <input
                    type="number"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={values.phoneNumber}
                    onChange={handleChange}
                    placeholder="Ingresa tu numero"
                    required
                  />
                </label>

                <div>
                  <button
                    className={style.form_create_cancel}
                    type="button"
                    onClick={() => {
                      onClose()
                      setUser(null)
                      setCreateUser(false)
                      setValue(InitialValueForm)
                    }}
                  >
                    Cancelar
                  </button>
                  <button
                    className='primary_btn'
                    type="submit"
                    disabled={values.name === '' || values.phoneNumber === ''}
                  >
                    Crear Usuario
                  </button>
                </div>

              </form>
            ) : (
              <section>
                <div className={style.form_data}>
                  <p>Nombre: {values.name}</p>
                  <p>Email: {values.email}</p>
                  <p>Número telefónico: {values.phoneNumber}</p>
                </div>

                <form
                  className={`${style.form_quotes} ${style.form_create}`}
                  onSubmit={(e) => handleSubmit(e, onClose)}
                >
                  <label htmlFor="servicio">
                    servicio:
                    <select name="servicio" onChange={handleChange}>
                      {services.map(({ title }) => (
                        <option
                          key={title}
                          value={title}
                        >{title}</option>
                      ))}
                    </select>
                  </label>

                  <label>
                    Solicitud del cliente:
                    <textarea
                      id="requestContent"
                      rows={1}
                      name="requestContent"
                      value={values.requestContent}
                      onChange={handleChange}
                      placeholder="Solicitud del cliente..."
                      required
                    />
                  </label>

                  <label>
                    Cotizacion:
                    <textarea
                      id="requestAnswer"
                      rows={1}
                      name="requestAnswer"
                      value={values.requestAnswer}
                      onChange={handleChange}
                      placeholder="Cotizacion..."
                      required
                    />
                  </label>

                  <label>
                    Precio:
                    <input
                      type="text"
                      id="quotePrice"
                      name="quotePrice"
                      value={values.quotePrice}
                      onChange={handleChange}
                      placeholder="Precio del Servicio"
                      required
                    />
                  </label>

                  <div>
                    <button
                      className={style.form_create_cancel}
                      type="button"
                      onClick={() => {
                        onClose()
                        setUser(null)
                        setValue(InitialValueForm)
                      }}
                    >
                      Cancelar
                    </button>
                    <button
                      className='primary_btn'
                      type="submit"
                      disabled={
                        values.requestContent === '' ||
                        values.requestAnswer === '' ||
                        values.quotePrice === ''
                      }
                    >Crear Cotizacion</button>
                  </div>
                </form>
              </section>
            )
          ) : (
            <form className={style.form_quotes} onSubmit={handleSubmitEmail}>
              <label>
                Ingresa el correo del cliente:
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  placeholder="Email"
                  required
                />
              </label>
              <button className='primary_btn' type="submit">Enviar</button>
            </form>
          )}
        </>
      )}
    </Modals>
  )
}

export default FormNewQuotes
