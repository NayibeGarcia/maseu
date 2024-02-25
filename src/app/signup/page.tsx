import { getQuoteByUser } from '@/services/crud'
import style from './style.module.scss'
import { getDate, type Timestamp } from '@/utils/helper'
import SingUp from '@/components/SingUp'

export default async function Page({
  searchParams,
}: {
  searchParams: { id: string }
}) {
  const userId = searchParams.id ?? ''

  //const quotes = await getQuoteByUser(userId)
  return (
    <div className={style.sign_page}>
      <SingUp />
    </div>
  )
}
