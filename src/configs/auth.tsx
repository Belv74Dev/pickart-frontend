// import type { AuthOptions, User } from 'next-auth'
// import GoggleProvider from 'next-auth/providers/google'
// // import NextAuth from "next-auth"

// export const authConfig: AuthOptions = {
//   providers: [
//     GoggleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_SECRET!,
//       // authorization: {
//       //   params: {
//       //     prompt: "consent",
//       //     access_type: "offline",
//       //     response_type: "code"
//       //   }
//       // }
//     }),
//   ],
//   callbacks: {
//     async  signIn({user,account}) {
//       console.log(user);
//       console.log(account);
//       console.log("Callback");
//       return user;
//     },
//     async jwt({ token, account }) {
//       if (account) {
//         // Save the access token and refresh token in the JWT on the initial login, as well as the user details
//         return {
//           access_token: account.access_token,
//           expires_at: account.expires_at,
//           refresh_token: account.refresh_token,
//           user: token,
//         }
//       } else if (Date.now() < token.expires_at * 1000) {
//         // If the access token has not expired yet, return it
//         return token
//       } else {
//         if (!token.refresh_token) throw new Error("Missing refresh token")

//         // If the access token has expired, try to refresh it
//         try {
//           // https://accounts.google.com/.well-known/openid-configuration
//           // We need the `token_endpoint`.
//           const response = await fetch("https://oauth2.googleapis.com/token", {
//             headers: { "Content-Type": "application/x-www-form-urlencoded" },
//             body: new URLSearchParams({
//               client_id: process.env.AUTH_GOOGLE_ID!,
//               client_secret: process.env.AUTH_GOOGLE_SECRET!,
//               grant_type: "refresh_token",
//               refresh_token: token.refresh_token,
//             }),
//             method: "POST",
//           })

//           const tokens = await response.json()

//           if (!response.ok) throw tokens

//           return {
//             ...token, // Keep the previous token properties
//             access_token: tokens.access_token,
//             expires_at: Math.floor(Date.now() / 1000 + tokens.expires_in),
//             // Fall back to old refresh token, but note that
//             // many providers may only allow using a refresh token once.
//             refresh_token: tokens.refresh_token ?? token.refresh_token,
//           }
//         } catch (error) {
//           console.error("Error refreshing access token", error)
//           // The error property will be used client-side to handle the refresh token error
//           return { ...token, error: "RefreshAccessTokenError" as const }
//         }
//       }
//     },
//     async session({ session, token }) {
//       session.error = token.error
//       return {
//         ...session,
//         ...token,
//       }
//     },
//   },
//   pages: {
//     signIn: '/SignIn'
//   }
// }




// declare module "next-auth" {
// interface Session {
// error?: "RefreshAccessTokenError"
// }
// }

// declare module "next-auth/jwt" {
// interface JWT {
// access_token: string
// expires_at: number
// refresh_token: string
// error?: "RefreshAccessTokenError"
// }
// }




// import type { AuthOptions, User } from 'next-auth'
// import GoggleProvider from 'next-auth/providers/google'
// // import NextAuth from "next-auth"
// const jwt = require('jsonwebtoken');
// export const authConfig: AuthOptions = {
//   providers: [
//     GoggleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_SECRET!,
//       // authorization: {
//       //   params: {
//       //     prompt: "consent",
//       //     access_type: "offline",
//       //     response_type: "code"
//       //   }
//       // }
//     }),
//   ],
//   callbacks: {
//     // async signIn({ user, account }) {
//     //   console.log(user);
//     //   console.log(account);
//     //   console.log("Callback");
//     //   return user;
//     // },
//     async jwt({ token, account }) {
//       if (account) {
//         // Генерируем JWT токен
//         const jwtToken = jwt.sign({ userId: token.sub }, 'your_secret_key');

