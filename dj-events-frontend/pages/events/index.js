/*
'/events/' PAGE
*/
import { useEffect } from 'react'
import Layout from '@/components/Layout'
import EventItem from '@/components/EventItem'
import Pagination from '@/components/Pagination'
import {API_URL, PER_PAGE} from '@/config/index'

import { myScript } from '../../utils/scripts'

export default function Events ({events, page, total}) {

  //const lastPage = Math.ceil(total / PER_PAGE)

  //LOGS ON CLIENT INSIDE COMPONENT
  //console.log('client', events)

  //LINKED SCRIPT
  useEffect(() => {
    myScript();
  }, [])

  return (
    <Layout>
      <h1 className='myTitle'>Events</h1>
      {events.length === 0 && <h3>No events to show</h3>}
      {events.map(evt => (
        <EventItem key={evt.id} evt={evt}/>
      ))}

      <Pagination page={page} total={total}/>
{/* 
      {page > 1 && (
        <Link href={`/events?page=${page - 1}`}>
          <a className='btn-secondary'>Prev</a>
        </Link>
      )}
      {page < lastPage && (
        <Link href={`/events?page=${page + 1}`}>
          <a className='btn-secondary'>Next</a>
        </Link>
      )} */}
    </Layout>
  )
}

//getStaticProps(){...} WILL ONLY RUN AT BUILD TIME
//export async function getStaticProps() {
//getServerSideProps(){...} WILL RUN ON EVERY PAGE VISIT
export async function getServerSideProps({query: {page = 1}}) {
  //CALCULATE START PAGE
  page = parseInt(page) //COMES FROM PARAM AS STRING
  const start = page === 1 ? 0 : (page -1) * PER_PAGE 

  const totalRes = await fetch(`${API_URL}/events/count`)
  const total = await totalRes.json()

  const eventRes = await fetch(`${API_URL}/events?_sort=date:ASC&_limit=${PER_PAGE}&_start=${start}`)
  const events = await eventRes.json()

  //LOGS ON SERVER INSIDE getServerSideProps()
  //console.log('server', events)

  return {
    props: {events, page: page, total},
  }
}
