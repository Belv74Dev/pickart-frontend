import styles from './Header.module.scss'
import Image from 'next/image'

export default function BM () {
return (
            <div className={styles.BM}>
               <Image src='/Logotip_White.png' priority alt='' width={500} height={500} />
            </div>
	)
}