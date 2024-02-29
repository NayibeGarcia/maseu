import style from "./style.module.scss"

const About = () => {
  return (
    <div className={style.about_container}>
      <h3 className={style.about_title}>¿Buscas un experto ideal?</h3>
      <div className={style.about}>
        <div className={style.about_card}>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/mas-eu-6aa58.appspot.com/o/sitio%2FMASEU_Mision.png?alt=media&token=f986c0a2-7088-465b-859a-274f8cd06945"
            alt="mision"
          />
          <strong>
            <h2>Mision</h2>
          </strong>
          <p>
            Ofrecer a través de nuestro portafolio de servicios, una empresa
            sólida responsable y oportuna en las áreas de mantenimiento
            preventivo correctivo programado, montaje y suministro de sistemas
            hidraulicos y/o equipamentos electro-mecánicos en general.
          </p>
        </div>
        <div className={style.about_card}>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/mas-eu-6aa58.appspot.com/o/sitio%2FMASEU_Vision.png?alt=media&token=7395ef70-451e-4b6b-9191-ff7fef8fb251"
            alt="vision"
          />
          <strong>
            <h2>Vision</h2>
          </strong>
          <p>
            Consolidarnos como líderes en el mantenimiento predictivo preventivo
            y correctivo presentando soluciones alternativas y de última
            tecnología, contribuyendo a la conservacion del medio ambiente y
            abarcando el mercado con calidad y transparencia que han servido de
            emblemas de nuestra compañía.
          </p>
        </div>
        <div className={style.about_card}>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/mas-eu-6aa58.appspot.com/o/sitio%2FMASEU_Calidad.png?alt=media&token=c4843566-4876-4535-a7bd-572072b638db"
            alt="calidad"
          />
          <strong>
            <h2>Politica de calidad</h2>
          </strong>
          <p>
            Somos un equipo interdisciplinario cuyas acciones diarias las
            ejecutamos con una alta vocación de servicio y una serie de
            aptitudes distintivas para satisfacer a todos nuestros clientes.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
