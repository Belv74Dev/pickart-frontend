"use client"
import styles from './UpLoadForm.module.scss';
import { signIn, signOut, useSession } from 'next-auth/react';
import axios from 'axios';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const filePath = "http://localhost:3001/Arts/";

export default function UpLoadForm() {
    const filePicker = useRef(null);
    const session = useSession();
    useEffect(() => {
        if (session.status === "authenticated") {
            axios.defaults.headers.common['Authorization'] = `Bearer ${session.data?.user.token}`;
        }
    }, [session]);
    const [isUpLoad, setISUpLoad] = useState(false);
    const [preview, setPreview] = useState();
    const [file, setFile] = useState<File>();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [tegs, setTegs] = useState([]);
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!file) return;
        try {
            const data = new FormData();
            data.append('file', file);
            data.append('Title', title);
            data.append('Description', description);
            data.append('Tegs', tegs.join(','));
            const res = await axios.post('http://localhost:3001/UpLoad', data);
            setFile(undefined);
            setTitle('');
            setDescription('');
            setTegs([]);
            console.log(res);
            if (!res.data) {
                console.log(res.data.error);
            } else {
                setISUpLoad(true);
                console.log("res ", res.data);
                setPreview(res.data.FileName);
                console.log("Img ", preview);
                console.log("Upload");
            }
        } catch (e: any) {
            console.error(e);
        }
    };

    const handleSubmit = async () => {
        try {
            console.log("Enter!");
        } catch (error) {
            console.error(error);
        }
    };

    const titleInputRef = useRef(null);
    const descriptionInputRef = useRef(null);
    const tegsInputRef = useRef(null);

    useEffect(() => {
        if (titleInputRef.current) {
            titleInputRef.current.focus();
        }
    }, []);

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            if (event.target === titleInputRef.current) {
                descriptionInputRef.current.focus();
            } else if (event.target === descriptionInputRef.current) {
                tegsInputRef.current.focus();
            } else if (event.target === tegsInputRef.current) {
                const teg = tegsInputRef.current.value.trim();
                if (teg !== '') {
                    setTegs((prevTegs) => [...prevTegs, teg]);
                    tegsInputRef.current.value = '';
                }
            }
        }
    };

    const removeTeg = (tegToRemove) => {
        setTegs((prevTegs) => prevTegs.filter(teg => teg !== tegToRemove));
    };
    return (
        <>
            {isUpLoad ? (
                <div>
                    <div className={styles.UpLoadForm}>
                        <div className={styles.Conteiner}>
                            <div className={styles.ConteinerTop}>
                                <p>Art Uploaded</p>
                            </div>
                            <div>
                                <Image src={filePath + preview} priority alt='' width={400} height={400} />
                            </div>
                            <div>
                                <div className={styles.Button} onClick={() => setISUpLoad(false)}>
                                    Upload more
                                </div>
                                <Link href={`/`} className={styles.Link}>
                                    <div className={styles.Button} onClick={() => { }}>
                                        Back to the gallery
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <form onSubmit={onSubmit}>
                    <div className={styles.UpLoadForm}>
                        <div className={styles.Conteiner}>
                            <div className={styles.ConteinerTop}>
                                <p>Upload art:</p>
                            </div>
                            <div>
                                <div className={styles.Button} onClick={() => filePicker.current.click()}>
                                    <input
                                        className={styles.Hide}
                                        ref={filePicker}
                                        type="file"
                                        name="file"
                                        accept='image/*,.png,.jpg,.web,'
                                        onChange={(e) => setFile(e.target.files?.[0])}
                                    />
                                    Pick file
                                </div>
                            </div>
                        </div>
                        <div className={styles.Conteiner}>
                            <div className={styles.ConteinerTop}>
                                <p>Art title:</p>
                            </div>
                            <div className={styles.ConteinerInside}>
                                <input
                                    placeholder="Title"
                                    name="Title"
                                    value={title}
                                    onChange={(event) => setTitle(event.target.value)}
                                    onKeyPress={handleKeyPress}
                                    ref={titleInputRef}
                                />
                            </div>
                        </div>
                        <div className={styles.Conteiner}>
                            <div className={styles.ConteinerTop}>
                                <p>Art description:</p>
                            </div>
                            <div className={styles.ConteinerInside}>
                                <input
                                    placeholder="Description"
                                    name="Description"
                                    value={description}
                                    onChange={(event) => setDescription(event.target.value)}
                                    onKeyPress={handleKeyPress}
                                    ref={descriptionInputRef}
                                />
                            </div>
                        </div>
                        <div className={styles.Conteiner}>
                            <div className={styles.ConteinerTop}>
                                <p>Art tegs:</p>
                            </div>
                            <div className={styles.ConteinerInside}>
                                <input
                                    placeholder="Tegs"
                                    onKeyPress={handleKeyPress}
                                    ref={tegsInputRef}
                                />
                            </div>
                            <div className={styles.Tegs}>
                                {tegs.map((teg) => (
                                    <div className={styles.Teg} key={teg} onClick={() => removeTeg(teg, setTegs)}>
                                        <p>{teg}</p>
                                        <div className={styles.delete}></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className={styles.UpButton} onClick={onSubmit}>
                            Upload
                        </div>
                    </div>
                </form>
            )}
        </>
    );
};