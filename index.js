const express = require("express");
const axios = require("axios");
const pick = require("lodash/pick");

require("dotenv").config();

const app = express();
const port = 8080;

app.get("/withdraw/api/v1/links/:withdrawId", async (req, res) => {
  try {
    const { data } = await axios.get(
      `https://lnbits.com/withdraw/api/v1/links/${req.params.withdrawId}`,
      {
        headers: { "X-Api-Key": process.env.LNBITS_READ_KEY },
      }
    );
    const payload = req.query.fields
      ? pick(data, req.query.fields.split(","))
      : data;

    res.json(
      process.env.ALLOWED_DOMAINS.split(",").includes(req.host)
        ? payload
        : "fuck outta here"
    );
  } catch (error) {
    res.status(error.response.status).json(error.response.data);
  }
});

app.listen(port, () => console.log(`server started on port ${port}`));
