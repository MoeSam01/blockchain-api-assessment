const express = require("express");
const router = express.Router();
const { getContractData } = require("./service");

router.get("/api-test", async (req, res) => {
  try {
    const data = await getContractData();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;