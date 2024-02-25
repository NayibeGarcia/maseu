import style from "./style.module.scss";
import SwiperServices from "../SwiperServices";
import { getAllServices, getAllServicesTop } from "@/services/servicios";

interface Props {
  title: string;
  top: boolean;
}

async function OurServices({ title, top }: Props) {
  let services = top ? await getAllServicesTop() : await getAllServices();
  return (
    <div className={style.services}>
      <h2 className={style.services_title}>{title}</h2>
      <div className={style.services_container}>
        <SwiperServices services={services} />
      </div>
    </div>
  );
}

export default OurServices;
