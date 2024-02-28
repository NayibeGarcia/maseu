import style from "./style.module.scss";

const Clients = () => {
  return (
    <div className={style.client_container}>
      <h3 className={style.client_title}>¿Nuestros clientes?</h3>
      <div className={style.client}>
        <div className={style.client_card}>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/mas-eu-6aa58.appspot.com/o/clientes%2FLogo-majestic.jfif?alt=media&token=88c136d6-a5d6-4b60-b561-672f2b9fabee"
            alt="Magestic"
          />
        </div>
        <div className={style.client_card}>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/mas-eu-6aa58.appspot.com/o/clientes%2FLogo-altosca%C3%B1averal.jfif?alt=media&token=291a64bc-25a4-40aa-96da-9512eb67142d"
            alt="Altos cañaveral"
          />
        </div>
        <div className={style.client_card}>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/mas-eu-6aa58.appspot.com/o/clientes%2FLogo-medicinalegal.jfif?alt=media&token=734a21ea-7887-43fe-94a4-414b3ab91c45"
            alt="Medicina legal"
          />
        </div>
        <div className={style.client_card}>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/mas-eu-6aa58.appspot.com/o/clientes%2FLogo-diamantereal.jfif?alt=media&token=3550cdb6-ae2d-4a16-a9fe-46bb92c10bf2"
            alt="Diamante real"
          />
        </div>
        <div className={style.client_card}>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/mas-eu-6aa58.appspot.com/o/clientes%2FLogo-clinicabucaramanga.jfif?alt=media&token=768d7725-8f4f-45f0-af58-fab0cf198169"
            alt="Clinica Bucaramanga"
          />
        </div>
        <div className={style.client_card}>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/mas-eu-6aa58.appspot.com/o/clientes%2FLogo-copetran.jfif?alt=media&token=9eab8741-f012-4470-8e69-c68286c1bbc6"
            alt="Copetran"
          />
        </div>
      </div>
    </div>
  );
};

export default Clients;