//         return {
//           access_token: account.access_token,
//           expires_at: account.expires_at,
//           refresh_token: account.refresh_token,
//           user: token,
//           jwtToken, // Добавляем сгенерированный токен в возвращаемый объект
//         };
//       }
//       else if (Date.now() < token.expires_at * 1000) {
//         // If the access token has not expired yet, return it
//         return token
//       } else {
//         if (!token.refresh_token) throw new Error("Missing refresh token")

//         // If the access token has expired, try to refresh it
//         try {
//           // https://accounts.google.com/.well-known/openid-configuration
//           // We need the `token_endpoint`.
//           const response = await fetch("https://oauth2.googleapis.com/token", {
//             headers: { "Content-Type": "application/x-www-form-urlencoded" },
//             body: new URLSearchParams({
//               client_id: process.env.AUTH_GOOGLE_ID!,
//               client_secret: process.env.AUTH_GOOGLE_SECRET!,
//               grant_type: "refresh_token",
//               refresh_token: token.refresh_token,
//             }),
//             method: "POST",
//           })

//           const tokens = await response.json()

//           if (!response.ok) throw tokens

//           return {
//             ...token, // Keep the previous token properties
//             access_token: tokens.access_token,
//             expires_at: Math.floor(Date.now() / 1000 + tokens.expires_in),
//             // Fall back to old refresh token, but note that
//             // many providers may only allow using a refresh token once.
//             refresh_token: tokens.refresh_token ?? token.refresh_token,
//           }
//         } catch (error) {
//           console.error("Error refreshing access token", error)
//           // The error property will be used client-side to handle the refresh token error
//           return { ...token, error: "RefreshAccessTokenError" as const }
//         }
//       }
//     },
//     async session({ session, token }) {
//       session.error = token.error;
//       session.jwtToken = token.jwtToken.toString();
//       await fetch('http://localhost:3001/api/auth/session', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token.jwtToken}`,
//         },
//         body: JSON.stringify({ userId: token.user.sub }),
//       });

//       return {
//         ...session,
//         ...token,
//       };
//     },
//   },
//   pages: {
//     signIn: '/SignIn'
//   }
// }




// declare module "next-auth" {
//   interface Session {
//     error?: "RefreshAccessTokenError"
//     user?: {
//       name?: string | null;
//       email?: string | null;
//       image?: string | null;
//     };
//     expires: string;
//     jwtToken: string;
//   }
// }

// declare module "next-auth/jwt" {
//   interface JWT {
//     access_token: string;
//     expires_at: number;
//     refresh_token: string;
//     error?: "RefreshAccessTokenError";
//     user: {
//       sub: string;
//       name: string;
//       email: string;
//       image: string;
//     };
//   }
// }

import { getServerSession } from "next-auth/next"
import type { AuthOptions, User } from 'next-auth'
import GoggleProvider from 'next-auth/providers/google'
// import NextAuth from "next-auth"
const jwt = require('jsonwebtoken');
export const authConfig: AuthOptions = {
  providers: [
    GoggleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
      // authorization: {
      //   params: {
      //     prompt: "consent",
      //     access_type: "offline",
      //     response_type: "code"
      //   }
      // }
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      // const test=getServerSession();
      // console.log(test);
      // console.log(user);
      const postData = {
        name: 'John Doe',
        email: 'john.doe@example.com'
      };

      // Опции запроса
      const requestOptions = {
        method: 'POST', // Указываем метод POST
        headers: {
          'Content-Type': 'application/json' // Устанавливаем заголовок Content-Type для JSON данных
        },
        body: JSON.stringify(postData) // Преобразуем данные в формат JSON для передачи в теле запроса
      };

      // Выполнение POST запроса
      fetch('http://localhost:3001/api/auth/session', requestOptions)
        .then(response => {
          if (response.ok) {
            return response.json(); // Если запрос успешен, обрабатываем ответ как JSON
          }
          throw new Error('Network response was not ok.');
        })
        .then(data => {
          console.log('Response data:', data); // Обработка данных из ответа
        })
        .catch(error => {
          console.error('There was a problem with your fetch operation:', error); // Обработка ошибок
        });
        return user;
    }

  },
  pages: {
    signIn: '/SignIn'
  }
}