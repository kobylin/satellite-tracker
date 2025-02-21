const express = require('express');
const router = express.Router();
const ISS = require('../services/satellites/ISS');

const issSatelliteService = new ISS();

router.get('/iss/now', async function (req, res, next) {
  try {
    const position = await issSatelliteService.getNow();
    res.send(position);
  } catch (error) {
    console.error('Error fetching ISS position:', error);
    res.status(500).send({ error: 'Failed to fetch ISS position' });
  }
});

module.exports = router;
