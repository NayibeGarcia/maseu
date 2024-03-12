'use client'
import style from './style.module.scss'
import { useEffect, useState } from 'react'
import { UserAuth } from '@/context/AuthContext'
import LoadingPage from '@/app/loading'
import { getAllServices, ServicesType } from '@/services/servicios'
import FormAdminQuotes from '@/components/FormAdminQuotes'

export default function Page() {
  const { user } = UserAuth()
  const [services, setServices] = useState<ServicesType[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const getServices = async () => {
      setLoading(true)
      const data = await getAllServices()
      setServices(data)
      setLoading(false)
    }

    getServices()
  }, [user])

  return (
    <section className={style.services}>
      <h1 className={style.services_title}>Nuestros Servicios</h1>



      <div className={style.content_services}>
        <table className={style.services_table}>
          <thead>
            <tr>
              <td>Nombre</td>
              <td>Descripción</td>
              <td>TOP</td>
              <td>Editar</td>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <LoadingPage />
            ) : (
                services.map((service, i) => (
                <tr key={i}>
                  <td>{service.title}</td>
                  <td>{service.description}</td>
                  <td>{service.top? 'SI' : 'NO'}</td>
                  <td>
                    <FormAdminQuotes {...service} getData={getAllServices} />
                  </td>
                </tr>
                
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  )
}
