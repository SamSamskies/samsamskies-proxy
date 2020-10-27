const express = require("express");
const cors = require("cors");
const axios = require("axios");
const pick = require("lodash/pick");

require("dotenv").config();

const app = express();
const port = 8080;
const corsOptions = {
  origin: function (origin, callback) {
    if (process.env.ALLOWED_DOMAINS.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("fuck outta here"));
    }
  },
};

app.use(cors(corsOptions));

app.get("/withdraw/api/v1/links/:withdrawId", async (req, res) => {
  try {
    const { data } = await axios.get(
      `https://lnbits.com/withdraw/api/v1/links/${req.params.withdrawId}`,
      {
        headers: { "X-Api-Key": process.env.LNBITS_READ_KEY },
      }
    );

    res.json(req.query.fields ? pick(data, req.query.fields.split(",")) : data);
  } catch (error) {
    res.status(error.response.status).json(error.response.data);
  }
});

app.listen(port, () => console.log(`server started on port ${port}`));
