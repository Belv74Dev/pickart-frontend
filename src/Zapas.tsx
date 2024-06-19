// import { signIn, signOut, useSession } from "next-auth/react";
// import axios from "axios"
// import React, { useEffect, useState } from "react";

// const session = useSession();

// const api = axios.create({
//     baseURL: 'http://localhost:3001',
// });
// api.interceptors.request.use(
//     (config) => {
//         // const token = localStorage.getItem('token');
//         const token = session.data?.user.token;
        
//         // console.log("Token ", session.data?.user.token);

//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//             return config;
//         } else {
//             return config;
//         }
//     },
//     (error) => Promise.reject(error)
// );

// api.get(`/isSub?Id=${art?.AuthorId}`)
//     .then(response => {
//         console.log(response.data.isSub);
//     })

// if (session) {
//     interface Res {
//         isSub: boolean;
//     }
//     const [isSub, setIsSub] = useState<boolean>(false);
//     const [fetching, setFetching] = useState<boolean>(false);
//     const [isInitialLoad, setIsInitialLoad] = useState<boolean>(true);
//     useEffect(() => {
//         if (isInitialLoad) {
//             setFetching(true);
//         }
//     }, [isInitialLoad]);

//     useEffect(() => {
//         if (fetching) {
//              api.get(`/isSub?Id=${art?.ArtWorkId}`)
//                 .then(response => {
//                     setIsSub(response.data);
//                 })
//                 .finally(() => {
//                     setFetching(false);
//                     if (isInitialLoad) {
//                         setIsInitialLoad(false);
//                     }
//                 });
//         }
//     }, [fetching]);
// }