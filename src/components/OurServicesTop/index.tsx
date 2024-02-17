import style from './style.module.scss'
import SwiperServices from '../SwiperServices'
import { getAllServicesTop } from '@/services/servicios'

const OurServicesTop = async () => {
  const services = await getAllServicesTop()
  return (
    <div className={style.servicesTop}>
      <h2 className={style.servicesTop_title}>Estos son los servicios mas contratados</h2>
      <div className={style.servicesTop_container}>
        <SwiperServices services={services} />
      </div>
    </div>
  )
}

export default OurServicesTop
