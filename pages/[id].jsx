import Pagina from '@/components/Pagina'
import apiDeputados from '@/services/apiDeputados'
import React, { useState } from 'react'
import { Button, Card, Offcanvas } from 'react-bootstrap'

const idVotacao = ({ votacoes }) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <Pagina titulo="Votações">
            <Card>
                <Card.Body>
                    <Card.Title>Descrição</Card.Title>
                    <Card.Text>
                        {votacoes.ultimaApresentacaoProposicao.descricao}
                    </Card.Text>
                </Card.Body>
            </Card>
        </Pagina>
    )
}

export default idVotacao
export async function getServerSideProps(context) {
    const id = context.params.id;
    const resultado = await apiDeputados.get('/votacoes/' + id);
    const votacoes = resultado.data.dados;
    return {
        props: { votacoes }, // será passado para o componente de página como props
    };
}