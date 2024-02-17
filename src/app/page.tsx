import Slider from '@/components/Slider'
import style from './style.module.scss'
import OurServices from '@/components/OurServices'
import Carrousel from '@/components/Carrousel'
import About from '@/components/About'
import Clients from '@/components/Clients'
import OurRatings from '@/components/OurRatings'
import OurServicesTop from '@/components/OurServicesTop'

export default function Home() {
  return (
    <section className={style.mainContainer}>
      <div className={style.mainContainer_slider}><Slider /></div>
      <OurServicesTop />
      <OurServices />
      <About />
      <Clients />
      <OurRatings />
      {/* <Carrousel /> */}
    </section>
  )
}
