const axios = require('axios');
const { createClient } = require('redis');

// Configuração do Redis
const client = createClient();

client.connect()
  .then(() => console.log('Connecting on Redis'))
  .catch((err) => console.error('Error connecting on Redis:', err));

// Função para obter dados do cache
async function getAsync(key) {
  try {
    const data = await client.get(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error getting cache', error.message);
    return null;
  }
}

// Função para salvar dados no cache
async function setAsync(key, value, ttl) {
  try {
    await client.set(key, JSON.stringify(value), { EX: ttl }); // TTL em segundos
    console.log('Value stored in cache');
  } catch (error) {
    console.error('Error defining cache:', error.message);
  }
}

// Função para substituir espaços por caracteres personalizados
function replaceSpaces(input, replacementChar) {
  if (typeof input !== 'string' || typeof replacementChar !== 'string') {
    throw new Error('Parameters should be strings');
  }
  return input.split(' ').join(replacementChar);
}

async function getWeather(city) {
  try {
    const startTime = Date.now(); // Marca o início da operação

    // Tenta obter do cache
    const cachedWeather = await getAsync(city);

    if (cachedWeather) {
      const endTime = Date.now(); // Marca o fim da operação
      console.log(`Time taken (cache): ${endTime - startTime}ms`);
      console.log('Returning cached data');
      return cachedWeather;
    }

    // Caso não esteja no cache, consulta a API
    console.log('Consulting API');

    const cityQuery = replaceSpaces(city, '%20');
    const response = await axios.get(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityQuery}?unitGroup=metric&key=FY7CTY9HSJG77QXVETRKATZN6&contentType=json`
    );

    const weatherData = response.data;

    // Salva no cache por 1 hora (3600 segundos)
    await setAsync(city, weatherData, 3600);

    const endTime = Date.now(); // Marca o fim da operação
    console.log(`Time taken (API): ${endTime - startTime}ms`);

    return weatherData;
  } catch (error) {
    console.error('Error consulting API:', error.message);
    throw new Error('Not possible to consult weather data');
  }
}


module.exports = {getWeather}