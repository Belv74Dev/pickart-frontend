import Link from 'next/link'
import styles from './SignInMenu.module.scss'
import { GoogleButton } from '../GoogleButton/GoogleButton'


export default function SignInMenu() {
    return (
        <div>
            <div className={styles.Menu}>
                <GoogleButton></GoogleButton>
                <div className={styles.delitel}>
                    <div></div>
                    <p>or</p>
                    <div></div>
                </div>
                <GoogleButton></GoogleButton>
            </div>
        </div>
    )
}