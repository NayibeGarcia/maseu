import style from './style.module.scss'

const Footer = () => {
  return (
    <footer className={style.footer}>
      <p>
        Copyright © Mantenimientos Asesorías y Servicios E.U. All rights
        reserved.
      </p>
      <small>
        Desarrollado por <a href='#'>Karen Garcia</a> - UTS
      </small>
    </footer>
  )
}

export default Footer
