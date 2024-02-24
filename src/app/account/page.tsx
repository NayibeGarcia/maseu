'use client'
import { getQuoteByUser, QuoteFireType } from '@/services/crud'
import style from './style.module.scss'
import { getDate, type Timestamp } from '@/utils/helper'
import Modals from '@/components/Modals'
import { useEffect, useState } from 'react'
import { UserAuth } from '@/context/AuthContext'
import LoadingPage from '../loading'
import { Button } from '@nextui-org/react'
import Ratings from '@/components/Ratings'
import OurServices from '@/components/OurServices'

export default function Page() {
  const { user } = UserAuth();
  const [quotes, setQuotes] = useState<QuoteFireType[]>([]);
  const [sort, setSort] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const data = await getQuoteByUser(user?.email ?? "");
      data.sort((a, b) => {
        if (sort) {
          return a.quoteDate.seconds - b.quoteDate.seconds;
        }
        return b.quoteDate.seconds - a.quoteDate.seconds;
      });
      setQuotes(data);
      setLoading(false);
    })();
  }, [user, sort]);

  return (
    <div className={style.account}>
      <h1 className={style.account_title}>Tus Solicitudes</h1>
      <div>
        {quotes.some(({ state }) => state === 'completado') && <Ratings />}
      </div>

      <table className={style.quotes}>
        <thead>
          <tr>
            <td>Estado</td>
            <td>Servicio</td>
            <td className={style.account_date} onClick={() => setSort(!sort)}>
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
            <td>Información</td>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <LoadingPage />
          ) : (
            quotes.map((quote, i) => (
              <tr key={i}>
                <td>{quote.state}</td>
                <td>{quote.servicio}</td>
                <td>{getDate(quote.quoteDate as unknown as Timestamp)}</td>
                <td>
                  <Modals buttonText="Ver mas" showBtn title="">
                    {(onClose) => (
                      <div>
                        <p>{quote.servicio}</p>
                        <div>
                          <p>Solicitud: {quote.requestContent}</p>
                          <p>Estado: {quote.state}</p>
                          <p>Cupon: {quote.cupon || ''}</p>
                          <p>
                            Fechas de solicitud:
                            {getDate(quote.quoteDate as unknown as Timestamp)}
                          </p>
                          {quote.hasImage && (
                            <p>
                              Imagen:
                              <a
                                target="_blank"
                                href={`https://firebasestorage.googleapis.com/v0/b/mantenimiento-angie.appspot.com/o/quotes%2F${quote.id}?alt=media`}
                              >
                                <img
                                  src={`https://firebasestorage.googleapis.com/v0/b/mantenimiento-angie.appspot.com/o/quotes%2F${quote.id}?alt=media`}
                                  alt=""
                                  style={{ height: '100px' }}
                                />
                              </a>
                            </p>
                          )}
                          <p>Respuesta:{quote.requestAnswer || 'En proceso'}</p>
                          <p>Precio:{quote.quotePrice || 'En proceso'}</p>
                          <p>
                            Fechas de respuesta:
                            {quote.answerDate
                              ? getDate(
                                  quote.answerDate as unknown as Timestamp
                                )
                              : 'Pendiente'}
                          </p>
                        </div>
                        <Button onPress={onClose}>Cerrar</Button>
                      </div>
                    )}
                  </Modals>
                </td>
              </tr>
            ))
          )}
          {!quotes.length && (
              <div className={style.noQuote}>
                <strong>No tienes solicitudes en proceso</strong>
                <div className={style.noQuoteSubtitle}>
                  <strong>
                    ¡Vive la experiencia de contratar un servicio con un
                    experto! Cotizar es muy fácil y seguro.
                  </strong>
                </div>
              </div>
            )}
        </tbody>
      </table>
      <div>
      <OurServices title="Estos son los servicios mas contratados" top={true} />
      </div>
    </div>
  );
}
