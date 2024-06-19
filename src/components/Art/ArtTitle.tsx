import Image from 'next/image'
import styles from './Art.module.scss'
import { signIn, signOut, useSession } from 'next-auth/react';
import axios from 'axios';
import React, { useState, useEffect, useCallback } from 'react';

export default function ArtTitle({ Title, ArtWorkId }: { Title: string, ArtWorkId: number }) {
    const session = useSession();
    const [views, setViews] = useState();
    const [likes, setLikes] = useState();
    const [isLiked, setIsLiked] = useState(false);
    const [comments, setComments] = useState();
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        if (session.status === "authenticated") {
            axios.defaults.headers.common['Authorization'] = `Bearer ${session.data?.user.token}`;
            axios.get(`http://localhost:3001/isLiked?ArtWorkId=${ArtWorkId}`)
                .then((response) => {
                    setIsLiked(response.data.isLiked);
                })
                .finally(() => {
                    setFetching(true);
                });

        }
    }, [session]);

    useEffect(() => {
        if (fetching) {
            // console.log("sesion: ", session.status);
            axios.get(`http://localhost:3001/CountInfo?ArtWorkId=${ArtWorkId}`)
                .then((response) => {
                    setViews(response.data.Views);
                    setLikes(response.data.Likes);
                    setComments(response.data.Comments);
                })
                .finally(() => {
                    setFetching(false);
                });
        }
    }, [fetching]);

    const addLike = useCallback(async (authorId: number) => {
        axios.post(`http://localhost:3001/AddLike?ArtWorkId=${authorId}`)
            .then((response) => {
                setIsLiked(response.data.isLiked);
            })
            .finally(() => {
                setFetching(true);
            });
    }, []);

    const unLike = useCallback(async (authorId: number) => {
        axios.post(`http://localhost:3001/UnLike?ArtWorkId=${authorId}`)
            .then((response) => {
                setIsLiked(response.data.isLiked);
            })
            .finally(() => {
                setFetching(true);
            });
    }, []);

    return (
        <>
            <div className={styles.Conteiner}>
                <div className={styles.ConteinerTopCenter}>
                    <text>{Title}</text>
                    <p>8 hours ago</p>
                </div>
                <div className={styles.ConteinerInsideArtTitle}>
                    <div>
                        {session.status === "authenticated" ? (isLiked ? 
                        <div className={styles.Aktive} onClick={() => unLike(ArtWorkId)}>
                            <Image src="/likesWhite.png" alt="Liks" width={32} height={32} />
                            <p>{likes + " Likes"}</p>
                        </div> :
                            <div className={styles.Passive}  onClick={() => addLike(ArtWorkId)}>
                                <Image src="/likesWhite.png" alt="Liks" width={32} height={32} />
                                <p>{likes + " Likes"}</p>
                            </div>) : (<div className={styles.Passive} onClick={() => console.log("Need Sign In!")}>
                                <Image src="/likesWhite.png" alt="Liks" width={32} height={32} />
                                <p>{likes + " Likes"}</p>
                            </div>)}
                        <div className={styles.Passive}>
                            <Image src="/viewsWhite.png" alt="Views" width={32} height={32} />
                            <p>{views + " Views"}</p>
                        </div>
                        <div className={styles.Passive}>
                            <Image src="/commentsWite.png" alt="Comments" width={32} height={32} />
                            <p>{comments + " Comments"}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


