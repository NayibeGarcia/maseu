'use client'
import { useEffect, useState } from 'react'
import { UserAuth } from '@/context/AuthContext'
import LoginButton from '../LoginButton'
import Modals from '../Modals'
import { saveData } from '@/services/crud'
import { toast } from 'sonner'
import { Button } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { SlPaperClip } from 'react-icons/sl'
import StarRating from '../StarRating'
import style from './style.module.scss'
import { RatingType, getRatingByEmail, saveRating } from '@/services/ratings'

interface FormType {
  rating: number
  text: string
}
interface StateType {
  loading: boolean
  rating: RatingType | null
}

const InitialValueForm = {
  rating: 0,
  text: '',
}

const Ratings = () => {
  const [values, setValue] = useState<FormType>(InitialValueForm)
  const [state, setState] = useState<StateType>({
    loading: false,
    rating: null,
  })
  const { user } = UserAuth()

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target

    setValue({
      ...values,
      [name]: value,
    })
  }

  const handleStart = (e: number) => {
    setValue({ ...values, rating: e })
  }

  const handleSubmit = async (e: React.FormEvent, onClose: () => void) => {
    setState({ ...state, loading: true })
    e.preventDefault()
    saveRating({
      ...values,
      email: user?.email,
      name: user?.name ?? '',
      show: false,
      photoUrl: user?.photoUrl ?? '',
    })
    setValue(InitialValueForm)
    onClose()
    setState({ ...state, loading: false })
  }

  useEffect(() => {
    const getRating = async () => {
      const rts = await getRatingByEmail(user?.email)
      setState({ ...state, rating: rts })
    }
    getRating()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  return (
    <Modals
      buttonText={`${
        state.rating ? 'Mira tu calificacion' : 'Califia nuestro servicio'
      }`}
      title={'Solicitud de cotizacion'}
      showBtn={false}
    >
      {(onClose) => (
        <div className={style.rating}>
          {state.rating ? (
            <div>
              <div>
                La calificacion que nos otorgastes
                <StarRating stars={state.rating.rating} />
              </div>
              <div>{state.rating.text}</div>
              <Button onClick={onClose}>Cerrar</Button>
            </div>
          ) : (
            <form onSubmit={(e) => handleSubmit(e, onClose)}>
              <label htmlFor="rating">Calificanos</label>
              <StarRating onChange={handleStart} />
              <div className="flex flex-col">
                <label htmlFor="text">Cuentanos tu experiencia</label>
                <textarea
                  id="text"
                  name="text"
                  value={values.text}
                  onChange={handleChange}
                  placeholder="Ingresa tu numero"
                  required
                  className="border-black"
                />
              </div>
              <Button color="danger" type="button" onClick={onClose}>
                Cancelar
              </Button>
              <Button disabled={state.loading} type="submit">
                {state.loading ? 'Enviando...' : 'Enviar'}
              </Button>
            </form>
          )}
        </div>
      )}
    </Modals>
  )
}

export default Ratings
