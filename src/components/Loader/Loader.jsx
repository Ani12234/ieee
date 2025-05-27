import React from 'react'
import './loader.css';

const Loader = () => {
  return (
    <>

        <div className='w-full h-screen flex items-center justify-center'>
            <h1 className='uppercase sm:text-2xl text-xl font-bold'>think . innovate . <span className='share'>share</span></h1>
        </div>

        <div className='bg-zinc-700 absolute bottom-0 w-full h-1'>
            <div className='loadingLine h-full bg-gradient-to-r from-[#e75d05] to-[#d00100]'></div>
        </div>

    </>
  )
}

export default Loader