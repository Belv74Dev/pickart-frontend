import Link from 'next/link'
import styles from './UserMenu.module.scss'
import { GoogleButton } from '../GoogleButton/GoogleButton'
import { useSession } from 'next-auth/react'


export default function Menu() {
    const sesion=useSession();
    return (
        <div>
            <div className={styles.Menu}>
                <ul>
                    <li>
                        <Link className={styles.Link} href={`/Profile/${sesion.data?.user.Id}`}>My Profile</Link>
                    </li>
                    <li>
                        <Link className={styles.Link} href={`/Settings`}>Settings</Link>
                    </li>
                    <li>
                        <Link className={styles.Link} href={`/Partfolio`}>Partfolio</Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}