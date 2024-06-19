
import styles from './Header.module.scss'
import Image from 'next/image'



export default function ImgButton({  img }: { img: string}) {
    return (
        <>
            <div className={styles.ImgButton}>
            <Image  src={img} priority alt='' width={50} height={50} />
            </div>
        </>
    )
}