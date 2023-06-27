import Pagina from "@/components/Pagina";
import apiDeputados from "@/services/apiDeputados";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import Link from "next/link";
import { BsArrowReturnLeft } from 'react-icons/Bs';
import { HiInformationCircle } from 'react-icons/Hi';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/Fa';

const idDeputados = ({ deputados, despesas, profissoes }) => {

  const formatarData = (data) => {
    const dataObjeto = new Date(data);
    const dia = dataObjeto.getDate().toString().padStart(2, '0');
    const mes = (dataObjeto.getMonth() + 1).toString().padStart(2, '0');
    const ano = dataObjeto.getFullYear();
    return `${dia}/${mes}/${ano}`;
  };

  return (
    <Pagina titulo={deputados.ultimoStatus.nome} barra='Deputados' ativo1='active'>
      <Row>
        <Col md={3}>
          <Card>
            <Card.Img variant="top" src={deputados.ultimoStatus.urlFoto} />
            <Card.Body>
            <h1>Informações pessoais</h1>
              <Card.Text>Partido: {deputados.ultimoStatus.siglaPartido}</Card.Text>
              <Card.Text>UF: {deputados.ultimoStatus.siglaUf}</Card.Text>
              {deputados.nomeCivil && (
                    <Card.Text>Nome civil: {deputados.nomeCivil}</Card.Text>
                  )}
                  {deputados.ufNascimento && (
                    <Card.Text>Estado de nascimento: {deputados.ufNascimento}</Card.Text>
                  )}
                  {deputados.municipioNascimento && (
                    <Card.Text>Município de nascimento: {deputados.municipioNascimento}</Card.Text>
                  )}
                  {deputados.dataNascimento && (
                    <Card.Text>Data de nascimento: {formatarData(deputados.dataNascimento)}</Card.Text>
                  )}
                  {deputados.escolaridade && (
                    <Card.Text>Escolaridade: {deputados.escolaridade}</Card.Text>
                  )}
            </Card.Body>
          </Card>
          <Row>
            <Col>
              <Card className="my-1">
                <Card.Body>
                  <Card.Title>Contatos</Card.Title>
                  <Card.Text>Email: {deputados.ultimoStatus.gabinete.email}</Card.Text>
                  <Card.Text>Telefone: {deputados.ultimoStatus.gabinete.telefone}</Card.Text>
                </Card.Body>
              </Card>
              {/* <Button variant="success my-2" href={"https://www.camara.leg.br/deputados/" + deputados.id} target="_blank">
                Mais informações
                <HiInformationCircle size={20} className="me-1" />
              </Button> */}
              <Button variant="danger my-2" href="/deputados">
                <BsArrowReturnLeft size={15} className="me-1" />
                Voltar
              </Button>
            </Col>
          </Row>
        </Col>
        <Col md={6}>
          <Col>
            <Row>
              <h1>gráficos</h1>
              <Card className="my-1">
              </Card>
            </Row>
          </Col>

          <h1>Despesas</h1>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Descrição</th>
                <th>Valor</th>
                <th>Data</th>
              </tr>
            </thead>
            <tbody>
              {despesas.map((item) => (
                <tr key={item.id}>
                  <td>{item.tipoDespesa}</td>
                  <td>R${item.valorDocumento}</td>
                  <td>{formatarData(item.dataDocumento)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>

        <Col md={3}>
          <Row>
            <Col>
              <h1>Redes sociais</h1>
              <ul style={{ listStyleType: 'none' }}>
                {deputados.redeSocial.map((redeSocial, index) => (
                  <li
                    key={index}
                    style={{ display: 'inline-block', marginRight: '10px' }}
                  >
                    {redeSocial.includes('facebook.com') && (
                      <a href={redeSocial} target="_blank" rel="noopener noreferrer">
                        <FaFacebook size={35} style={{ cursor: 'pointer', color: '#1877F2' }} />
                      </a>
                    )}
                    {redeSocial.includes('twitter.com') && (
                      <a href={redeSocial} target="_blank" rel="noopener noreferrer">
                        <FaTwitter size={35} style={{ cursor: 'pointer', color: '#1DA1F2' }} />
                      </a>
                    )}
                    {redeSocial.includes('instagram.com') && (
                      <a href={redeSocial} target="_blank" rel="noopener noreferrer">
                        <FaInstagram size={35} style={{ cursor: 'pointer', color: '#E4405F' }} />
                      </a>
                    )}
                    {redeSocial.includes('youtube.com') && (
                      <a href={redeSocial} target="_blank" rel="noopener noreferrer">
                        <FaYoutube size={35} style={{ cursor: 'pointer', color: '#FF0000' }} />
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </Col>
          </Row>
          <h1>Profissões</h1>
          <ul>
            {profissoes.map((item) => (
              <li key={item.id}>{item.titulo}</li>
            ))}
          </ul>
        </Col>

      </Row>
    </Pagina>
  );
};

export default idDeputados;

export async function getServerSideProps(context) {
  const id = context.params.id;

  const resultado = await apiDeputados.get("/deputados/" + id);
  const deputados = resultado.data.dados;

  const resultadoDespesas = await apiDeputados.get(
    "/deputados/" + id + "/despesas"
  );
  const despesas = resultadoDespesas.data.dados;

  const resultadoProfissoes = await apiDeputados.get(
    "/deputados/" + id + "/profissoes"
  );
  const profissoes = resultadoProfissoes.data.dados;

  return {
    props: { deputados, despesas, profissoes },
  };
}