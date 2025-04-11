// fetch.js

const fetchCities = async (state) => {
  const response = await fetch(
    'https://countriesnow.space/api/v0.1/countries/state/cities',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        country: 'Nigeria',
        state,
      }),
    }
  );

  const data = await response.json();
  return data.data || [];
};

const getAllMajorCities = async () => {
  const abuja = await fetchCities('Federal Capital Territory');
  const lagos = await fetchCities('Lagos State');
  const rivers = await fetchCities('Rivers State');

  console.log({ abuja, lagos, rivers });
};

getAllMajorCities().catch(console.error);
