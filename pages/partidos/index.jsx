import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Pagina from '@/components/Pagina'
import apiDeputados from '@/services/apiDeputados'
import { Card, Col, Container, Row } from 'react-bootstrap'
import Link from 'next/link'

const Index = ({ partidos }) => {
  return (
    <Pagina titulo="Partidos" barra="Partidos" ativo2="active">
        <Row>
          {partidos.map((item) => (
            <Col md={4} className="mb-3" key={item.id}>
              <Link href={'partidos/detalhesPartidos/' + item.id}>
                <Card border="info">
                  <Card.Header>{item.sigla}</Card.Header>
                  <Card.Body>
                    <Card.Title>{item.nome}</Card.Title>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
    </Pagina>
  )
}

export default Index

export async function getServerSideProps(context) {
  const partidos = await getAllPartidos()
  return {
    props: { partidos },
  }
}

async function getAllPartidos() {
  const pageSize = 50 // Tamanho de cada página de resultados
  let allPartidos = []

  let currentPage = 1
  let totalPages = 1

  while (currentPage <= totalPages) {
    const resultado = await apiDeputados.get('/partidos', {
      params: { pagina: currentPage, itens: pageSize },
    })

    const { dados, links } = resultado.data
    allPartidos = [...allPartidos, ...dados]

    totalPages = links.find((link) => link.rel === 'last').href.split('pagina=')[1]
    currentPage++
  }

  return allPartidos
}
