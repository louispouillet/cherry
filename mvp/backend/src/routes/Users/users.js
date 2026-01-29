const express = require('express');
const auth = require('../../middelware/auth');
const router = express.Router();
const { getUserById, getUserByPhone, deleteUser, updateUserCity } = require('./users.query');

// (account bouton) Route pour voir les informations d'un user
router.get('/user', auth, async (req, res) => {
  const value = req.payload.id;
  try {
    let user;

    if (/^[a-f0-9]{24}$/i.test(value)) { // Pour verifier si c'est un id de mongoDB (nombre entier)
      user = await getUserById(value);
    } else {
      const isPhone = /^0[67]\d{8}$/.test(value); // Verifie si c'est un numero de telephone (français pour l'instant)
      if (!isPhone)
        return res.status(400).json({ msg: "Invalid phone format" });
      user = await getUserByPhone(value);
    }

    if (!user || user.length === 0)
      return res.status(404).json({ msg: "Not found" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: "Internal server error" });
  }
});


// Route pour supprimer les informations d'un user
router.delete('/user/:id', /*auth,*/ async (req, res) => {
  try {
    const deleted = await deleteUser(req.params.id);

    if (!deleted)
      return res.status(404).json({ msg: "Not found" });

    res.json({ msg: `Successfully deleted record number: \$${req.params.id}` });
  } catch (err) {
    res.status(500).json({ msg: "Internal server error" });
  }
});

// Route pour recuperer les informations du user en fonction du token 
router.get('/user', auth, async (req, res) => {
  const value = req.payload.id;

  try {
    let user;

    user = await getUserById(value);

    if (!user || user.length === 0)
      return res.status(404).json({ msg: "Not found" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: "Internal server error" });
  }
});

// Route pour modifier les informations d'un user (pour l'instant que la ville)
router.put('/user', auth, async (req, res) => {
  const value = req.payload.id;
  const { city } = req.body;

  try {
    let user;

    user = await getUserById(value);

    if (!user || user.length === 0){
      return res.status(404).json({ msg: "User not found" });
    }

    await updateUserCity(value, city);

    res.json({ msg: "User updated successfully", user });
  } catch (err) {
    res.status(500).json({ msg: "Internal server error" });
  }
});



module.exports = router;