import React from 'react'

const Rodape = () => {
  return (
    <div style={{ width: '100%' }} className='d-flex justify-content-center align-items-center bg-primary position-relative bottom-0 mt-3 py-3 text-center text-light '>
      &copy; {new Date().getFullYear()} Copyright:{' '}
      <span>&nbsp;</span>
      <p className="my-0"> Trabalho de projeto integrado feito com muito amor e carinho</p>
    </div>

  )
}

export default Rodape