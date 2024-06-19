"use client"
import styles from './SignIn.module.scss';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { signIn } from "next-auth/react";
import axios from 'axios';


export default function SignUp() {
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            if (event.target === userName.current) {
                email.current.focus();
            } else if (event.target === email.current) {
                password.current.focus();
            } else if (event.target === password.current) {
                confirmPassword.current.focus();
            } else if (event.target === confirmPassword.current) {
                onSubmit(event);
            }
        }
    };
    const [error, setError] = useState(null);
    const userName = useRef<HTMLInputElement>(null);
    const email = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);
    const confirmPassword = useRef<HTMLInputElement>(null);
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!userName.current || !password.current) return;
        try {
            if (userName.current.value != '' && email.current.value != '' && password.current.value != '') {
                const Reg = await axios.post(`http://localhost:3001/Reg?name=${userName.current.value}&email=${email.current.value}&password=${password.current.value}`);
                if (Reg) {
                    const result = await signIn("credentials", {
                        email: userName.current.value,
                        password: password.current.value,
                        redirect: true,
                        callbackUrl: "/",
                    });
                    if (!result) console.log("error");
                }
            }

        } catch (e: any) {
            setError(e.message);
            console.log("Error ", error);
            setTimeout(() => {
                // setFocused(false);
            }, 50000);
        }
    };

    return (
        <div className={styles.UpLoadForm}>
            <div className={styles.Conteiner}>
                <div className={styles.ConteinerTop}>Sign Up</div>
                <div className={styles.ConteinerInside}>
                    <form onSubmit={onSubmit}>
                        <input
                            placeholder='UserName'
                            onChange={(e) => (userName.current.value = e.target.value)}
                            onKeyPress={handleKeyPress}
                            ref={userName}></input>
                        <input
                            placeholder='Email'
                            onChange={(e) => (email.current.value = e.target.value)}
                            onKeyPress={handleKeyPress}
                            ref={email}></input>
                        <input
                            placeholder='Password'
                            onChange={(e) => (password.current.value = e.target.value)}
                            onKeyPress={handleKeyPress}
                            ref={password}></input>
                        <input
                            placeholder='Confirm password'
                            onChange={(e) => (confirmPassword.current.value = e.target.value)}
                            onKeyPress={handleKeyPress}
                            ref={confirmPassword}></input>
                    </form>
                    <div>
                        <div className={styles.Button} onClick={onSubmit}>Sign Up</div>
                        <Link href={'/SignIn'} className={styles.Link}>
                            <div className={styles.Button} >Sign In</div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};