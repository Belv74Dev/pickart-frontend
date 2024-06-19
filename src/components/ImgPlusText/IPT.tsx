import styles from './IPT.module.scss'
import Image from 'next/image'

export default function IPT({ title, img="/Login_White.png",size="M" }: { title: string ,img?: string|null,size?:string}) {
    if(size=="L") {
        return (
            <div className={styles.IPT_L}>
                <Image src={img} priority alt='' width={64} height={64} />
                <p>{title}</p>
            </div>
        )
    }
    if(size=="S") {
        return (
            <div className={styles.IPT_S}>
                <Image src={img} priority alt='' width={24} height={24} />
                <p>{title}</p>
            </div>
        )
    }
    return (
        <div className={styles.IPT}>
            <Image src={img} priority alt='' width={32} height={32} />
            <p>{title}</p>
        </div>
    )
}
