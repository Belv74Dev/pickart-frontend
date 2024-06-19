"use client"
import React, { useEffect, useState } from "react";
import axios from "axios"
import styles from './Art.module.scss'



export default function Tegs({ ArtWorkId }: { ArtWorkId: number }) {
    const [tegs, setTegs] = useState<string[]>([]);
    const [fetching, setFetching] = useState<boolean>(false);
    const [isInitialLoad, setIsInitialLoad] = useState<boolean>(true);
    useEffect(() => {
        if (isInitialLoad) {
            setFetching(true);
        }
    }, [isInitialLoad]);

    useEffect(() => {
        if (fetching) {
            axios.get<string[]>(`http://localhost:3001/ArtTegs?ArtWorkId=${ArtWorkId}`)
                .then(response => {
                    console.log("res: ",response.data, ArtWorkId);
                    setTegs(tegs => [...tegs, ...response.data]);
                })
                .finally(() => {
                    setFetching(false);
                    if (isInitialLoad) {
                        setIsInitialLoad(false);
                    }
                });
        }
    }, [fetching]);
    return (
        <><div className={styles.Tegs}>
            {tegs.map((teg: string) => {
                return (
                        <div className={styles.Teg}>{teg}</div>
                )
            })
            }
        </div>
        </>
    )
};