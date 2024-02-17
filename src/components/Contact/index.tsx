import { Button } from '@nextui-org/react'
import style from './style.module.scss'

const Contact = () => {
  return (
    <div className={style.contact}>
      <h2 className={style.contact_title}>ASISTENCIA TECNICA GARANTIZADA</h2>
      <span className={style.contact_subTile}>SOLUCIONES INTEGRALES</span>
      <div className={style.contact_buttons}>
        <Button>Escribenos</Button>
        <Button>Llamanos</Button>
      </div>
      <p>
        Mantenimiento preventivo y correctivo de equipos y maquinaria
        electromecánicos e hidráulicos, procesos de metal mecánica, soldadura y
        estructuras.
      </p>
    </div>
  )
}

export default Contact
