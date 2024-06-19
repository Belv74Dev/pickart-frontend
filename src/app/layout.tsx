import styles from './Styles.module.scss'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import { useState } from 'react';
import Menu from '@/components/SignInMenu/SignInMenu'
import Providers from '@/components/Providers';


export const metadata = {
  title: 'PickArts',
  description: 'Pet project',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" >
      <body className={styles.body}>
        <Providers>
          <Header></Header>
          {children}
          <Footer></Footer>
        </Providers>
      </body>
    </html>
  )
}
