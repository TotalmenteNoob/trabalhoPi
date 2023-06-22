import React from "react";
import Pagina from "@/components/Pagina";
import apiDeputados from "@/services/apiDeputados";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import Link from "next/link";

const idProposicoes = ({ proposicoes, autores, relacionados, temas }) => {
    const formatarData = (data) => {
        const dataObjeto = new Date(data);
        const dia = dataObjeto.getDate().toString().padStart(2, '0');
        const mes = (dataObjeto.getMonth() + 1).toString().padStart(2, '0');
        const ano = dataObjeto.getFullYear();
        return `${dia}/${mes}/${ano}`;
    };

    return (
        <Pagina titulo={proposicoes.siglaTipo + " " + proposicoes.numero + "/" + proposicoes.ano} barra={proposicoes.siglaTipo + " " + proposicoes.numero + "/" + proposicoes.ano} ativo3="active">
            <Row>
                <Col md={12} className=' mt-3 mb-3'>
                    <Card border="info">
                        <Card.Header><h2>{proposicoes.descricaoTipo} {proposicoes.numero}/{proposicoes.ano}</h2></Card.Header>
                        <Card.Body>
                            <Card.Text><b> Data de apresentação: </b>{formatarData(proposicoes.dataApresentacao)}</Card.Text>
                            {autores && autores.length > 0 && autores.map((item) => (
                                <Card.Text key={item.id}><b> Autor: </b>{item.nome}</Card.Text>
                            ))}
                            {proposicoes.statusProposicao && proposicoes.statusProposicao.siglaOrgao && (
                                <Card.Text><b> Orgão: </b>{proposicoes.statusProposicao.siglaOrgao}</Card.Text>
                            )}
                            <Card.Text>
                                <b>Temas: </b>
                                {temas.map((item, index) => (
                                    <React.Fragment key={item.id}>
                                        {index > 0 && ", "}
                                        {item.tema}
                                    </React.Fragment>
                                ))}
                            </Card.Text>
                            {proposicoes.statusProposicao && proposicoes.statusProposicao.descricaoSituacao && (
                                <Card.Text><b> Situação: </b>{proposicoes.statusProposicao.descricaoSituacao}</Card.Text>
                            )}
                            {proposicoes.statusProposicao && proposicoes.statusProposicao.apreciacao && (
                                <Card.Text><b> Apreciação: </b>{proposicoes.statusProposicao.apreciacao}</Card.Text>
                            )}
                            {proposicoes.ementa && (
                                <Card.Text><b> Ementa: </b>{proposicoes.ementa} {proposicoes.ementaDetalhada}</Card.Text>
                            )}
                            {proposicoes.urlInteiroTeor && (
                                <Button variant="success my-2" href={proposicoes.urlInteiroTeor} target="_blank">
                                    Documento na integra
                                </Button>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            {relacionados.length > 0 && (
                <Row>
                    <h2>Propostas relacionadas</h2>
                    {relacionados.map(item => (
                        <Col md={6} className=' mt-3 mb-3'>
                            <Link href={'../../proposicoes/detalhesProposicoes/' + item.id}>
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
            )}
        </Pagina>
    )
}

export default idProposicoes

export async function getServerSideProps(context) {
    const id = context.params.id;

    const resultado = await apiDeputados.get("/proposicoes/" + id);
    const proposicoes = resultado.data.dados;

    const resultadoAutores = await apiDeputados.get("/proposicoes/" + id + "/autores");
    const autores = resultadoAutores.data.dados;

    const resultadoRelacionados = await apiDeputados.get("/proposicoes/" + id + "/relacionadas");
    const relacionados = resultadoRelacionados.data.dados;

    const resultadoTemas = await apiDeputados.get("/proposicoes/" + id + "/temas");
    const temas = resultadoTemas.data.dados;

    return {
        props: { proposicoes, autores, relacionados, temas },
    };
}