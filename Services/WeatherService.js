const axios = require('axios');
const { createClient } = require('redis');


const client = createClient();

client.connect()
  .then(() => console.log('Connecting on Redis'))
  .catch((err) => console.error('Error connecting on Redis:', err));


async function getAsync(key) {
  try {
    const data = await client.get(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error getting cache', error.message);
    return null;
  }
}


async function setAsync(key, value, ttl) {
  try {
    await client.set(key, JSON.stringify(value), { EX: ttl }); // TTL em segundos
    console.log('Value stored in cache');
  } catch (error) {
    console.error('Error defining cache:', error.message);
  }
}


function replaceSpaces(input, replacementChar) {
  if (typeof input !== 'string' || typeof replacementChar !== 'string') {
    throw new Error('Parameters should be strings');
  }
  return input.split(' ').join(replacementChar);
}

async function getWeather(city) {
  try {
    const startTime = Date.now(); 

    // Tenta obter do cache
    const cachedWeather = await getAsync(city);

    if (cachedWeather) {
      const endTime = Date.now(); 
      console.log(`Time taken (cache): ${endTime - startTime}ms`);
      console.log('Returning cached data');
      return cachedWeather;
    }

    // Case not in cache
    console.log('Consulting API');

    const cityQuery = replaceSpaces(city, '%20');
    const response = await axios.get(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityQuery}?unitGroup=metric&key=FY7CTY9HSJG77QXVETRKATZN6&contentType=json`
    );

    const weatherData = response.data;

  
    await setAsync(city, weatherData, 3600);


    const endTime = Date.now();
    console.log(`Time taken (API): ${endTime - startTime}ms`);

    return weatherData;
  } catch (error) {
    console.error('Error consulting API:', error.message);
    throw new Error('Not possible to consult weather data');
  }
}


module.exports = {getWeather}