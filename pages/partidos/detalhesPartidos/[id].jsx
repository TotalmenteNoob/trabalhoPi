import Pagina from "@/components/Pagina";
import apiDeputados from "@/services/apiDeputados";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import Link from "next/link";
import { BsArrowReturnLeft } from 'react-icons/Bs';

const Idpartidos = ({ partidos, lideres, membros }) => {

  return (
    <Pagina titulo={partidos.nome} barra='Partidos' ativo2='active'>

      <Row>
        <Col md={3}>
          <Card>
            {
              partidos.urlLogo ?
                <Card.Img variant="top" src={partidos.urlLogo}></Card.Img> :
                <Card.Img variant="top" src={"data:image/png;base64,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"}></Card.Img>
            }
            <Card.Body>
              <Card.Title><h1>{partidos.nome}</h1></Card.Title>
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
        {lideres.length === 0 && (
          <Col md={3}>
            <h1>Líderes</h1>
            <Card>
              <Card.Img variant="top" src={partidos.status.lider.urlFoto} />
              <Card.Body>
                <Card.Title><b>Lider:</b> {partidos.status.lider.nome}</Card.Title>
                <Card.Text><b>UF:</b> {partidos.status.lider.uf}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        )}
        <Col>
          <Row>
            {lideres.length > 0 && <h1>Líderes</h1>}
            {lideres.map((item) => (
              <Col md={4} className="mt-3 mb-3" key={item.id}>
                <Link href={"../../deputados/detalhesDeputados/" + item.id}>
                  <Card border="info">
                    <Card.Img variant="top" src={item.urlFoto} />
                    <Card.Header>
                      <h2>{item.nome}</h2>
                    </Card.Header>
                    <Card.Body>
                      <Card.Text>
                        <b> Titulo: </b>
                        {item.titulo}
                      </Card.Text>
                      <Card.Text>
                        <b> UF: </b>
                        {item.siglaUf}
                      </Card.Text>
                      <Card.Text>
                        <b> Email: </b>
                        {item.email}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>

      <Row>
        <h1>Membros</h1>
        {membros.map(item => (
          <Col md={3} className=' mt-3 mb-3'>
            <Link href={'../../deputados/detalhesDeputados/' + item.id}>
              <Card border="info">
                <Card.Img variant="top" src={item.urlFoto} />
                <Card.Header><h2>{item.nome}</h2></Card.Header>
                <Card.Body>
                  <Card.Text><b> Uf: </b>{item.siglaUf}</Card.Text>
                  <Card.Text><b> Email: </b>{item.email}</Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </Pagina >
  );
};

export default Idpartidos;

export async function getServerSideProps(context) {
  const id = context.params.id;

  const resultado = await apiDeputados.get("/partidos/" + id);
  const partidos = resultado.data.dados;

  const resultadoLideres = await apiDeputados.get("/partidos/" + id + "/lideres");
  const lideres = resultadoLideres.data.dados

  const resultadoMembros = await apiDeputados.get("/partidos/" + id + "/membros")
  const membros = resultadoMembros.data.dados


  return {
    props: { partidos, lideres, membros },
  };
}
