import FormNewQuotes from '@/components/FormNewQuotes'
import style from './style.module.scss'
import Link from 'next/link'

export default function Page() {
  return (
    <div className={style.admin}>
      <div className={style.options}>
        <Link className={style.options_items} href="/admin/users">
          Usuarios
        </Link>
        <Link className={style.options_items} href="/admin/ratings">
          Calificaciones
        </Link>
        <FormNewQuotes />
        <Link className={style.options_items} href="/admin/quotes">
          Cotizaciones
        </Link>
      </div>
    </div>
  )
}
