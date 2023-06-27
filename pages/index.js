import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Pagina from '@/components/Pagina';
import apiDeputados from '@/services/apiDeputados';
import { Accordion, Button, Card, Container, Pagination } from 'react-bootstrap';
import Link from 'next/link';

const Index = ({ votacoes }) => {
  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 20;
  const totalPages = Math.ceil(votacoes.length / itensPorPagina);

  const getItensPaginaAtual = () => {
    const indiceInicio = (paginaAtual - 1) * itensPorPagina;
    const indiceFim = indiceInicio + itensPorPagina;
    return votacoes.slice(indiceInicio, indiceFim);
  };

  const handlePageChange = (pagina) => {
    setPaginaAtual(pagina);
  };

  return (
    <Pagina titulo="Votações" barra="Início">
      <div className="d-grid gap-2">
        <Button variant="primary" size="lg" href='https://www.youtube.com/@tvsenado'>
          Link para acompanhar as votações na Cámara dos Deputados
        </Button>
      </div>

      {getItensPaginaAtual().map((item) => (
        <Accordion key={item.id}>
          <Accordion.Item eventKey={item.id}>
            <Accordion.Header>{item.descricao}</Accordion.Header>
            <Accordion.Body>
              <Card className="my-1">
                <Card.Body>
                  <ul>
                    <li>
                      <Card.Text>Descrição: {item.descricao}</Card.Text>
                    </li>
                    <li>
                      <Card.Text>Proposição: {item.proposicaoObjeto}</Card.Text>
                    </li>
                    <li>
                      <Card.Text>Sigla do Orgão: {item.siglaOrgao}</Card.Text>
                    </li>
                    <div className="d-grid gap-2">
                      <Button variant="primary" size="lg" href={item.id}>
                        Informações
                      </Button>
                    </div>
                  </ul>
                </Card.Body>
              </Card>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      ))}
      <Container className="mt-3">
        <Pagination className="justify-content-center">
          {Array.from(Array(totalPages).keys()).map((pagina) => (
            <Pagination.Item
              key={pagina + 1}
              active={pagina + 1 === paginaAtual}
              onClick={() => handlePageChange(pagina + 1)}
            >
              {pagina + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </Container>
    </Pagina>
  );
};

export default Index;

export async function getServerSideProps() {
  const resultado = await apiDeputados.get('/votacoes');
  const votacoes = resultado.data.dados;
  return {
    props: { votacoes },
  };
}
