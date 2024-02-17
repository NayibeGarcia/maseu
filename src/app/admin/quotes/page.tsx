import Quotes from '@/components/Quotes'
import style from './style.module.scss'

export default function Page() {
  return (
    <div className={style.quotespage}>
      <Quotes />
    </div>
  )
}
