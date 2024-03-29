import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { BsGithub } from 'react-icons/Bs';

const Cabecalho = (props) => {
  return (
    <>
      <Navbar bg="primary" variant="dark" className="fs-5">
        <Container>
          <Navbar.Brand href="/"><img src="/images/logo2.png" alt=""/></Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/deputados/" className={props.deputados}>Deputados</Nav.Link>
            <Nav.Link href="/partidos/" className={props.partidos}>Partidos</Nav.Link>
            <Nav.Link href="/proposicoes/" className={props.proposicoes}>Proposições</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="https://github.com/TotalmenteNoob/trabalhoPi" target="_black"><BsGithub size={30}/></Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Cabecalho;
