const { Contact } = require("../models/contact");

// CREATE
const createContact = async (req, res) => {
  try {
    const contact = await Contact.create(req.body);
    res.status(201).json(contact);
  } catch (err) {
    res.status(400).json({ message: "Failed to create contact", error: err });
  }
};

// READ ALL
const getAllContacts = async (_req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch contacts", error: err });
  }
};

// READ ONE
const getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ message: "Contact not found" });
    res.status(200).json(contact);
  } catch (err) {
    res.status(400).json({ message: "Failed to fetch contact", error: err });
  }
};

// DELETE
const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) return res.status(404).json({ message: "Contact not found" });
    res.status(200).json({ message: "Contact deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: "Failed to delete contact", error: err });
  }
};

module.exports = {
  createContact,
  getAllContacts,
  getContactById,
  deleteContact,
};
