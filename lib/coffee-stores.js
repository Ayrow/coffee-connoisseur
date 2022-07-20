import { createApi } from 'unsplash-js';

const unsplash = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY,
});

const getListOfCoffeeStorePhotos = async () => {
  const photos = await unsplash.search.getPhotos({
    query: 'coffee shop',
    perPage: 30,
  });

  const unsplashResults = photos.response?.results || [];
  return unsplashResults.map((result) => result.urls['small']);
};

export const fetchCoffeeStores = async () => {
  const photos = await getListOfCoffeeStorePhotos();
  const options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: process.env.FOURSQUARE_API_KEY,
    },
  };

  const response = await fetch(
    'https://api.foursquare.com/v3/places/search?query=coffee&near=toronto&limit=6',
    options
  );
  const data = await response.json();
  return data.results.map((result, index) => {
    const neighborhood = result.location.neighborhood;
    return {
      address: result.location.address,
      id: result.fsq_id,
      name: result.name,
      neighborhood: neighborhood.length > 0 ? neighborhood[0] : '',
      imgUrl: photos.length > 0 ? photos[index] : null,
    };
  });

  // .catch((err) => console.error(err));
};
