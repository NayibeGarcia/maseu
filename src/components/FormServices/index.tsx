import React, { useState } from "react"
import Modals from "../Modals"
import { ServicesType, updateServices } from "@/services/servicios"
import { toast } from "sonner"
import style from './style.module.scss'

interface Props extends ServicesType {
  getData: () => void;
}

const FormServices = (props: Props) => {
  const [data, setData] = useState({
    title: props.title,
    description: props.description,
    top: props.top,
    active: props.active
  })

  const handleQuoteChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

    updateServices(props.id as string, uService)
    callback()
    props.getData()
    toast("Se actualizo la solicitud")
  }

  return (
    <Modals blockClass="infoServices" title="Edición del servicio" showBtn>
      {(onClose) => (
        <form onSubmit={(e) => handleSubmit(e, onClose)} className={style.form_service}>
          <div className={style.content_input}>
            <label htmlFor="quote">Servicio:</label>
            <input
              id="title"
              name="title"
              value={data.title}
              onChange={handleQuoteChange}
              placeholder="Descripcion"
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
              onChange={handleQuoteChange}
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
                onChange={handleQuoteChange}
                checked={data.top}
              />
            </div>

            <div className={style.content_checks}>
              <label htmlFor="quote">Activo:</label>
              <input
                id="active"
                name="active"
                type="checkbox"
                onChange={handleQuoteChange}
                checked={data.active}
              />
            </div>
          </div>

          <div className={style.content_buttons}>
            <button
              className={style.btn_cancel}
              type="button"
              onClick={onClose}
            >
              Cancelar
            </button>

            <button className='primary_btn' type="submit">Enviar</button>
          </div>
        </form>
      )}
    </Modals>
  );
};

export default FormServices;
