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
                        <Col md={2}>
                            <Link href={'partidos/detalhespartidos/' + item.id}><Card.Img className='card bg-secondary m-2' variant='top' src={item.urlLogo}></Card.Img></Link>
                            <h1>{item.sigla}</h1>
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