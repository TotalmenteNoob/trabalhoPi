import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";

const Cabecalho = (props) => {
  return (
    <>
      <Navbar bg="primary" variant="dark" className="fs-5">
        <Container>
          <Navbar.Brand href="/"><img src="/images/logo2.png" alt=""/></Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/deputados/" className={props.deputados}>Deputados</Nav.Link>
            <Nav.Link href="/partidos/" className={props.partidos}>Partidos</Nav.Link>
            <NavDropdown title="Deputados" id="basic-nav-dropdown">
              <NavDropdown.Item href="/deputados/">Todos os deputados</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Cabecalho;
