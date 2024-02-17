import style from './style.module.scss'
import SwiperServices from '../SwiperServices'
import { getAllServices } from '@/services/servicios'

const OurServices = async () => {
  const services = await getAllServices()
  return (
    <div className={style.services}>
      <h2 className={style.services_title}>Nuestros Servicios</h2>
      <div className={style.services_container}>
        <SwiperServices services={services} />
      </div>
    </div>
  )
}

export default OurServices
