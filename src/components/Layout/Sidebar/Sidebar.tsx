import Image from 'next/image'
import React from 'react'
import styles from './Sidebar.module.css'
import Sidebarlist from './Sidebarlist'

function Sidebar() {
  return (
    <div className='w-[full] h-[100vh] bg-[#042954]'>
        <div className={`${styles.top_sidebar}`}>
            <Image src="/images/logo.png" alt='Logo image' width={160} height={48} />
            {/* <div>
                <i>Icon</i>
            </div> */}
        </div>
        <div>
            <Sidebarlist />
        </div>
    </div>
  )
}

export default Sidebar