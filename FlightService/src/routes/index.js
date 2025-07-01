const express = require("express");
const v1Routes = require('./v1')

const router = express.Router();

// Health check endpoint
router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    service: 'FlightService',
    timestamp: new Date().toISOString(),
    database: 'Supabase/PostgreSQL'
  });
});

router.use('/v1', v1Routes);

module.exports = router;