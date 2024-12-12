const express = require("express");
const router = express.Router();
const fundRaiserController = require("../controllers/fundRaiserController");

router.post("/create-fundraiser", fundRaiserController.createFundRaiser);
router.get("/fundraisers", fundRaiserController.getAllFundRaiser);
router.get("/fundraisers/:id", fundRaiserController.getSingleFundRaiserById);
router.put("/fundraisers/:id", fundRaiserController.updateFundRaiserById);
router.delete("/fundraisers/:id", fundRaiserController.deleteFundraiser);

module.exports = router;
