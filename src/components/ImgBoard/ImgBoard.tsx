"use client"
import React, { lazy, useEffect, useState } from "react";
import Link from 'next/link';
import axios from "axios"
import styles from './ImgBoard.module.scss'
import ImgPreview from './ImgPreview'
import { signIn, signOut, useSession } from 'next-auth/react';

// import MidBar from './MidBar'



interface Art {
    ArtWorkId: number;
    Title: string;
    FileName: string;
}

const filePath = "http://localhost:3001/Arts/";

export default function ImgBoard() {
    const [arts, setArts] = useState<Art[]>([]);
    const [fetching, setFetching] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [isInitialLoad, setIsInitialLoad] = useState<boolean>(true);
    const [isTreading, setIsTreading] = useState<boolean>(true);
    const [isLatest, setIsLatest] = useState<boolean>(false);
    const [isFollowing, setIsFollowing] = useState<boolean>(false);
    const [isLiked, setIsLiked] = useState<boolean>(false);



    useEffect(() => {
        if (isInitialLoad) {
            setFetching(true);
        }
    }, [isInitialLoad]);
   

    useEffect(() => {
        if (fetching) {
            if(isTreading){
                axios.get<Art[]>(`http://localhost:3001/?page=${currentPage}`)
                    .then(response => {
                        setArts(arts => [...arts, ...response.data]);
                        setCurrentPage(currentPage + 1);
                    })
                    .finally(() => {
                        setFetching(false);
                        if (isInitialLoad) {
                            setIsInitialLoad(false);
                        }
                    });
            }else if(isLatest){
                axios.get<Art[]>(`http://localhost:3001/Latest?page=${currentPage}`)
                .then(response => {
                    setArts(arts => [...arts, ...response.data]);
                    setCurrentPage(currentPage + 1);
                })
                .finally(() => {
                    setFetching(false);
                    if (isInitialLoad) {
                        setIsInitialLoad(false);
                    }
                });
            }else if(isFollowing){
                axios.get<Art[]>(`http://localhost:3001/Following?page=${currentPage}`)
                .then(response => {
                    setArts(arts => [...arts, ...response.data]);
                    setCurrentPage(currentPage + 1);
                })
                .finally(() => {
                    setFetching(false);
                    if (isInitialLoad) {
                        setIsInitialLoad(false);
                    }
                });
            }else if(isLiked){
                axios.get<Art[]>(`http://localhost:3001/Liked?page=${currentPage}`)
                .then(response => {
                    setArts(arts => [...arts, ...response.data]);
                    setCurrentPage(currentPage + 1);
                })
                .finally(() => {
                    setFetching(false);
                    if (isInitialLoad) {
                        setIsInitialLoad(false);
                    }
                });
            }
        }
    }, [fetching]);

    useEffect(() => {
        const scrollHandler = () => {
            if (document.documentElement.scrollHeight - (document.documentElement.scrollTop + window.innerHeight) < 100) {
                setFetching(true);
            }
        }
        document.addEventListener('scroll', scrollHandler);
        return function () {
            document.removeEventListener('scroll', scrollHandler);
        };
    }, [fetching]);
    const session = useSession();
    const TreadingClick = () => {
        setIsLiked(false);
        setIsTreading(true);
        setIsLatest(false);
        setIsFollowing(false);
        setCurrentPage(1);
        setArts([]);
        setFetching(true);
    };const LatestClick = () => {
        setIsLiked(false);
        setIsTreading(false);
        setIsLatest(true);
        setIsFollowing(false);
        setCurrentPage(1);
        setArts([]);
        setFetching(true);
    };const FollowingClick = () => {
        setIsLiked(false);
        setIsTreading(false);
        setIsLatest(false);
        setIsFollowing(true);
        setCurrentPage(1);
        setArts([]);
        setFetching(true);
    };const LikedClick = () => {
        setIsTreading(false);
        setIsLatest(false);
        setIsFollowing(false);
        setIsLiked(true);
        setCurrentPage(1);
        setArts([]);
        setFetching(true);
    };
    useEffect(() => {
        if (session.status === "authenticated") {
            axios.defaults.headers.common['Authorization'] = `Bearer ${session.data?.user.token}`;
        }
    }, [session]);
    return (
        <>
            {session.status === "authenticated" ? (
                <div className={styles.MidBar}>
                    <p onClick={TreadingClick} className={isTreading ? styles.Active : styles.Passive}>Trending</p>
                    <p onClick={LatestClick} className={isLatest ? styles.Active : styles.Passive}>Latest</p>
                    <p onClick={FollowingClick} className={isFollowing ? styles.Active : styles.Passive}>Following</p>
                    <p onClick={LikedClick} className={isLiked ? styles.Active : styles.Passive}>Liked</p>
                </div>) : (
                <div className={styles.MidBar}>
                    <p onClick={TreadingClick} className={isTreading ? styles.Active : styles.Passive}>Trending</p>
                    <p onClick={LatestClick} className={isLatest ? styles.Active : styles.Passive}>Latest</p>
                </div>)}
            <div className={styles.ImgBoard}>
                {arts.map((post: Art) => {
                    return (
                        <Link href={`/Art/${post.ArtWorkId}`} >
                            <ImgPreview key={post.ArtWorkId} title={post.Title} img={filePath + post.FileName}></ImgPreview>
                        </Link>
                    )
                })
                }
            </div>
        </>
    )
}