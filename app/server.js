const express = require("express");
const conectionToDB = require("./db/connectDb");
const app = express();
const cors = require("cors");
const userRouter = require("./router/userRouter");
const donationRouter = require("./router/donatonRouter");
const fundRaiserRouter = require("./router/fundRaiserRouter");
const fundRaisingTransactionRouter = require("./router/fundRaisingTransactionRouter");
const donationTransactionRouter = require("./router/donationTransactionRouter");
const allTransactionRoutes = require("./router/allTransactionsRouter");
const port = 4000;

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://generosity-hub-client.vercel.app",
    ],
    credentials: true,
  })
);
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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
