import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Component {...pageProps} />
      <article>
        <h1>How to be a wizard</h1>
        <ol>
          <li>Grow a long, majestic beard.</li>
          <li>Wear a tall, pointed hat.</li>
          <li>Have I mentioned the beard?</li>
        </ol>
        <footer>
          <p>© 2022 Coffee Connoisseur</p>
        </footer>
      </article>
    </div>
  );
}

export default MyApp;
