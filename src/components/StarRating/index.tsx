'use client'
import { useState } from 'react'
import './style.scss'

const StarRating = ({
  stars = 0,
  onChange,
}: {
  stars?: number
  onChange?: (e: number) => void
}) => {
  const [rating, setRating] = useState(stars)
  const [hover, setHover] = useState(stars)

  const handleRating = (index: number) => {
    setRating(index)
    if (onChange) onChange(index)
  }

  return (
    <div className="star-rating">
      {[...Array(5)].map((star, index) => {
        index += 1
        return (
          <button
            type="button"
            key={index}
            className={index <= (hover || rating) ? 'on' : 'off'}
            onClick={() => handleRating(index)}
            onMouseEnter={() => !stars && setHover(index)}
            onMouseLeave={() => setHover(rating)}
            disabled={!!stars}
          >
            <span className="star">&#9733;</span>
          </button>
        )
      })}
    </div>
  )
}

export default StarRating
