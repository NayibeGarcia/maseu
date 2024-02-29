import { Button } from "@nextui-org/react"
import style from "./style.module.scss"
import { IconCall } from "./Icons/IconCall"
import { IconWhatsApp } from "./Icons/IconWhatsApp"

const Contact = () => {
  return (
    <div className={style.contact}>
      <h2 className={style.contact_title}>ASISTENCIA TECNICA GARANTIZADA</h2>
      <span className={style.contact_subTile}>SOLUCIONES INTEGRALES</span>
      <div className={style.contact_buttons}>
        <Button className={style.contact_buttons_button}>
          {" "}
          <a
            href={`https://api.whatsapp.com/send?phone=573102554944&amp;text=Hola, este es un mensaje desde la web, me gustaría más información`}
            target="_blank"
          >
            <IconWhatsApp/>
            Escríbenos
          </a>
        </Button>
        <Button className={style.contact_buttons_button}>
          <a href="tel:573102554944">
            <IconCall />
            Llamanos
          </a>
        </Button>
      </div>
      <p>
        Mantenimiento preventivo y correctivo de equipos y maquinaria
        electromecánicos e hidráulicos, procesos de metal mecánica, soldadura y
        estructuras.
      </p>
    </div>
  );
};

export default Contact;
