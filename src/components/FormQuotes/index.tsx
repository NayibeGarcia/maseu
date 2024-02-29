"use client";
import { useState } from "react"
import { UserAuth } from "@/context/AuthContext"
import LoginButton from "../LoginButton"
import Modals from "../Modals"
import { saveData } from "@/services/crud"
import style from "./style.module.scss"
import { toast } from "sonner"
import { Button } from "@nextui-org/react"
import { useRouter } from "next/navigation"
import { SlPaperClip } from "react-icons/sl"
interface Props {
  title: string
  description: string
  image: string
}

const FormQuotes = ({ title, description, image }: Props) => {
  const [quote, setQuote] = useState("")
  const [cupon, setCupon] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleQuoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQuote(e.target.value);
  };

  const handleCuponChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCupon(e.target.value)
  };
  const { user } = UserAuth()
  const userId = user?.id ?? ""
  const userEmail = user?.email ?? ""
  const name = user?.name ?? ""

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const newQuote = {
      userId,
      name,
      userEmail,
      servicio: title,
      quoteDate: new Date(),
      answerDate: null,
      requestContent: quote,
      requestAnswer: "",
      state: "Nuevo",
      quotePrice: "",
      cupon: cupon,
    }

    setCupon("")
    setQuote("")
    await saveData(newQuote, file)
    toast("Tu solicitud ha sido creada, por favor revisar tu bandeja de correo.")
    setLoading(false)
    setTimeout(() => {
      router.push("/account")
    }, 300)
  }

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const archivos = e.target.files

    if (archivos && archivos.length > 0) {
      const firstFile = archivos[0]
      setFile(firstFile)
    }
  }

  return (
    <Modals
      buttonText="Cotizar"
      title={"Solicitud de cotizacion"}
      showBtn={false}
    >
      {(onClose) => (
        <>
          {!user?.completed ? (
            <LoginButton />
          ) : (
            <div className={style.form}>
              <div className={style.form_info}>
                <img
                  className={style.form_info_image}
                  src={image}
                  alt={title}
                />
                <p className={style.form_info_title}>{title}</p>
                <p className={style.form_info_description}>{description}</p>
              </div>
              <form
                className={style.form_quotes}
                onSubmit={(e) => handleSubmit(e)}
              >
                <p className={style.form_quotes_title}>
                  Recibe una cotizacion de nuestro equipo
                </p>
                <div className={style.form_quotes_text}>
                  <label htmlFor="quote">
                    Danos informacion sufuciente para realizar la cotización de
                    tu servicio.
                  </label>
                  <textarea
                    id="quote"
                    name="quote"
                    value={quote}
                    onChange={handleQuoteChange}
                    rows={4}
                    placeholder="Ejemplo: Quiero un mantenimiento especializado para ..."
                    required
                  />
                </div>
                <div className={style.form_quotes_file}>
                  <input
                    id="file"
                    name="file"
                    onChange={handleFile}
                    type="file"
                    className="form_quotes_file_input"
                  />
                  <span className={style.form_quotes_file_span} onChange={handleFile}>
                    <SlPaperClip></SlPaperClip>
                    <label htmlFor="file">Adjuntar Imagen (PNG, JPG) - Máximo 5MB</label>
                  </span>
                </div>
                <div className={style.form_quotes_cupon}>
                  <label htmlFor="cupon">¿Tienes un cupón?</label>
                  <input
                    type="text"
                    id="cupon"
                    name="cupon"
                    value={cupon}
                    onChange={handleCuponChange}
                    placeholder="Ingresa el cupón"
                  />
                </div>

                <div className={style.form_quotes_btn}>
                  <Button color="danger" type="button" onClick={onClose} className={style.form_quotes_btn_cancel}>
                    Cancelar
                  </Button>

                  <Button
                    disabled={loading}
                    className={style.form_quotes_btn_send}
                    type="submit"
                  >
                    {loading ? "Enviando..." : "Enviar"}
                  </Button>
                </div>
              </form>
            </div>
          )}
        </>
      )}
    </Modals>
  );
};

export default FormQuotes
