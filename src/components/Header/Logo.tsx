import styles from './Header.module.scss'
import Image from 'next/image'
import Link from 'next/link';

export default function Logo() {
   return (
      <Link href={`/`} className={styles.Logo}>
            <Image src='/Logotip_White.png' priority alt='' width={500} height={500} />
            <p>PickArt</p>
      </Link>
   )
}