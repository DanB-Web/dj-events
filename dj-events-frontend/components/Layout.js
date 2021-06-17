/*LAYUT COMPONENT WRAPS EVERYTHING ELSE (CHILDREN) AND ADDS HEAD*/

import Head from 'next/head'
import styles from '../styles/Layout.module.css'

export default function Layout({title, keywords, description, children}) {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name='description' content={description}></meta>
        <meta name='keywords' content={keywords}></meta>
      </Head>
      <div class={styles.container}>
        {children}
      </div>
    </div>
  )
}

Layout.defaultProps = {
  title: 'DJ Events | Find the hottest parties',
  description: ' Find the latest and other musical events',
  keywords: 'EDM dance music DJ'
}

