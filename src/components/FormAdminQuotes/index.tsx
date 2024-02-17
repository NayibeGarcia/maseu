import React, { useState } from 'react'
import Modals from '../Modals'
import { QuoteFireType, updateDocument } from '@/services/crud'
import { toast } from 'sonner'
import { Button } from '@nextui-org/react'

interface Props extends QuoteFireType {
  getData: () => void
}

const FormAdminQuotes = (props: Props) => {
  const [quote, setQuote] = useState('')
  const [price, setPrice] = useState('')

  const handleQuoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQuote(e.target.value)
  }

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(e.target.value)
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
          }

    setPrice('')
    setQuote('')

    updateDocument(props.id as string, updateQuote, props.name, props.userEmail)
    callback()
    props.getData()
    toast('Se actualizo la solicitud')
  }
  return (
    <Modals buttonText="Información" title={props.servicio} showBtn>
      {(onClose) => (
        <>
          <div>
            <p>Informacion de la cotizacion</p>
            <div>
              <div>
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
                <p>
                  <strong>Solicitud del cliente:</strong> {props.requestContent}
                </p>
                {props.hasImage && (
                  <p>
                    Imagen:
                    <a
                      target="_blank"
                      href={`https://firebasestorage.googleapis.com/v0/b/mantenimiento-angie.appspot.com/o/quotes%2F${props.id}?alt=media`}
                    >
                      <img
                        src={`https://firebasestorage.googleapis.com/v0/b/mantenimiento-angie.appspot.com/o/quotes%2F${props.id}?alt=media`}
                        alt=""
                        style={{ height: '100px' }}
                      />
                    </a>
                  </p>
                )}
              </div>
            </div>
          </div>
          {props.state !== 'Nuevo' ? (
            <div>
              <p>
                <strong>Respuesta de cotizacion:</strong> {props.requestAnswer}
              </p>
              <p>
                <strong>Precio:</strong> {props.quotePrice}
              </p>
              <Button onPress={(e) => handleSubmit(e, onClose)}>
                {props.state === 'completado' ? 'Cerrar' : 'Terminar'}
              </Button>
            </div>
          ) : (
            <form onSubmit={(e) => handleSubmit(e, onClose)}>
              <div>
                <label htmlFor="quote">Cotización:</label>
                <textarea
                  id="quote"
                  name="quote"
                  value={quote}
                  onChange={handleQuoteChange}
                  rows={4}
                  style={{ width: '90%' }}
                  placeholder="Detalle de la cotización..."
                  required
                />
              </div>
              <div>
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
              <div>
                <Button color="danger" type="button" onClick={onClose}>
                  Cancelar
                </Button>

                <Button type="submit">Enviar</Button>
              </div>
            </form>
          )}
        </>
      )}
    </Modals>
  )
}

export default FormAdminQuotes
