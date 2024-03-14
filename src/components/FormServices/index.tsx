import React, { useState } from "react";
import Modals from "../Modals";
import { ServicesType, updateServices } from "@/services/servicios";
import { toast } from "sonner";
import { Button } from "@nextui-org/react";

interface Props extends ServicesType {
  getData: () => void;
}

const FormServices = (props: Props) => {
  console.log("props", props);
  const [quote, setQuote] = useState("");

  const handleQuoteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuote(e.target.value);
  };

  const uService = {};

  const handleSubmit = (e: React.FormEvent | any, callback: () => void) => {
    if (e.preventDefault) {
      e.preventDefault();
    }

    setQuote("");

    updateServices(props.id as string, uService);
    callback();
    props.getData();
    toast("Se actualizo la solicitud");
  };
  return (
    <Modals blockClass="infoServices" title="Edición del servicio" showBtn>
      {(onClose) => (
        <>
          <div>
            <p>Informacion del servicio</p>
            <div></div>
          </div>
          <form onSubmit={(e) => handleSubmit(e, onClose)}>
          <div>
              <label htmlFor="quote">Servicio:</label>
              <input
                id="title"
                name="title"
                value={props.title}
                onChange={handleQuoteChange}
                style={{ width: "90%" }}
                placeholder="Descripcion"
                required
              />
            </div>
            <div>
              <label htmlFor="quote">Descripción:</label>
              <input
                id="description"
                name="description"
                value={props.description}
                onChange={handleQuoteChange}
                style={{ width: "90%" }}
                placeholder="Descripcion"
                required
              />
            </div>
            <div>
              <label htmlFor="quote">Top:</label>
              <input
                id="top"
                name="top"
                type="checkbox"
                checked={props.top}
              />
            </div>
            <div>
              <label htmlFor="quote">Activo:</label>
              <input
                id="active"
                name="active"
                type="checkbox"
                checked={props.active}
              />
            </div>
            <div>
              <Button color="danger" type="button" onClick={onClose}>
                Cancelar
              </Button>

              <Button type="submit">Enviar</Button>
            </div>
          </form>
        </>
      )}
    </Modals>
  );
};

export default FormServices;
