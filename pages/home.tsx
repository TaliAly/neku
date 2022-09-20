import type { NextPage } from 'next'
import Head from 'next/head'
import style from "./../styles/index.module.scss"
import dynamic from 'next/dynamic'
import { GetStaticProps } from 'next'


import Layout from '../components/layout'
import Link from "next/link"
import SearchBarBig from '../components/searchBar/searchBarBig'
const Library = dynamic(() => import("../components/library"))

const Home: NextPage = ({ top, book }: any) => {

  return (
    <div>
      <Head>
        <title>Neku | Home </title>
      </Head>

      <Layout>
        <div className={style.landing}>
          <SearchBarBig />

          <h2>Tops</h2>
          {(top.status != 400) && <Library data={top.data} />}

          <h4>Tal vez te gusten</h4>
          {(book.status != 400) && <Library data={book.data} />}

          <h4>Quieres ver más?</h4>
          <Link href="/genres"><a>Entra aquí</a></Link>

        </div>
      </Layout>


    </div>
  )
}


export const getStaticProps: GetStaticProps = async () => {

  const options = {
    method: 'GET',
  };

  const topRes = await fetch('https://api.jikan.moe/v4/top/manga?limit=6', options)
  const top = await topRes.json();

  const bookRes = await fetch("https://api.jikan.moe/v4/manga?order_by=popularity?sfw=true")
  const book = await bookRes.json()

  return { props: { top, book }, revalidate:86400 }
}

export default Home
