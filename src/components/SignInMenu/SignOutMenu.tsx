import Link from 'next/link'
import styles from './SignInMenu.module.scss'
import { GoogleButton } from '../GoogleButton/GoogleButton'
import { useSession, signOut } from "next-auth/react";


export default function SignOutMenu() {
    return (
            <div className={styles.Menu}>
                <div className={styles.Button} onClick={() => signOut({ callbackUrl: "/" })}>
                    Sign Out
                </div>
            </div>
    )
}