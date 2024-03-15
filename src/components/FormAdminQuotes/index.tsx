import React, { useState } from 'react'
import Modals from '../Modals'
import { QuoteFireType, updateDocument } from '@/services/crud'
import { toast } from 'sonner'
import style from './style.module.scss'

interface Props extends QuoteFireType {
  getData: () => void
}

const FormAdminQuotes = (props: Props) => {
  const [quote, setQuote] = useState('')
  const [price, setPrice] = useState('')
  const [nroOrder, setNroOrder] = useState('')

  const handleQuoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQuote(e.target.value)
  }

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(e.target.value)
  }

  const handleNroOrderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNroOrder(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent | any, callback: () => void) => {
    if (e.preventDefault) {
      e.preventDefault()
    }

    const updateQuote =
      props.state !== 'Nuevo'
        ? { state: 'completado', requestAnswer: 'La solicitud fue completada' }
        : {
            servicio: props.servicio,
            answerDate: new Date(),
            requestAnswer: quote,
            state: 'abierto',
            quotePrice: price,
            nroOrder: nroOrder
          }

    setPrice('')
    setQuote('')
    setNroOrder('')

    updateDocument(props.id as string, updateQuote, props.name, props.userEmail)
    callback()
    props.getData()
    toast('Se actualizo la solicitud')
  }
  return (
    <Modals
      blockClass="infoQuotes"
      title={props.servicio}
      showBtn
    >
      {(onClose) => (
        <>
          <div className={style.info_quote}>
            <p>
              <strong>Nombre: </strong> {props.name}
            </p>
            <p>
              <strong>Id de la solicitud:</strong> {props.id}
            </p>
            <p>
              <strong>Estado:</strong> {props.state}
            </p>
            <p>
              <strong>correo:</strong> {props.userEmail}
            </p>
            <p>
              <strong>cúpon:</strong> {props.cupon}
            </p>
            <p style={{ marginBottom: '10px' }}>
              <strong>Solicitud del cliente:</strong> {props.requestContent}
            </p>
            {props.hasImage && (
              <a
                target="_blank"
                href={`https://firebasestorage.googleapis.com/v0/b/mas-eu-6aa58.appspot.com/o/quotes%2F${props.id}?alt=media`}
              >
                <img
                  src={`https://firebasestorage.googleapis.com/v0/b/mas-eu-6aa58.appspot.com/o/quotes%2F${props.id}?alt=media`}
                  alt=""
                  style={{ height: '100px' }}
                />
              </a>
            )}
          </div>
          {props.state !== 'Nuevo' ? (
            <div className={style.info_quote}>
              <p>
                <strong>Respuesta de cotizacion:</strong> {props.requestAnswer}
              </p>
              <p>
                <strong>Precio:</strong> {props.quotePrice}
              </p>
              <button
                className='primary_btn'
                onClick={(e) => handleSubmit(e, onClose)}
              >
                {props.state === 'completado' ? 'Cerrar' : 'Terminar'}
              </button>
            </div>
          ) : (
            <form onSubmit={(e) => handleSubmit(e, onClose)} className={style.form_quote}>
              <div>
                <label htmlFor="quote">Cotización:</label>
                <textarea
                  id="quote"
                  name="quote"
                  value={quote}
                  onChange={handleQuoteChange}
                  rows={3}
                  placeholder="Detalle de la cotización..."
                  required
                />
              </div>
              <div className={style.content_inputs}>
                <label htmlFor="price">Precio Cotizado:</label>
                <input
                  type="text"
                  id="price"
                  name="price"
                  value={price}
                  onChange={handlePriceChange}
                  placeholder="Precio de la cotización"
                  required
                />
              </div>
              <div className={style.content_inputs} >
                <label htmlFor="price">Número de Orden:</label>
                <input
                  type="text"
                  id="nroOrder"
                  name="nroOrder"
                  value={nroOrder}
                  onChange={handleNroOrderChange}
                  placeholder="Número de la orden"
                  required
                />
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
        </>
      )}
    </Modals>
  )
}

export default FormAdminQuotes
