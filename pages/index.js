import Head from 'next/head';
import Image from 'next/image';
import Hero from '../public/static/hero-image.png';
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
          className={styles.banner}
          buttonText='View stores nearby'
          handleOnClick={handleOnBannerBtnClick}
        />
        <div className={styles.heroImage}>
          <Image src={Hero} alt='hero' width={700} height={400} />
        </div>
      </main>
    </div>
  );
}
