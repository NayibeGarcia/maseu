'use client'
import style from './style.module.scss'
import { useEffect, useState } from 'react'
import { UserAuth } from '@/context/AuthContext'
import LoadingPage from '@/app/loading'
import { RatingType, getAllRatings, updateRating } from '@/services/ratings'
import StarRating from '@/components/StarRating'

const RatingCard = ({ data }: { data: RatingType }) => {
  const [rating, setRatings] = useState(data)

  const handleShow = async () => {
    setRatings({ ...rating, show: !rating.show })
    await updateRating(data.id ?? '', { show: !rating.show })
  }

  return (
    <div className={style.rating_card}>
      <img src={rating.photoUrl} alt="" />
      <div>
        {rating.name}
        <StarRating stars={rating.rating} />
        <div>{rating.text}</div>
      </div>
      <label htmlFor="show">
        Mostrar calificacion
        <input
          onClick={handleShow}
          checked={rating.show}
          id="show"
          type="checkbox"
        />
      </label>
    </div>
  )
}

export default function Page() {
  const { user } = UserAuth()
  const [ratings, setRatings] = useState<RatingType[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      const data = await getAllRatings()
      setRatings(data)
      setLoading(false)
    })()
  }, [user])

  return (
    <div className={style.ratings}>
      <h1 className={style.ratings_title}>Nuestras calificaciones</h1>
      {loading ? (
        <LoadingPage />
      ) : (
        <div className={style.ratings_container}>
          {ratings.map((data, i) => (
            <RatingCard key={i} data={data} />
          ))}
        </div>
      )}
    </div>
  )
}
