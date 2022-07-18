import Head from 'next/head';
import Image from 'next/image';
import Banner from '../components/banner';
import styles from '../styles/Home.module.css';

export default function Home() {
  const handleOnBannerBtnClick = () => {
    console.log('hey button clicked');
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Coffee Connoisseur</title>
        <meta
          name='description'
          content='Find the best coffee stores near you!'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <Banner
          buttonText='View stores nearby'
          handleOnClick={handleOnBannerBtnClick}
        />
      </main>
    </div>
  );
}
