import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container } from "react-bootstrap";
import Cabecalho from "./Cabecalho";

const Pagina = (props) => {
  return (
    <>

      <title>{props.barra}</title>
      <Cabecalho deputados={props.ativo1} partidos={props.ativo2} proposicoes={props.ativo3} />
      <div className="bg-info py-3 text-white text-center mb-3">
        <Container>
          <h1>{props.titulo}</h1>
        </Container>
      </div>
      <Container>
        {props.children}{" "}
      </Container>
      {/*a props.children serve para colocar o conteudo onde quiser na página*/}
    </>
  );
};

export default Pagina;
