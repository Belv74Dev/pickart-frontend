import styles from './ImgBoard.module.scss'
import Image from 'next/image'

export default function ImgPreview ({ title="Art preview", img }: { title?: string ,img: string}) {
    return (
        <>
            <div className={styles.ArtPreview}>
                <Image  src={img}  alt={title} width={500} height={500}priority={true} />
                <div className={styles.Title}>
                    <p >{title}</p>
                </div>
            </div>
        </>
    )
}