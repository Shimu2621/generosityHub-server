// 🔁 Triggering Vercel Redeploy on June 28

const express = require("express");
const conectionToDB = require("./db/connectDb");
const cors = require("cors");
const app = express();
const userRouter = require("./router/userRouter");
const donationRouter = require("./router/donatonRouter");
const fundRaiserRouter = require("./router/fundRaiserRouter");
const fundRaisingTransactionRouter = require("./router/fundRaisingTransactionRouter");
const donationTransactionRouter = require("./router/donationTransactionRouter");
const allTransactionRoutes = require("./router/allTransactionsRouter");

// Middleware
app.use(
  cors({
    origin: [
      "https://generosity-hub-client.vercel.app",
      "http://localhost:5173",
    ],
    credentials: true,
  })
);

// ✅ 2. Allow preflight requests
app.options("*", cors());

app.use(express.json());

conectionToDB();

app.use("/api", userRouter);
app.use("/api", donationRouter);
app.use("/api", fundRaiserRouter);
app.use("/api", fundRaisingTransactionRouter);
app.use("/api", donationTransactionRouter);
app.use("/api", allTransactionRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

module.exports = app;
