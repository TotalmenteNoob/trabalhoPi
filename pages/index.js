import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Pagina from '@/components/Pagina';
import apiDeputados from '@/services/apiDeputados';
import { Accordion, Button, Card, Container, Pagination } from 'react-bootstrap';
import Link from 'next/link';
import { BsYoutube, BsInfoCircle } from 'react-icons/Bs';

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
    <div className="page-wrapper">
      <style jsx>{`
        .page-wrapper {
          background-image: url('images/congresso.jpg');
          background-size: cover;
          background-position: center;
          min-height: 100vh;
        }
      `}</style>

      <Pagina titulo="Seja bem-vindo" barra="Início">
        <div className="d-grid gap-2 my-5">
          <Button variant="danger" size="lg" href='https://www.youtube.com/@CamaradosDeputadosoficial' target="_blank">
            Acompanhe as votações ao vivo aqui <BsYoutube size={30}/>
          </Button>
        </div>

        {getItensPaginaAtual().map((item) => (
          <Accordion key={item.id} className='my-2'>
            <Accordion.Item eventKey={item.id}>
              <Accordion.Header>{item.proposicaoObjeto} {item.descricao}</Accordion.Header>
              <Accordion.Body>
                <Card className="my-1">
                  <Card.Body className='my-2'>
                    <ul>
                      <li>
                        <Card.Text className='my-2'>Descrição: {item.descricao}</Card.Text>
                      </li>
                      <li>
                        <Card.Text className='my-2'>Proposição: {item.proposicaoObjeto}</Card.Text>
                      </li>
                      <li>
                        <Card.Text className='my-2'>Sigla do Orgão: {item.siglaOrgao}</Card.Text>
                      </li>
                      <div className="d-grid gap-2">
                        <Button className="mt-2" variant="primary" size="lg" href={item.id}>
                          Informações <BsInfoCircle size={30}/>
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
    </div>
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
