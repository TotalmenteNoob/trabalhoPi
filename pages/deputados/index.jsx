import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Pagina from '@/components/Pagina'
import apiDeputados from '@/services/apiDeputados'
import { Card, Col, Container, Row } from 'react-bootstrap'
import Link from 'next/link'

const index = ({ deputados }) => {
    return (
        <Pagina titulo="Deputados">
            <Container>
                <Row>
                    {deputados.map(item => (
                        <Col md={2}>
                            <Link href={'/detalhesDeputados/' + item.id}><Card.Img className='card bg-secondary m-2' variant='top' src={item.urlFoto}></Card.Img></Link>
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
