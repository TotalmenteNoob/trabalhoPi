import React from 'react';
import {
  MDBFooter,
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBIcon,
  MDBBtn
} from 'mdb-react-ui-kit';
import { FaFacebookF } from 'react-icons/Fa';
import { AiOutlineTwitter } from 'react-icons/Ai';
import { BsInstagram } from 'react-icons/Bs';
import { AiOutlineGithub } from 'react-icons/Ai';

export default function App() {
  return (
    <MDBFooter className='bg-secondary text-center text-white'>
      <MDBContainer className='p-4 pb-0'>
        <section className='mb-4'>
          <MDBBtn
            floating
            className='m-1'
            style={{ backgroundColor: '#3b5998' }}
            href='#!'
            role='button'
          >
            <MDBIcon fab icon='facebook-f'/>
            <FaFacebookF size={17}/>
          </MDBBtn>

          <MDBBtn
            floating
            className='m-1'
            style={{ backgroundColor: '#55acee' }}
            href='#!'
            role='button'
          >
            <MDBIcon fab icon='twitter' />
            <AiOutlineTwitter size={20}/>
          </MDBBtn>

          <MDBBtn
            floating
            className='m-1'
            style={{ backgroundColor: '#ac2bac' }}
            href='#!'
            role='button'
          >
            <MDBIcon fab icon='instagram' />
            <BsInstagram size={20}/>
          </MDBBtn>

          <MDBBtn
            floating
            className='m-1'
            style={{ backgroundColor: '#333333' }}
            href='#!'
            role='button'
          >
            <MDBIcon fab icon='github' />
            <AiOutlineGithub size={20}/>
          </MDBBtn>
        </section>
      </MDBContainer>

      <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
      &copy; 2023 Copyright:&nbsp; 
        <a className='text-white' href='https://mdbootstrap.com/'>
          A editar
        </a>
      </div>
    </MDBFooter>
  );
}