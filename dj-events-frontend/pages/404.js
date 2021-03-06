/*
'404'
CUSTOM '404.js' IN PAGES REPLACES THE NEXT DEFAULT 404
*/
import { FaExclamationTriangle } from 'react-icons/fa'

import Link from 'next/link'
import Layout from '@/components/Layout'
import styles from '@/styles/404.module.css'

const NotFoundPage = () => {
  return (
    <Layout title='Page Not Found'>
      <div className={styles.error}>
        <h1>
          <FaExclamationTriangle/>
          404
        </h1>
        <p>Content not found!</p>
        <Link href='/'>Go Back Home</Link>
      </div>
    </Layout>
  )
}

export default NotFoundPage;
