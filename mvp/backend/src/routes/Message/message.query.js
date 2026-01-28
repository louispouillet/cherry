const db = require("../../config/db");
const { ObjectId } = require("mongodb");
const { get } = require("./message");

async function getMessagePreview(id) {
  try {
    if (!id) throw new Error("id is required");
    const conn = await db();
    const response = await conn
      .collection("Events")
      .find({ participants: { $in: [new ObjectId(id)] } })
      .sort({ "lastMessage.sentAt": -1 })
      .project({
        title: "$title",
        photo: { $arrayElemAt: ["$photos", 0] },
        content: "$lastMessage.content",
        sentAt: "$lastMessage.sentAt",
        senderName: "$lastMessage.senderName",
      })
      .toArray();

    return response;
  } catch (err) {
    console.error("Mongo query error getTest : ", err);
    throw err;
  }
}

async function getMessageByGroupId(groupId) {
  const conn = await db();
  const messages = await conn
    .collection("Messages")
    .find({ groupId: new ObjectId(groupId) })
    .toArray();
  return messages;
}

module.exports = { getMessageByGroupId, getMessagePreview };
