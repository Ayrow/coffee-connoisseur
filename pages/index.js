import Head from 'next/head';
import Image from 'next/image';
import Hero from '../public/static/hero-image.png';
import Banner from '../components/banner';
import styles from '../styles/Home.module.css';
import Card from '../components/Card';

import coffeeStoresData from '../data/coffee-stores.json';

export async function getStaticProps(context) {
  return {
    props: {
      coffeeStores: coffeeStoresData,
    },
  };
}

export default function Home(props) {
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

        {props.coffeeStores.length > 0 && (
          <>
            <h2 className={styles.heading2}> Toronto stores </h2>
            <div className={styles.cardLayout}>
              {props.coffeeStores.map((coffeeStore) => {
                const { name, imgUrl, id } = coffeeStore;
                return (
                  <Card
                    key={id}
                    className={styles.card}
                    name={name}
                    imageUrl={imgUrl}
                    href={`/coffee-store/${id}`}
                  />
                );
              })}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
