"use client"
import React, { lazy, useEffect, useState } from "react";
import Link from 'next/link';
import axios from "axios"
import styles from './ImgBoard.module.scss'
import ImgPreview from '@/components/ImgBoard/ImgPreview'
import { signIn, signOut, useSession } from 'next-auth/react';

// import MidBar from './MidBar'



interface Art {
    ArtWorkId: number;
    Title: string;
    FileName: string;
}

const filePath = "http://localhost:3001/Arts/";

export default function ImgBoard({SearchData}:{SearchData: string}) {
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
            if (isTreading) {
                axios.get<Art[]>(`http://localhost:3001/Search?page=${currentPage}&SearchData=${SearchData}`)
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
            } else
                axios.get<Art[]>(`http://localhost:3001/SearchLatest?page=${currentPage}&SearchData=${SearchData}`)
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
        setIsTreading(true);
        setIsLatest(false);
        setCurrentPage(1);
        setArts([]);
        setFetching(true);
    }; const LatestClick = () => {
        setIsTreading(false);
        setIsLatest(true);
        setCurrentPage(1);
        setArts([]);
        setFetching(true);
    };
    return (
        <>
            <div className={styles.MidBar}>
                <p onClick={TreadingClick} className={isTreading ? styles.Active : styles.Passive}>Trending</p>
                <p onClick={LatestClick} className={isLatest ? styles.Active : styles.Passive}>Latest</p>
            </div>
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