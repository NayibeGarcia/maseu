import Slider from "@/components/Slider";
import style from "./style.module.scss";
import OurServices from "@/components/OurServices";
import Carrousel from "@/components/Carrousel";
import About from "@/components/About";
import Clients from "@/components/Clients";
import OurRatings from "@/components/OurRatings";
import "./style_reset.css";

export default function Home() {
  return (
    <section className={style.mainContainer}>
      <div className={style.mainContainer_slider}>
        <Slider />
      </div>
      <OurServices title="Estos son los servicios mas contratados" top={true} />
      <OurServices title="Nuestros Servicios" top={false} />
      <About />
      <Clients />
      <OurRatings />
      {/* <Carrousel /> */}
    </section>
  );
}
