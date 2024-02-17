import style from './style.module.scss'
import { getAllRatings } from '@/services/ratings'
import SwiperRatings from '../SwiperRatings'

const OurRatings = async () => {
  const ratings = await getAllRatings(true)
  if (!ratings.length) return null
  return (
    <div className={style.ourRatings}>
      <h2 className={style.ourRatings_title}>Calificaciones</h2>
      <div className={style.ourRatings_container}>
        <SwiperRatings ratings={ratings} />
      </div>
    </div>
  )
}

export default OurRatings
