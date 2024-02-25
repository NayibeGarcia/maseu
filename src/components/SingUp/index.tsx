"use client";
import { useState } from "react";
import { UserAuth } from "@/context/AuthContext";
import style from "./style.module.scss";
import { UserType, saveUser } from "@/services/user";
import { useRouter } from "next/navigation";
import { select } from "@nextui-org/react";

const InitialValueForm: UserType = {
  name: "",
  lastname: "",
  document: 0,
  typeDocument: "",
  dataTreatment: false,
  conditionsTerms: false,
  phoneNumber: 0,
  email: "",
};

const SingUp = () => {
  const { user } = UserAuth();
  const [values, setValue] = useState<UserType>({
    ...InitialValueForm,
    email: user?.email ?? "",
  });
  const router = useRouter();
  console.log(user);

  if (user?.completed) {
    router.push("/");
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setValue({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newUser = {
      name: values.name,
      phoneNumber: values.phoneNumber,
      email: user?.email ?? "",
      rol: "cliente",
      userId: user?.id,
      lastname: values.lastname,
      document: values.document,
      typeDocument: 'CC',
      dataTreatment: true,
      conditionsTerms: true,
    };

    await saveUser(newUser);
    window.location.href = "/";
  };
  return (
    <div className={style.form_container}>
      <form className={style.form_sign} onSubmit={handleSubmit}>
        <p className={style.form_sign_title}>Terminemos tu registro</p>

        <div className={style.form_sign_input}>
          <label htmlFor="name">Nombres</label>
          <input
            type="text"
            id="name"
            name="name"
            value={values.name}
            onChange={handleChange}
            placeholder="Ingresa tu nombre"
            required
          />
          <label htmlFor="name">Apellidos</label>
          <input
            type="text"
            id="name"
            name="name"
            value={values.lastname}
            onChange={handleChange}
            placeholder="Ingresa tu nombre"
            required
          />
        </div>
        <div className={style.form_sign_input}>
          <label htmlFor="email">Correo</label>
          <input
            type="text"
            id="name"
            name="email"
            value={values.email}
            disabled
            onChange={handleChange}
            placeholder=""
            required
          />
        </div>
        <div className={style.form_sign_input}>
        <select name="typedocument" className={style.form_sign_select}>
          <option value="CC">Cédula</option>
          <option value="NIT" selected>Nit</option>
        </select>
          <label htmlFor="document">Escribe tu documento</label>
          <input
            type="text"
            id="document"
            name="document"
            value={values.document}
            disabled
            onChange={handleChange}
            placeholder=""
            required
          />
        </div>
        <div className={style.form_sign_input}>
          <label htmlFor="phoneNumber">¿Cúal es tu número de celular?</label>
          <input
            type="number"
            id="phoneNumber"
            name="phoneNumber"
            value={values.phoneNumber}
            onChange={handleChange}
            placeholder="Ingresa tu numero"
            required
          />
        </div>
        <div className={style.form_sign_input}>
        <label>
          <input type="checkbox" id="conditionsTerms" value="conditionsTerms" /> Acepto los terminos y condiciones de uso del sitio web
          </label>
          <label>
          <input type="checkbox" id="dataTreatment" value="dataTreatment" /> Acepto el tratamiento de datos personales según la politica de privacidad con el fin de ser contactado por MAS E.U a través de los medios suministrados y/o recibir información relacionada con productos/servicios
          </label>
        </div>
        <button style={{ border: "solid #000 1px" }} type="submit">
          Terminar Registro
        </button>
      </form>
    </div>
  );
};

export default SingUp;
