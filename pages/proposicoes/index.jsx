import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Pagina from '@/components/Pagina'
import apiDeputados from '@/services/apiDeputados'
import { Card, Col, Container, Row } from 'react-bootstrap'
import Link from 'next/link'

const index = ({proposicoes}) => {
    return (
        <Pagina titulo="Proposições" barra="Proposições" ativo3="active">
            <Row>
                {proposicoes.map(item => (
                    <Col md={6} className=' mt-3 mb-3'>
                        <Link href={'proposicoes/detalhesProposicoes/' + item.id}>
                            <Card border="info">
                                <Card.Header><h5>{item.siglaTipo} {item.numero}</h5></Card.Header>
                                <Card.Body>
                                    <Card.Text><b> Ano: </b>{item.ano}</Card.Text>
                                    <Card.Text><b> Ementa: </b>{item.ementa}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
        </Pagina>
    )
}

export default index

export async function getServerSideProps(context) {

    const resultado = await apiDeputados.get('/proposicoes')
    const proposicoes = resultado.data.dados

    return {
        props: { proposicoes }, 
    }
}