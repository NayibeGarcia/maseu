'use client'
import style from './style.module.scss'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'
import { RatingType } from '@/services/ratings'
import StarRating from '../StarRating'

const SwiperRatings = ({ ratings }: { ratings: RatingType[] }) => {
  return (
    <div className={style.swiper}>
      <Swiper
      grabCursor={true}
      slidesPerView={'auto'}
      className="swiper-services"
      modules={[Pagination]}
    >
      {ratings.map((data, i) => (
        <SwiperSlide
          style={{ width: '350px', height: 'auto' }}
          className={style.services_wrapper}
          key={i}
        >
          <div className={style.rating_card}>
            <img src={data.photoUrl} alt="" />
            <div>
              {data.name}
              <StarRating stars={data.rating} />
              <div>{data.text}</div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
    </div>
    
  )
}

export default SwiperRatings
