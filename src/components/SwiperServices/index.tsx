'use client'
import style from './style.module.scss'
import FormQuotes from '../FormQuotes'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'
import { ServicesType } from '@/services/servicios'

const SwiperServices = ({ services }: { services: ServicesType[] }) => {
  return (
    <Swiper
      grabCursor={true}
      slidesPerView={'auto'}
      className="swiper-services"
      modules={[Pagination]}
    >
      {services.map(({ title, description, image }, i) => (
        <SwiperSlide
          style={{ width: '250px', height: 'auto' }}
          className={style.services_wrapper}
          key={i}
        >
          <div className={style.services_card}>
            <img
              className={style.services_card_image}
              src={image}
              alt={title}
            />
            <div className={style.services_card_info}>
              <h3 className={style.services_card_title}>{title}</h3>
              <p className={style.services_card_description}>{description}</p>
              <FormQuotes
                title={title}
                description={description}
                image={image}
              />
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default SwiperServices
