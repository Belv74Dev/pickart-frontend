import styles from './ImgBoard.module.scss'

export default function MidBar () {
    return (
        <>
        <div className={styles.MidBar}>
            <p className={styles.Active} id='Active'>Trending</p>
            <p className={styles.Passive}>Latest</p>
            <p className={styles.Passive}>Following</p>
        </div>
        <div className={styles.Shadow}></div>
        </>
    )
}