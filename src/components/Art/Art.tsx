"use client"
import React, { useEffect, useState } from "react";
import axios from "axios"
import styles from './Art.module.scss'
import ArtImg from './ArtImg'
import ArtInfo from "./ArtInfo";
// import { Session } from "inspector";


interface Art {
    ArtWorkId: number;
    Title: string;
    FileName: string;
    Description: string | null;
    AuthorId: number;
    Date_of_creation: string | null;
    Name: string;
    Avatar: string;
    Views: number;
    Liks: number;
    Comments: number;
}

const filePath = "http://localhost:3001/Arts/";
const AvatarPath = "http://localhost:3001/Avatars/";


export default function Art({ id }: { id: number }) {
    const [art, setArt] = useState<Art>();
    const [fetching, setFetching] = useState<boolean>(false);
    const [isInitialLoad, setIsInitialLoad] = useState<boolean>(true);
    useEffect(() => {
        if (isInitialLoad) {
            setFetching(true);
        }
    }, [isInitialLoad]);

    useEffect(() => {
        if (fetching) {
            axios.get<Art>(`http://localhost:3001/Art?Id=${id}`)
                .then(response => {
                    // console.log("Arts ",response.data);
                    setArt(response.data);
                })
                .finally(() => {
                    setFetching(false);
                    if (isInitialLoad) {
                        setIsInitialLoad(false);
                    }
                });
        }
    }, [fetching]);



    if (!art) {
        return <div>Loading...</div>;
    } else {
        return (
            <div className={styles.Art}>
                <ArtImg img={filePath + art.FileName} />
                <ArtInfo
                    ArtWorkId={art.ArtWorkId}
                    Title={art.Title}
                    Name={art.Name}
                    AuthorId={art.AuthorId}
                    AuthorImg={ art.Avatar ? AvatarPath + art.Avatar: "/Login_white.png"}
                    Description={art.Description ?art.Description : null }
                ></ArtInfo>
            </div >
        );
    }

};