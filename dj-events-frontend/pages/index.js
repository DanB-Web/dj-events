/*
'/' PAGE
*/
import Link from 'next/link'
import Layout from '@/components/Layout'
import EventItem from '@/components/EventItem'
import {API_URL} from '@/config/index'
import { useEffect } from 'react'

import { myScript } from '../utils/scripts'

export default function HomePage ({events}) {

  //LOGS ON CLIENT INSIDE COMPONENT
  //console.log('client', events)

  //LINKED SCRIPT
  useEffect(() => {
    myScript();
  }, [])

  return (
    <Layout>
      <h1 className='myTitle'>Upcoming Events</h1>
      {events.length === 0 && <h3>No events to show</h3>}
      {events.map(evt => (
        <EventItem key={evt.id} evt={evt}/>
      ))}

      {events.length > 0 && (
        <Link href='/events'>
          <a className='btn-secondary'>View All Events</a>
        </Link>
      )}
    </Layout>
  )
}

//getStaticProps(){...} WILL ONLY RUN AT BUILD TIME
export async function getStaticProps() {
//getServerSideProps(){...} WILL RUN ON EVERY PAGE VISIT
//export async function getServerSideProps() {
  const res = await fetch(`${API_URL}/events?_sort=date:ASC&_limit=3`) //STRAPI PARAM SYNTAX
  let events = await res.json()

  //LIMIT TO FIRST THREE EVENTS ON HOMEPAGE - NOT REQ WHEN USING STRAPI PARAM SYNTAX
  //events = events.slice(0, 3);

  //LOGS ON SERVER INSIDE getServerSideProps() / getStaticProps()
  //console.log('server', events)

  return {
    props: {events},
    revalidate: 1 //Option for getStatricProps
  }
}
