import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Image } from "react-bootstrap";
import Cabecalho from "./Cabecalho";
import styles from '../styles/Home.module.css'




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
      <div className={styles.image}>
        <Container>
          {props.children}{" "}
        </Container>
      </div>
      {/*a props.children serve para colocar o conteudo onde quiser na página*/}
    </>
  );
};

export default Pagina;
