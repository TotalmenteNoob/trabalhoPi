import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Pagina from '@/components/Pagina'
import apiDeputados from '@/services/apiDeputados'
import { Card, Col, Container, Row } from 'react-bootstrap'
import Link from 'next/link'

const index = ({ deputados }) => {
    return (
        <Pagina titulo="Deputados" barra='Deputados' ativo1='active'>
            <Container>
                <Row>
                    {deputados.map(item => (
                        <Col md={2} className=' mt-3 mb-3'>
                            <Link href={'deputados/detalhesDeputados/' + item.id}>
                                <Card border="info">
                                    <Card.Img variant="top" src={item.urlFoto} />
                                    <Card.Header><h5>{item.nome}</h5></Card.Header>
                                    <Card.Body>
                                        <Card.Text><b> Partido: </b>{item.siglaPartido}</Card.Text>
                                        <Card.Text><b> UF: </b>{item.siglaUf}</Card.Text>
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

    const resultado = await apiDeputados.get('/deputados')
    const deputados = resultado.data.dados

    return {
        props: { deputados }, // will be passed to the page component as props
    }
}
