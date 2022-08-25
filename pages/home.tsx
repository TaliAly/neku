import type { NextPage } from 'next'
import Head from 'next/head'

import Layout from '../components/layout'
import SearchBar from '../components/searchBar'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Neku Home</title>
        <link rel="shortcut icon" href="neku.ico" type="image/x-icon" />
      </Head>

      <Layout>
        <SearchBar />
      </Layout>


    </div>
  )
}

export default Home
