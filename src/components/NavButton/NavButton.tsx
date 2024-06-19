"use client";
import styles from './NavButton.module.scss'
import Image from 'next/image'
function Scroll(){
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
}

export default function NavButton () {
    return (
        <>
            <div className={styles.NavButton} onClick={Scroll}>
                <Image src={"/ArrowWhite.png"}  alt={"Scroll to top"} width={500} height={500 } />
            </div>
        </>
    )
}