"use client"
import React, { useEffect, useState, useRef} from "react";
import axios from "axios"
import styles from './Art.module.scss'
import IPT from "../ImgPlusText/IPT";
import Link from "next/link";
import { signIn, signOut, useSession } from 'next-auth/react';

interface Comment {
    ArtWorkId: number;
    CommentatorId: number;
    Name: string;
    Avatar: string;
    CommentText: string;
}

const filePath = "http://localhost:3001/Arts/";
const AvatarPath = "http://localhost:3001/Avatars/";

export default function Comments({ ArtWorkId }: { ArtWorkId: number }) {
    const [comment, setComment] = useState<Comment[]>([]);
    const [fetching, setFetching] = useState<boolean>(false);
    const [isInitialLoad, setIsInitialLoad] = useState<boolean>(true);
    const session = useSession();
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        if (session.status === "authenticated") {
            axios.defaults.headers.common['Authorization'] = `Bearer ${session.data?.user.token}`;
        }
    }, [session]);

    const handleSubmit = async () => {
        try {
            if(inputValue!='') {
                const response = await axios.post(
                    `http://localhost:3001/AddComment?ArtWorkId=${ArtWorkId}&Comment=${inputValue}`
                );
                // console.log(response.data);
                setInputValue('');
                setFetching(true);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (isInitialLoad) {
            setFetching(true);
        }
    }, [isInitialLoad]);

    useEffect(() => {
        if (fetching ) {
            axios.get<Comment[]>(`http://localhost:3001/Comments?ArtWorkId=${ArtWorkId}`)
                .then(response => {
                    console.log("Comments ", response.data);
                    setComment(response.data);
                })
                .finally(() => {
                    setFetching(false);
                    if (isInitialLoad) {
                        setIsInitialLoad(false);
                    }
                });
        }
    }, [fetching, comment.length]);

    const InputComment = () => {
        const inputRef = useRef(null);
    
        useEffect(() => {
            if (inputRef.current) {
                inputRef.current.focus();
                const handleKeyUp = (event) => {
                    if (event.keyCode === 13) {
                        handleSubmit();
                    }
                };
                inputRef.current.addEventListener("keyup", handleKeyUp);
                return () => {
                    if (inputRef.current) {
                        inputRef.current.removeEventListener("keyup", handleKeyUp);
                    }
                };
            }
        }, []);
    
        return (
            <div className={styles.CommentInput}>
                <IPT title=' ' img={session.status === "authenticated"? AvatarPath+session.data.user?.Avatar:"/likesWhite.png"} size='S'></IPT>
                <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(event) => setInputValue(event.target.value)}
                    placeholder="Enter your comment"
                ></input>
                <div className={styles.Send} onClick={session.status === "authenticated" ? handleSubmit : signIn}>
                    <p>Send</p>
                    <div className={styles.arrow}></div>
                </div>
            </div>
        );
    };

    return (
        <>
            <InputComment />
            {comment.length <= 0 ? (
                <div className={styles.CommentInside}>This work has no comments yet.</div>
            ) : (
                comment.map((comment: Comment) => (
                    <div className={styles.Comment}>
                        <div className={styles.CommentTop}>
                            <Link href={`/Profile/${comment.CommentatorId}`}>
                                <IPT title={comment.Name} img={AvatarPath + comment.Avatar} size='M'></IPT>
                            </Link>
                            <p className={styles.time}>8 hours ago</p>
                        </div>
                        <div className={styles.CommentInside}>
                            <text>{comment.CommentText}</text>
                        </div>
                    </div>
                ))
            )}
        </>
    );
}