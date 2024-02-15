const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

app.get('/getAllCurrencies', async (req, res) => {
  const currencyNamesFromOpenExchangeRates =
    'https://openexchangerates.org/api/currencies.json?app_id=633118020ef2403db7fb8ab4ce0927f2';

  try {
    const currencyNameRes = await axios.get(currencyNamesFromOpenExchangeRates);
    return res.json(currencyNameRes.data);
  } catch (error) {
    console.error(error);
  }
});

app.listen(port, () => console.log(`Server up and running on port ${port}`));
