import style from './style.module.scss'

const Footer = () => {
  return (
    <footer className={style.footer}>
      <p>
        Copyright © Mantenimientos Asesorías y Servicios E.U. All rights
        reserved.
      </p>
      <small>
        Desarrollado por <a href='https://www.linkedin.com/in/karen-garcia-jaimes/' target="_blank">Karen García</a> - UTS
      </small>
    </footer>
  )
}

export default Footer
