const express = require("express");
const router = express.Router();
const db = require("../../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

router.post("/login", async (req, res) => {
  //password123
  const conn = await db();
  const phoneRegex = /^0[67]\d{8}$/; // Pour verifier si c'est bien un telephone qui est donné

  const { phone, password } = req.body;
  if (!phone || !password) {
    return res.status(400).json({ msg: "Bad parameter" });
  }

  try {
    const result = await conn
      .collection("Users")
      .findOne({ phone: phone });
    if (!result) {
      return res.status(404).json({ msg: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, result.password);
    if (!isMatch) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }
    const payload = { id: result._id };
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    console.log(payload);
    return res.status(201).json({ token: accessToken });
  } catch (err) {
    console.error("Erreur détaillée :", err);
    return res.status(500).json({ error: err.message });
  }
});

router.post("/register", async (req, res) => {
  const { phone, password, birthdate, firstname, lastname, description, hobbies, picture } = req.body;
  const conn = await db();
  if (!phone || !password || !birthdate || !firstname || !lastname) {
    return res.status(400).json({ msg: "Bad parameter" });
  }
  try {
    const existingUser = await conn
      .collection("Users")
      .findOne({ phone: phone });
    if (existingUser) {
      return res.status(409).json({ msg: "Account already exists" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = {
      phone,
      password: hashPassword,
      birthdate,
      firstname,
      lastname,
      description,
      hobbies,
      picture,
    };
    const result = await conn.collection("Users").insertOne(newUser);
    const payload = { id: result.insertedId };
    console.log(payload);
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    return res.status(201).json({ token: accessToken });
  } catch (err) {
    console.error("Erreur détaillée :", err);
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;
