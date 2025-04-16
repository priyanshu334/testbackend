const express = require("express");
const {
  createContact,
  getAllContacts,
  getContactById,
  deleteContact,
} = require("../controllers/contactController");

const router = express.Router();

router.post("/", createContact);
router.get("/", getAllContacts);
router.get("/:id", getContactById);
router.delete("/:id", deleteContact);

module.exports = router;
