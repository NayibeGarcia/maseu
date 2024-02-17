'use client'
import { QuoteFireType, getAllQuotes } from '@/services/crud'
import style from './style.module.scss'
import { useEffect, useState } from 'react'
import { getDate, type Timestamp } from '@/utils/helper'

import FormAdminQuotes from '../FormAdminQuotes'
import LoadingPage from '@/app/loading'

const Quotes = () => {
  const [quotes, setQuotes] = useState<QuoteFireType[] | undefined>()
  const [sort, setSort] = useState(false)
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const getData = async () => {
    setLoading(true)
    const quotes = await getAllQuotes(email)
    quotes.sort((a, b) => {
      if (sort) {
        return a.quoteDate.seconds - b.quoteDate.seconds
      }
      return b.quoteDate.seconds - a.quoteDate.seconds
    })
    setQuotes(quotes)
    setLoading(false)
  }

  useEffect(() => {
    setLoading(true)
    ;(async () => {
      const quotes = await getAllQuotes(email)
      quotes.sort((a, b) => {
        if (sort) {
          return a.quoteDate.seconds - b.quoteDate.seconds
        }
        return b.quoteDate.seconds - a.quoteDate.seconds
      })
      setQuotes(quotes)
      setLoading(false)
    })()
  }, [sort, email])

  return (
    <div className={style.quotes_container}>
      <div className={style.quotes_search}>
        <label htmlFor="email">Buscar usuario por correo</label>
        <input
          onChange={(e) => setEmail(e.target.value)}
          id="email"
          name="email"
          type="text"
        />
      </div>
      <table className={style.quotes}>
        <thead>
          <tr>
            <td>Estado</td>
            <td>Nombre</td>
            <td>Correo</td>
            <td>Servicio</td>
            <td className={style.quotes_date} onClick={() => setSort(!sort)}>
              <p>
                Fecha de solicitud
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.25rem"
                  height="1.25rem"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                  className={sort ? 'arrow_desc' : 'arrow_acs'}
                >
                  <rect width="16rem" height="16rem" fill="none"></rect>
                  <path d="M215.39111,92.93848A8.00015,8.00015,0,0,0,208,88H48a8,8,0,0,0-5.65674,13.657l80,79.99976a7.99945,7.99945,0,0,0,11.31348,0l80-79.99976A8.00011,8.00011,0,0,0,215.39111,92.93848Z"></path>
                </svg>
              </p>
            </td>
            <td>Actulaizar</td>
          </tr>
        </thead>
        <tbody>
          {!quotes?.length && !loading && <p>No hay solicitudes</p>}
          {loading ? (
            <LoadingPage />
          ) : (
            quotes?.map((quote, i) => (
              <tr key={i}>
                <td>{quote.state}</td>
                <td>{quote.name}</td>
                <td> {quote.userEmail} </td>
                <td>{quote.servicio}</td>
                <td>{getDate(quote.quoteDate as Timestamp)}</td>
                <td>
                  <FormAdminQuotes {...quote} getData={getData} />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Quotes
