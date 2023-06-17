import Pagina from "@/components/Pagina";
import apiDeputados from "@/services/apiDeputados";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import Link from "next/link";

const Atores = ({ deputados, despesas, profissoes }) => {
  return (
    <Pagina titulo="Detalhes">
      <Container>
        <Row>
          <Col md={3}>
            <Card>
              <Card.Img variant="top" src={deputados.urlFoto} />
              <Card.Body>
                <Card.Title>{deputados.nome}</Card.Title>
                <Card.Text>Partido: {deputados.siglaPartido}</Card.Text>
                <Card.Text>UF: {deputados.siglaUf}</Card.Text>
              </Card.Body>
            </Card>
            <Button variant="danger my-2" href="/deputados">
              Voltar
            </Button>
          </Col>
          <Col md={7}>
            <h1>Despesas</h1>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Descrição</th>
                  <th>Valor</th>
                </tr>
              </thead>
              <tbody>
                {despesas.map((item) => (
                  <tr>
                    <td>{item.dataDocumento}</td>
                    <td>{item.tipoDespesa}</td>
                    <td>{item.valorDocumento}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
          <Col md={2}>
            <h1>Profissões</h1>
            <ul>
              {profissoes.map((item) => (
                <li>{item.titulo}</li>
              ))}
            </ul>
          </Col>
        </Row>
      </Container>
    </Pagina>
  );
};

export default Atores;

export async function getServerSideProps(context) {
  const id = context.params.id;

  const resultado = await apiDeputados.get("/deputados/" + id);
  const deputados = resultado.data.dados.ultimoStatus;

  const resultadoDespesas = await apiDeputados.get(
    "/deputados/" + id + "/despesas"
  );
  const despesas = resultadoDespesas.data.dados;

  const resultadoProfissoes = await apiDeputados.get(
    "/deputados/" + id + "/profissoes"
  );
  const profissoes = resultadoProfissoes.data.dados;

  return {
    props: { deputados, despesas, profissoes }, // will be passed to the page component as props
  };
}
