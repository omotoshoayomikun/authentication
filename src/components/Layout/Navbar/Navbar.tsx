import React from 'react'
import styles from './Navbar.module.css'
import Image from 'next/image'
function Navbar() {
  return (
    <div className={styles.navbar}>
      <div className="flex gap-3 items-center">
        <div className="text-right">
          <h5 className='font-bold text-[15px] leading-3'>OMOTOSHO JAMES AYOMIKUN</h5>
          <span className='text-[13px] text-[#646464]'>Student</span>
        </div>
        <div className="w-[40px] h-[40px] relative">
          <Image src='/images/CSHNDF223411.jpg' alt='image' fill={true} className='rounded-[50%]' />
        </div>
      </div>
    </div>
  )
}

export default Navbar