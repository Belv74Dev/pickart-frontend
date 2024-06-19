import ArtButton from '../ArtButton/ArtButton'
import styles from './Art.module.scss'
import Image from 'next/image'

export default function ImgPreview ({ title="Art", img }: { title?: string ,img: string}) {
    return (
        <>
            <div className={styles.ArtImg}>
                <Image src={img}  alt={title} width={1920} height={1080} />
            </div>
                {/* <ArtButton></ArtButton> */}
        </>
    )
}