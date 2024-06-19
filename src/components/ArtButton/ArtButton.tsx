import styles from './ArtButton.module.scss'
import Image from 'next/image'


export default function ArtButton () {
    return (
        <>
            <div className={styles.ArtButton}>
                <Image src={"/Dounload.png"}  alt={"Like"} width={64} height={64 } />
                <Image src={"/likesBlack.png"}  alt={"Like"} width={64} height={64 } />
            </div>
        </>
    )
}