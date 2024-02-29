'use client'
import { Accordion, AccordionItem } from "@nextui-org/react"
import style from "./style.module.scss"
import Contact from "@/components/Contact"

export default function Page() {
  const defaultContent = "-";

  return (
    <div className={style.ayuda_page}>
      <Contact />
      <div className={style.frequent_questions}>
        <div className={style.frequent_questions_title}>
        <p>Preguntas Frecuentes de nuestros clientes</p>
        </div>
        <Accordion>
          <AccordionItem key="1" title="1. ¿Qué servicios encuentro en MAS EU?">
            {
              "Encontrarás servicios de mantenimientos, asesorías y servicios. e.u. Cuenta con la infraestructura técnica, administrativa y comercial necesaria para ofrecer el suministro, montaje, reparación y mantenimiento en general para circuitos eléctricos, sistemas de presión constante y bombeo tanque a tanque, sistemas de bombeo para tratamiento de agua en piscinas, plantas eléctricas de emergencia y transferencias automáticas, sistemas de bombeo para aguas lluvias y extinción de incendios, sistemas de bombeo en plantas procesadoras de aguas negras, lavado y desinfección a tanques de almacenamiento de agua potable, suministro de material, repuestos, equipos y elementos de maniobra eléctrica."
            }
          </AccordionItem>
          <AccordionItem
            key="2"
            title="2. ¿Es necesario disponer de alguna herramienta para llevar a cabo el servicio?"
          >
            {
              "Ofrecemos plena cobertura de servicios para el mantenimiento electromecánico de sus equipos, contamos con todo el equipamiento requerido para tal fin."
            }
          </AccordionItem>
          <AccordionItem
            key="3"
            title="3. ¿Cuál es el área de cobertura de sus servicios?"
          >
            {
              "El pago de cada servicio se presentará una factura de venta legal, la cual deberá ser cancelada de contado en un tiempo máximo de treinta días siguientes a su entrega con el respectivo informe técnico."
            }
          </AccordionItem>
          <AccordionItem
            key="4"
            title="4. ¿Cuáles son las opciones de pago disponibles?"
          >
            {
              "Nuestra área de cobertura se extiende a Bucaramanga y su área metropolitana."
            }
          </AccordionItem>
          <AccordionItem key="5" title="5.¿Cómo me registro en la página?">
            {
              "Para registrarte en la página deberás ingresar a xxx y dirigirte al menú superior en la sección: Ingresa. Allí podrás crear tu cuenta o ingresar a través de tu cuenta de Gmail. ¡Es muy sencillo!"
            }
          </AccordionItem>
          <AccordionItem
            key="6"
            title="6. ¿Cómo puedo saber el estado de mi servicio?"
          >
            {
              "A través de tu cuenta, desde la sección: Mis solicitudes, podrás hacerle seguimiento en tiempo real a tu servicio. Tendrás notificaciones por cada acción que el técnico realice, sabrás en qué momento del servicio te encuentras y tendrás muchas opciones para tramitar tu solicitud."
            }
          </AccordionItem>
          <AccordionItem
            key="7"
            title="7. ¿Cuáles son las opciones de pago disponibles?"
          >
            {defaultContent}
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
