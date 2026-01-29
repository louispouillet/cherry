const express = require("express");
const router = express.Router();
const auth = require("../../middelware/auth");
const { getMessageByGroupId, getMessagePreview, getGroupInfoById, sendMessageByGroupId} = require("./message.query");


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
    const userId = req.payload.id;
    const response = await getMessageByGroupId(groupId, userId);
    res.status(200).json({ response });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/sendMessage/:groupId", auth, async (req, res) => {
  try {
    const groupId = req.params.groupId;
    const userId = req.payload.id;
    const content = req.body.content;
    const response = await sendMessageByGroupId(groupId, userId, content);
    res.status(200).json({ response });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
