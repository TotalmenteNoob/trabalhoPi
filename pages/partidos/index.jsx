import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Pagina from '@/components/Pagina'
import apiDeputados from '@/services/apiDeputados'
import { Card, Col, Container, Row } from 'react-bootstrap'
import Link from 'next/link'

const index = ({ partidos }) => {
    return (
        <Pagina titulo="Partidos" barra='Partidos' ativo2='active'>
            <Container>
                <Row>
                    {partidos.map(item => (
                        <Col md={4} className=' mb-3'>
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
            </Container>
        </Pagina>
    )
}

export default index

export async function getServerSideProps(context) {

    const resultado = await apiDeputados.get('/partidos')
    const partidos = resultado.data.dados

    return {
        props: { partidos }, // will be passed to the page component as props
    }
}