const db = require('../../config/db');
const { ObjectId } = require('mongodb');
const crypter = require('bcryptjs'); // pour crypter les mots de passe


// Peut etre enlever les mots de passe des retours de fonctions
async function getUserById(id) {
    try {
        const conn = await db();
        return await conn.collection("Users").findOne({ _id: new ObjectId(id) });
    } catch (err) {
        console.error('Mongo query error getUserById : ', err);
        throw (err);
    }
};



async function getAllUsers() {
    try {
        const conn = await db();
        return await conn.collection("Users").find({}).toArray();
    } catch (err) {
        console.error('Mongo query error getAllUsers : ', err);
        throw (err);
    }
};

async function getUserByPhone(phone) {
    try {
        const conn = await db();
        return await conn.collection("Users").findOne({ phone: phone });
    } catch (err) {
        console.error('Mongo query error getUserByPhone : ', err);
        throw (err);
    }
};

async function deleteUser(id) {
    try {
        const conn = await db();
        return await conn.collection("Users").deleteOne({ _id: new ObjectId(id) });
        //return await getAllUsers();
    } catch (err) {
        console.error('Mongo query error deleteUser : ', err);
        throw (err);
    }
}

module.exports = { getUserById, getUserByPhone, deleteUser };