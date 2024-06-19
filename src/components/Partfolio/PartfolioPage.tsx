"use client";
import { useSession } from 'next-auth/react';
import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import IPT from '../ImgPlusText/IPT';
import styles from './Partfolio.module.scss';
import Background from '../Background/Background';
import PartfolioImgBoard from './PartfolioImgBoard';

const filePath = "http://localhost:3001/Avatars/";
interface User {
    Name: string,
    Avatar: string,
    Information_about_yourself: string
}

export default function PartfolioPage() {
    const [user, setUser] = useState<User>();
    const session = useSession();
    const [fetching, setFetching] = useState<boolean>(false);
    const [isHide, setIsHide] = useState<boolean>(true);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            console.log("Des ",description);
            const res = await axios.post(`http://localhost:3001/SetDescription?Description=${description}` );
            setDescription('');
            setFetching(true);
            setIsHide(true)
        } catch (e: any) {
            console.error(e);
        }
    };

    useEffect(() => {
        if (session.status === "authenticated") {
            axios.defaults.headers.common['Authorization'] = `Bearer ${session.data?.user.token}`;
            axios.get<User>(`http://localhost:3001/Profile?Id=${session.data?.user.Id}`)
                .then((response) => {
                    setUser(response.data);
                    console.log("user ", user);
                });
        }
    }, [session]);

    const filePicker = useRef(null);
    useEffect(() => {
        if (session.status === "authenticated") {
            axios.defaults.headers.common['Authorization'] = `Bearer ${session.data?.user.token}`;
        }
    }, [session]);

    const [file, setFile] = useState<File>();
    useEffect(() => {
        if (file) {
            const data = new FormData();
            data.append('file', file);
            axios.post('http://localhost:3001/UpLoadAvatar', data)
                .then((response) => {
                    setFile(undefined);
                    console.log(response);
                    if (!response.data) {
                        console.log(response.data.error);
                    }
                })
                .finally(() => {
                    setFetching(true);
                });
        }
    }, [file]);

    useEffect(() => {
        if (fetching) {
            axios.get<User>(`http://localhost:3001/Profile?Id=${session.data?.user.Id}`)
                .then((response) => {
                    setUser(response.data);
                })
                .finally(() => {
                    setFetching(false);
                });
        }
    }, [fetching, session]);
    const descriptionInputRef = useRef(null);
    const [description, setDescription] = useState('');
    const handleKeyPress = (event) => {
        console.log(event.key);
        if (event.key === 'Enter') {
            if (event.target === descriptionInputRef.current) {
               onSubmit(event);
            }
        }
    };
    useEffect(() => {
        const handleKeydown = (event) => {
            if (event.key === 'Escape') {
                setIsHide(true);
            }
        };
        document.addEventListener('keydown', handleKeydown);
        return () => {
            document.removeEventListener('keydown', handleKeydown);
        };
    }, [setIsHide]);
    return (
        <>
            <Background Title={user?.Name ? user.Name : "User"} Logo={user?.Avatar ? filePath + user.Avatar : "/Logotip_Black.png"} Description={user?.Information_about_yourself ? user?.Information_about_yourself : "Information about youself."} ></Background>
            <div className={styles.MidBar}>
                {/* <p className={styles.Pasive}>Partfolio</p> */}
            </div>
            {session.status === "authenticated" ? <PartfolioImgBoard ProfileId={session.data.user.Id}></PartfolioImgBoard> : <p>Loading</p>}
            <div className={styles.FixB}>
                <div className={styles.ButtonF} onClick={() => filePicker.current.click()}>
                    <input
                        className={styles.Hide}
                        ref={filePicker}
                        type="file"
                        name="file"
                        accept='image/*,.png,.jpg,.web,'
                        onChange={(e) => setFile(e.target.files?.[0])}
                    />
                    Edit Avatar
                </div>
                <div className={styles.ButtonF} onClick={()=>{setIsHide(false)}}>Edit Description</div>
            </div>
            <div className={ !isHide? styles.EditForm : styles.Hide}>
                <div className={styles.FConteiner}>
                    <div className={styles.FConteinerTop} >
                        Edit Description:
                    </div>
                    <div className={styles.FConteinerInside}>
                        {/* <form onSubmit={onSubmit}> */}
                            <input
                                placeholder="Description"
                                name="Title"
                                value={description}
                                onChange={(event) => setDescription(event.target.value)}
                                onKeyPress={handleKeyPress}
                                ref={descriptionInputRef}
                                autoFocus
                            />
                            <div className={styles.Button} onClick={onSubmit}>Send</div>
                        {/* </form> */}
                    </div>
                </div>

            </div>
        </>
    );
};