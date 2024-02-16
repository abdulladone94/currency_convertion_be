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

app.get('/convert', async (req, res) => {
  const { date, sourceCurrency, targetCurrency, amountInSourceCurrency } =
    req.query;

  try {
    const currencyDataUrl = `https://openexchangerates.org/api/historical/${date}.json?api_id=633118020ef2403db7fb8ab4ce0927f2`;
    const dateResponse = await axios.get(currencyDataUrl);
    const rates = dateResponse.data.rates;

    // rates
    const sourceRate = rates[sourceCurrency];
    const targetRate = rates[targetCurrency];

    const targetAmount = (targetRate / sourceRate) * amountInSourceCurrency;

    return res.json(targetAmount.toFixed(2));
  } catch (error) {
    console.error(error);
  }
});

app.listen(port, () => console.log(`Server up and running on port ${port}`));

// AED: 3.672975 = ERN  : X;
// AED / 3.672975  =  ERN / X;
// X = (ERN / AED) * 3.672975;

// tartAmount = (tarRate / srcRate) * srcAmount
