import type { NextPage } from 'next'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import style from "./../styles/index.module.scss"


import Layout from '../components/layout'
import SearchBar from '../components/searchBar'
import Mangas from '../components/library'

const Home: NextPage = ({ data }: any) => {
  const [getData, setGetData] = useState(data.data)

  return (
    <div>
      <Head>
        <title>Neku | Home </title>
      </Head>

      <Layout>
        <div className={style.landing}>
          <SearchBar />

          { (data.status != 400) && <Mangas data={getData} /> }

        </div>
      </Layout>


    </div>
  )
}


export async function getServerSideProps() {

  const options = {
    method: 'GET',
  };
  
  const res = await fetch('https://api.jikan.moe/v4/top/manga', options)
  const data = await res.json()

  return { props: { data } }
}

export default Home
