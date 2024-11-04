import express from "express";
import dotenv from "dotenv";
import axios from "axios";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const corsOrigin = process.env.CORS_ORIGIN || "http://localhost:5173";
const aquiferApiKey = process.env.AQUIFER_API_KEY;

app.use(cors({ origin: corsOrigin }));

app.all("*", async (req, res) => {
  try {
    const response = await axios({
      method: req.method,
      url: `https://api.aquifer.bible${req.url}`,
      headers: {
        "api-key": aquiferApiKey,
        "Content-Type": req.headers["content-type"],
        Accept: req.headers["accept"],
        "User-Agent": req.headers["user-agent"],
      },
      data: req.body,
    });

    res.status(response.status).send(response.data);
  } catch (error) {
    console.error(error);

    if (axios.isAxiosError(error)) {
      res
        .status(error.response?.status || 500)
        .send(error.response?.data || "An error occurred");
    } else {
      res.status(500).send("An unexpected error occurred");
    }
  }
});

app.listen(port, () => {
  console.log(
    `[server]: Aquifer API backend proxy is running at http://localhost:${port}`,
  );
});
