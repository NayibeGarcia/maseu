"use client";
import { SetStateAction, useState } from "react";
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
  const [typeDocument, setTypeDocument] = useState("cc");
  const [aceptoTerminos, setAceptoTerminos] = useState(false);
  const [dataTreatment, setdataTreatment] = useState(false);
  const router = useRouter();

  if (user?.completed) {
    router.push("/");
  }

  const captureType = (e: { target: { value: SetStateAction<string> } }) => {
    setTypeDocument(e.target.value); 
  };

  const handleCheckboxChange = (e: any) => {
    setAceptoTerminos(e.target.checked); 
  };
  const handleCheckboxChangeTreatment = (e: any) => {
    setdataTreatment(e.target.checked); 
  };

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
      typeDocument: typeDocument,
      dataTreatment: dataTreatment,
      conditionsTerms: aceptoTerminos,
    };

    await saveUser(newUser);
    window.location.href = "/";
  };
  return (
    <div className={style.form_container}>
      <div className={style.form_container_data}>
        <form className={style.form_sign} onSubmit={handleSubmit}>
          <p className={style.form_sign_title}>Terminemos tu registro</p>

          <div className={style.form_sign_input}>
            <div>
              <label htmlFor="name">Nombres</label>
            <input
              type="text"
              id="name"
              name="name"
              value={values.name}
              onChange={handleChange}
              placeholder="Ingresa tus nombres"
              required
              className={style.modern_input}
            />
            </div>
            <div>
              <label htmlFor="name">Apellidos</label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              value={values.lastname}
              onChange={handleChange}
              placeholder="Ingresa tus apellidos"
              required
              className={style.modern_input}
            />
            </div>
            
          </div>
          <div className={style.form_sign_input}>
            <div>
              <label htmlFor="document">Tipo de documento</label>
              <select
                name="typedocument"
                className={style.form_sign_select}
                onChange={captureType}
              >
                <option value="CC" selected>
                  Cédula
                </option>
                <option value="NIT">Nit</option>
              </select>
            </div>
            <div>
              <label htmlFor="document">Escribe tu documento</label>
              <input
                type="text"
                id="document"
                name="document"
                value={values.document}
                onChange={handleChange}
                placeholder="Número de documento"
                required
                className={style.modern_input}
              />
            </div>
          </div>

          <div>
            <div className={style.form_sign_input}>
              <label htmlFor="email">Correo Electronico</label>
              <input
                type="text"
                id="email"
                name="email"
                value={user?.email}
                disabled
                onChange={handleChange}
                placeholder=""
                required
                className={style.modern_input}
              />
            </div>
            <div className={style.form_sign_input}>
              <label htmlFor="phoneNumber">
                ¿Cúal es tu número de celular?
              </label>
              <input
                type="number"
                id="phoneNumber"
                name="phoneNumber"
                value={values.phoneNumber}
                onChange={handleChange}
                placeholder="Ingresa tu numero"
                required
                className={style.modern_input}
              />
            </div>
          </div>

          
          <div className={style.form_sign_input}>
            <label>
              <input
                type="checkbox"
                id="conditionsTerms"
                value="conditionsTerms"
                onChange={handleCheckboxChange}
              />
              Acepto los terminos y condiciones de uso del sitio web
            </label>
            <label>
              <input
                type="checkbox"
                id="dataTreatment"
                value="dataTreatment"
                onChange={handleCheckboxChangeTreatment}
              />
              Acepto el tratamiento de datos personales según la politica de
              privacidad con el fin de ser contactado por MAS E.U a través de
              los medios suministrados y/o recibir información relacionada con
              productos/servicios
            </label>
          </div>
          <button className={style.form_button} type="submit">
            Terminar Registro
          </button>
        </form>
      </div>
      <div className={style.form_container_image}>
        <img
          src="https://firebasestorage.googleapis.com/v0/b/mas-eu-6aa58.appspot.com/o/sitio%2Fbanner2.png?alt=media&token=9a59b9f6-4d94-44cc-abb6-d464c09b27c4"
          alt="servicio"
        />
      </div>
    </div>
  );
};

export default SingUp;
