import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-center items-center p-4'>
      <div className="flex justify-center items-center min-w-1/3 rounded-full bg-white ring-4 ring-white px-4 py-3 drop-shadow-lg drop-shadow-gray-200 shadow-inner text-md">
        <p className="tracking-widest">
          Breath of Words
        </p>
      </div>
    </nav>
  )
}

export default Navbar