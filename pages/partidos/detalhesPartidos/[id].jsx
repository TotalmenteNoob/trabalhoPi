import Pagina from "@/components/Pagina";
import apiDeputados from "@/services/apiDeputados";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import Link from "next/link";
import { BsArrowReturnLeft } from 'react-icons/Bs';

const Idpartidos = ({ partidos, Lideres }) => {

  return (
    <Pagina titulo={partidos.nome} barra='Partidos' ativo2='active'>
      <Container>
        <Row>
          <Col md={3}>
            <Card>
              <Card.Img variant="top" src={partidos.urlLogo} />
              <Card.Body>
                <Card.Title>{partidos.nome}</Card.Title>
                <Card.Text>Sigla: {partidos.sigla}</Card.Text>
                <Card.Text>Situação: {partidos.status.situacao}</Card.Text>
                <Card.Text>Total de membros: {partidos.status.totalMembros}</Card.Text>
              </Card.Body>
            </Card>
            <Button variant="danger my-2" href="/partidos">
              <BsArrowReturnLeft size={15} className="me-1" />
              Voltar
            </Button>
          </Col>
          <Col md={3}>
            <Card>
              <Card.Img variant="top" src={partidos.status.lider.urlFoto} />
              <Card.Body>
                <Card.Title>Lider: {partidos.status.lider.nome}</Card.Title>
                <Card.Text>UF: {partidos.status.lider.uf}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          {Lideres.map(item => (
            <Col md={3} className=' mt-3 mb-3'>
              <Link href={'../../deputados/detalhesDeputados/' + item.id}>
                <Card border="info">
                  <Card.Img variant="top" src={item.urlFoto} />
                  <Card.Header><h2>{item.nome}</h2></Card.Header>
                  <Card.Body>
                    <Card.Text><b> Titulo: </b>{item.titulo}</Card.Text>
                    <Card.Text><b> Uf: </b>{item.siglaUf}</Card.Text>
                    <Card.Text><b> Email: </b>{item.email}</Card.Text>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
    </Pagina >
  );
};

export default Idpartidos;

export async function getServerSideProps(context) {
  const id = context.params.id;

  const resultado = await apiDeputados.get("/partidos/" + id);
  const partidos = resultado.data.dados;

  const resultadoLideres = await apiDeputados.get("/partidos/" + id + "/lideres");
  const Lideres = resultadoLideres.data.dados

  return {
    props: { partidos, Lideres },
  };
}
