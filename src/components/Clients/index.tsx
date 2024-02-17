import style from "./style.module.scss";

const Clients = () => {
  return (
    <div className={style.client_container}>
      <h3 className={style.client_title}>¿Nuestros clientes?</h3>
      <div className={style.client}>
        <div className={style.client_card}>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/mantenimiento-angie.appspot.com/o/sitio%2FLogo_terpel.png?alt=media&token=05aa43d5-a327-438b-b820-fb2ff6bd9733"
            alt="terpel"
          />
        </div>
        <div className={style.client_card}>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/mantenimiento-angie.appspot.com/o/sitio%2FLogo_Megamall.png?alt=media&token=16d2886c-3c9c-4771-90ce-ab7f4c2ddf75"
            alt="Megamall"
          />
        </div>
        <div className={style.client_card}>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/mantenimiento-angie.appspot.com/o/sitio%2FLogo_maspormenos.png?alt=media&token=f21904de-429f-4730-9426-3405ec6181d7"
            alt="maspormenos"
          />
        </div>
        <div className={style.client_card}>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/mantenimiento-angie.appspot.com/o/sitio%2FLogo_Jardineslacolina.png?alt=media&token=dad69351-d7b5-473c-a2f7-0f97c3722329"
            alt="la colina"
          />
        </div>
        <div className={style.client_card}>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/mantenimiento-angie.appspot.com/o/sitio%2FLogo_Mardel.png?alt=media&token=1e049b76-0a99-4f93-ad78-6c840c5a91c8"
            alt="calidad"
          />
        </div>
      </div>
    </div>
  );
};

export default Clients;
