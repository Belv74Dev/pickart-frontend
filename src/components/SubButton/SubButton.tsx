import styles from './SubButton.module.scss';
import { signIn, signOut, useSession } from 'next-auth/react';
import axios from 'axios';
import React, { useState, useEffect, useCallback } from 'react';

const SubButton = ({ AuthorId }: { AuthorId: number }) => {
    const session = useSession();
    const [isSub, setIsSub] = useState(false);
    const [fetching, setFetching] = useState(false);
    // const [isInitialLoad, setIsInitialLoad] = useState(true);

    useEffect(() => {
        if (session.status === "authenticated") {
            axios.defaults.headers.common['Authorization'] = `Bearer ${session.data?.user.token}`;
            setFetching(true);
        }
    }, [session]);

    useEffect(() => {
        if (fetching) {
            // console.log("sesion: ", session.status);
            axios.get(`http://localhost:3001/isSub?AuthorId=${AuthorId}`)
                .then((response) => {
                    setIsSub(response.data.isSub);
                })
                .finally(() => {
                    setFetching(false);
                });
        }
    }, [fetching]);

    const addSub = useCallback(async (authorId: number) => {
        axios.post(`http://localhost:3001/Subscription?AuthorId=${authorId}`)
            .then((response) => {
                // console.log(response.status);
            })
            .finally(() => {
                setFetching(true);
            });
    }, []);

    const unSub = useCallback(async (authorId: number) => {
        axios.post(`http://localhost:3001/UnSubscription?AuthorId=${authorId}`)
            .then((response) => {
                // console.log(response.status);
            })
            .finally(() => {
                setFetching(true);
            });
    }, []);

    // console.log("isSub: ", isSub);
    // console.log("sesion: ", session.status);

    return (
        <>{session.status === "authenticated" ? (
            isSub ? (
                <div className={styles.ButtonSub} onClick={() => unSub(AuthorId)}>Subscribed</div>
            ) : (
                <div className={styles.Button} onClick={() => addSub(AuthorId)}>Subscribe</div>
            )
        ) : (
            <div className={styles.Button} onClick={() => console.log("Need Sign In!")}>Subscribe</div>
        )}
        </>
    );
};

export default SubButton;