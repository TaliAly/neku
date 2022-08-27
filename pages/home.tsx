import type { NextPage } from 'next'
import Head from 'next/head'

import Layout from '../components/layout'
import SearchBar from '../components/searchBar'
import Mangas from '../components/books'
import style from "./../styles/index.module.scss"

const Home: NextPage = ({ data }: any) => {

  return (
    <div>
      <Head>
        <title>Neku | Home </title>
      </Head>

      <Layout>
        <div className={style.landing}>
          <SearchBar />
          <Mangas data={data} />
        </div>
      </Layout>


    </div>
  )
}


export async function getServerSideProps() {

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'bdff903274msh4d7467043c52ac6p1d8499jsn877c34ee4d56',
      'X-RapidAPI-Host': 'manga-scrapper.p.rapidapi.com'
    }
  };

  const res = await fetch("https://manga-scrapper.p.rapidapi.com/fetch/manga-list/asura", options)
  const data = await res.json()

  return { props: { data } }
}

export default Home
