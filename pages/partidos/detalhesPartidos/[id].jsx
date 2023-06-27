import Pagina from "@/components/Pagina";
import apiDeputados from "@/services/apiDeputados";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import Link from "next/link";
import { BsArrowReturnLeft } from 'react-icons/Bs';

const idPartidos = ({ partidos, lideres, membros, proposicoes }) => {

  return (
    <Pagina titulo={partidos.nome} barra='Partidos' ativo2='active'>

      <Row>
        <Col md={3}>
          <Card>
            <Card.Img variant="top" src={partidos.urlLogo}></Card.Img>
            <Card.Body>
              <Card.Title><h1>{partidos.nome}</h1></Card.Title>
              <Card.Text><strong>Sigla:</strong> {partidos.sigla}</Card.Text>
              <Card.Text><strong>Situação:</strong> {partidos.status.situacao}</Card.Text>
              <Card.Text><strong>Total de membros:</strong> {partidos.status.totalMembros}</Card.Text>
            </Card.Body>
          </Card>
          <Button variant="danger my-2" href="/partidos">
            <BsArrowReturnLeft size={15} className="me-1" />
            Voltar
          </Button>
        </Col>
        <Col>
          <h1>Ultimas proposições</h1>
          {proposicoes.slice(0, 3).map(item => (
            <Row md={8} className=' mt-3 mb-3'>
              <Link href={'../../proposicoes/detalhesProposicoes/' + item.id}>
                <Card>
                  <Card.Header><h5>{item.siglaTipo} {item.numero}/{item.ano}</h5></Card.Header>
                  <Card.Body>
                    <Card.Text><b> Ementa: </b>{item.ementa}</Card.Text>
                  </Card.Body>
                </Card>
              </Link>
            </Row>
          ))}
        </Col>
      </Row>
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
      <Row>
          {lideres.length > 0 && <h1>Líderes</h1>}
          {lideres.map((item) => (
            <Col md={3} className="mt-3 mb-3" key={item.id}>
              <Link href={"../../deputados/detalhesDeputados/" + item.id}>
                <Card>
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
      <Row>
        <h1>Membros</h1>
        {membros.map(item => (
          <Col md={3} className=' mt-3 mb-3'>
            <Link href={'../../deputados/detalhesDeputados/' + item.id}>
              <Card>
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

export default idPartidos;

export async function getServerSideProps(context) {
  const id = context.params.id;

  const resultado = await apiDeputados.get("/partidos/" + id);
  const partidos = resultado.data.dados;

  const resultadoLideres = await apiDeputados.get("/partidos/" + id + "/lideres");
  const lideres = resultadoLideres.data.dados

  const resultadoMembros = await apiDeputados.get("/partidos/" + id + "/membros")
  const membros = resultadoMembros.data.dados

  const resultadoProposicoes = await apiDeputados.get("/proposicoes?idPartidoAutor=" + id + "&ordem=DESC&ordenarPor=id")
  const proposicoes = resultadoProposicoes.data.dados

  return {
    props: { partidos, lideres, membros, proposicoes },
  };
}
