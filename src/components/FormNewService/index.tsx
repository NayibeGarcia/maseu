import { useState } from "react"
import Modals from "../Modals"
import { toast } from "sonner"
import style from './style.module.scss'

const FormNewService = () => {
  const [data, setData] = useState({
    title: '',
    description: '',
    top: false,
    active: false
  })


  const handleServiceChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target

    if (name === 'top') {
      setData({ ...data, top: !data.top })
    } else if (name === 'active') {
      setData({ ...data, active: !data.active })
    } else {
      setData({ ...data, [name]: value })
    }
  }

  const uService = {}

  const handleSubmit = (e: React.FormEvent | any, callback: () => void) => {
    e.preventDefault()

    // updateServices(props.id as string, uService)
    callback()
    toast("Se actualizo la solicitud")
    setData({
      title: '',
      description: '',
      top: false,
      active: false
    })
  }

  const handleClose = (closeModal: () => void) => {
    closeModal()
    setData({
      title: '',
      description: '',
      top: false,
      active: false
    })
  }

  return (
    <Modals
      title={'Crear nuevo servicio'}
      showBtn={true}
      blockClass="newService"
      buttonText="Nuevo Servicio"
    >
      {(onClose) => (
        <form onSubmit={(e) => handleSubmit(e, onClose)} className={style.form_service}>
          <div className={style.content_input}>
            <label htmlFor="service">Servicio:</label>
            <input
              type="text"
              id="service"
              name="title"
              value={data.title}
              onChange={handleServiceChange}
              placeholder="Servicio"
              required
            />
          </div>

          <div>
            <label htmlFor="quote">Descripción:</label>
            <textarea
              id="description"
              name="description"
              value={data.description}
              rows={2}
              onChange={handleServiceChange}
              placeholder="Descripcion"
              required
            />
          </div>

          <div className={style.row}>
            <div className={style.content_checks}>
              <label htmlFor="quote">Top:</label>
              <input
                id="top"
                name="top"
                type="checkbox"
                onChange={handleServiceChange}
                checked={data.top}
              />
            </div>

            <div className={style.content_checks}>
              <label htmlFor="quote">Activo:</label>
              <input
                id="active"
                name="active"
                type="checkbox"
                onChange={handleServiceChange}
                checked={data.active}
              />
            </div>
          </div>

          <div className={style.content_buttons}>
            <button
              className={style.btn_cancel}
              type="button"
              onClick={() => handleClose(onClose)}
            >
              Cancelar
            </button>

            <button className='primary_btn' type="submit">Enviar</button>
          </div>
        </form>
      )}
    </Modals>
  )
}

export default FormNewService
