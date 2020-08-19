const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const fetch = require("node-fetch");

require("dotenv").config();

const app = express();

app.use(morgan("common"));
app.use(cors());

//Test landing page
app.get("/", (req, res) => {
  res.json({
    message: "Hello World",
  });
});

//Twitter API calls
const TWITTER_BASE_URL = "https://api.twitter.com/1.1/";

app.get("/tweets/", async (req, res) => {
  let SEARCH_VALUE = encodeURIComponent(req.query.q);

  const response = await fetch(
    `${TWITTER_BASE_URL}/search/tweets.json?q=${SEARCH_VALUE}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.TWITTER_TOKEN}`,
      },
    }
  );

  const json = await response.json();
  res.json(json);
});

//Jisho Api calls
const JISHO_BASE_URL = "https://jisho.org/api/v1/search/words?keyword=";

app.get("/jisho/", async (req, res) => {
  let JISHO_SEARCH_VALUE = encodeURIComponent(req.query.q);
  const response = await fetch(`${JISHO_BASE_URL}${JISHO_SEARCH_VALUE}`);
  const json = await response.json();
  res.json(json);
});

//Setting port
const port = process.env.PORT || 1228;
app.listen(port, () => {
  console.log(`Listening at http://localhost@${port}`);
});
