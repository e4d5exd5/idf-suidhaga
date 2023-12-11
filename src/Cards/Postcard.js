/* eslint-disable @next/next/no-img-element */
import React from 'react'

const Card = () => {
  return (
    <section
      style={{ backgroundColor: 'white' }}
      className='text-red-400 bg-gray-900 body-font shadow-gray-500 shadow-xl rounded-xl overflow-hidden mb-4'
    >
      <div className='container px-5 py-24 mx-auto'>
        <div className='lg:w-4/5 mx-auto flex flex-wrap'>
          <img
            alt='ecommerce'
            className='lg:w-1/2 w-1/2 lg:h-auto h-64 p-2 mx-2 my-2 object-cover object-center rounded-xl'
            src='https://images.unsplash.com/photo-1617694820985-a5476fe22722?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8d2VhdmluZ3xlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80'
          />
          <div className='lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0 p-4'>
            <h2 className='text-sm title-font text-black font-bold tracking-widest'>
              TITLE
            </h2>
            <div className='flex mb-4'>
              <a className='flex-grow text-black border-b-2 border-blue-400 py-2 text-lg px-1'>
                Details:
              </a>
            </div>
            <p className='leading-relaxed mb-4 text-gray-600'>
              Required to build xyz items using xyz materials.
            </p>
            <div className='flex border-t border-gray-600 py-2'>
              <span className='text-black'>Color: </span>
              <span className='ml-auto text-black'>Blue</span>
            </div>
            <div className='flex border-t border-gray-600 py-2'>
              <span className='text-black'>Size: </span>
              <span className='ml-auto text-black'>Medium</span>
            </div>
            <div className='flex border-t border-b mb-6 border-gray-600 py-2'>
              <span className='text-black'>Quantity: </span>
              <span className='ml-auto text-black'>4</span>
            </div>
            <div className='flex flex-col'>
              <span className='title-font font-medium text-2xl text-black'>
                $58.00
              </span>
              {/* <button className=' ml-2 w-2 text-black bg-blue-400 border-2 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded'>
                Button
              </button> */}
              {/* <button className='rounded-full w-10 h-10 bg-gray-800 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4'>
                <svg
                  fill='currentColor'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  stroke-width='2'
                  className='w-5 h-5'
                  viewBox='0 0 24 24'
                >
                  <path d='M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z'></path>
                </svg>
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
export default Card
