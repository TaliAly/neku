import type { NextPage } from 'next'
import Head from 'next/head'
import style from "./../styles/index.module.scss"
import dynamic from 'next/dynamic'


import Layout from '../components/layout'
import SearchBarBig from '../components/searchBar/searchBarBig'
const Library = dynamic(() => import("../components/library"))

const Home: NextPage = ({ data }: any) => {

  return (
    <div>
      <Head>
        <title>Neku | Home </title>
      </Head>

      <Layout>
        <div className={style.landing}>
          <SearchBarBig />

          { (data.status != 400) && <Library data={data.data} /> }

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
