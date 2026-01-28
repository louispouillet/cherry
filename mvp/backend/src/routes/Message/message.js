const express = require("express");
const router = express.Router();
const auth = require("../../middelware/auth");
const { getMessageByGroupId, getMessagePreview, getGroupInfoById } = require("./message.query");


router.get("/messagePreview", auth, async (req, res) => {
    const userId = req.payload.id;
    try {
        const response = await getMessagePreview(userId);
        console.log("response: ", response);
        res.status(200).json({ response });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/groupInfo/:groupId', auth, async (req, res) => {
  try {
    const { groupId } = req.params;
    const response = await getGroupInfoById(groupId);
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/messageView/:groupId", auth, async (req, res) => {
  try {
    const { groupId } = req.params;
    const response = await getMessageByGroupId(groupId);
    res.status(200).json({ response });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
