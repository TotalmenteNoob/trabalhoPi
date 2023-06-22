import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Pagina from '@/components/Pagina';
import apiDeputados from '@/services/apiDeputados';
import { Card, Col, Container, Row, Pagination, Form, Button } from 'react-bootstrap';
import Link from 'next/link';

const Index = ({ deputados }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const itemsPerPage = 30; // Número de deputados por página

  // Cálculo para determinar o índice inicial e final dos deputados a serem exibidos na página atual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Função para atualizar a página atual
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Função para atualizar a pesquisa
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reinicia a página ao digitar na pesquisa
  };

  // Filtra os deputados com base na pesquisa
  const filteredDeputados = deputados.filter((item) =>
    item.nome.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Obtém os deputados a serem exibidos na página atual
  const currentDeputados = filteredDeputados.slice(indexOfFirstItem, indexOfLastItem);

  // Cálculo para determinar o número total de páginas
  const totalPages = Math.ceil(filteredDeputados.length / itemsPerPage);

  return (
    <Pagina titulo="Deputados" barra="Deputados" ativo1="active">
      <Container>
        <Form className="mt-3">
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Pesquisar"
              value={searchQuery}
              onChange={handleSearchInputChange}
            />
          </Form.Group>
        </Form>
      </Container>
      <Row>
        {currentDeputados.map((item) => (
          <Col md={2} className="mt-3 mb-3" key={item.id}>
            <Link href={'deputados/detalhesDeputados/' + item.id}>
              <Card border="info">
                <Card.Img variant="top" src={item.urlFoto} />
                <Card.Header>
                  <h5>{item.nome}</h5>
                </Card.Header>
                <Card.Body>
                  <Card.Text>
                    <b>Partido: </b>
                    {item.siglaPartido}
                  </Card.Text>
                  <Card.Text>
                    <b>UF: </b>
                    {item.siglaUf}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
      <Container className="mt-3">
        <Pagination className="justify-content-center">
          {Array.from({ length: totalPages }, (_, i) => (
            <Pagination.Item
              key={i + 1}
              active={i + 1 === currentPage}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </Container>
    </Pagina>
  );
};

export default Index;

export async function getServerSideProps(context) {
  const resultado = await apiDeputados.get('/deputados');
  const deputados = resultado.data.dados;

  return {
    props: { deputados }, // será passado para o componente de página como props
  };
}
