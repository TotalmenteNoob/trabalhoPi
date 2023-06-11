import React from 'react'
import { Container } from 'react-bootstrap'
import Cabecalho from './Cabecalho'

const Pagina = (props) => {
    return (
        <>
            <Cabecalho />
            <div className='bg-secondary py-3 text-white text-center mb-3'>
                <Container>
                    <h1>{props.titulo}</h1>
                </Container>
            </div>

            {props.children} {/*a props.children serve para colocar o conteudo onde quiser na página*/}
             
            <div style={{ width: '100%' }} className='d-flex align-items-center justify-content-center bg-secondary position-relative bottom-0 mt-3 py-3 text-center text-light'>
                <p>&copy; Todos os direitos reservados</p>
            </div>
        </>
    )
}

export default Pagina