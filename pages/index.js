import Head from 'next/head';
import Image from 'next/image';
import Hero from '../public/static/hero-image.png';
import Banner from '../components/banner';
import styles from '../styles/Home.module.css';
import Card from '../components/Card';
import { fetchCoffeeStores } from '../lib/coffee-stores';
import useTrackLocation from '../hooks/use-track-location';
import { useEffect, useState } from 'react';

export async function getStaticProps(context) {
  const coffeeStores = await fetchCoffeeStores();

  return {
    props: {
      coffeeStores,
    },
  };
}

export default function Home(props) {
  const { handleTrackLocation, latLong, locationErrorMsg, isFindingLocation } =
    useTrackLocation();

  const [coffeeStores, setCoffeeStores] = useState('');
  const [coffeeStoresError, setCoffeeStoresError] = useState(null);

  const handleOnBannerBtnClick = () => {
    handleTrackLocation();
  };

  useEffect(() => {
    async function setCoffeeStoresByLocation() {
      if (latLong) {
        try {
          const fetchedCoffeeStores = await fetchCoffeeStores(latLong, 30);
          setCoffeeStores(fetchedCoffeeStores);
        } catch (error) {
          console.log(error);
          setCoffeeStoresError(error.message);
        }
      }
    }

    setCoffeeStoresByLocation();
  }, [latLong]);

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
          buttonText={isFindingLocation ? 'Locating...' : 'View stores nearby'}
          handleOnClick={handleOnBannerBtnClick}
        />

        {locationErrorMsg && <p>Something went wrong: {locationErrorMsg}</p>}
        {coffeeStoresError && <p>Something went wrong: {coffeeStoresError}</p>}

        <div className={styles.heroImage}>
          <Image src={Hero} alt='hero' width={700} height={400} />
        </div>

        {coffeeStores.length > 0 && (
          <div className={styles.sectionWrapper}>
            <h2 className={styles.heading2}> Stores near me </h2>
            <div className={styles.cardLayout}>
              {coffeeStores.map((coffeeStore) => {
                const { name, imgUrl, id } = coffeeStore;
                return (
                  <Card
                    key={id}
                    className={styles.card}
                    name={name}
                    imageUrl={
                      imgUrl ||
                      'https://images.unsplash.com/photo-1498804103079-a6351b050096?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2468&q=80'
                    }
                    href={`/coffee-store/${id}`}
                  />
                );
              })}
            </div>
          </div>
        )}

        {props.coffeeStores.length > 0 && (
          <div className={styles.sectionWrapper}>
            <h2 className={styles.heading2}> Toronto stores </h2>
            <div className={styles.cardLayout}>
              {props.coffeeStores.map((coffeeStore) => {
                const { name, imgUrl, id } = coffeeStore;
                return (
                  <Card
                    key={id}
                    className={styles.card}
                    name={name}
                    imageUrl={
                      imgUrl ||
                      'https://images.unsplash.com/photo-1498804103079-a6351b050096?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2468&q=80'
                    }
                    href={`/coffee-store/${id}`}
                  />
                );
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
