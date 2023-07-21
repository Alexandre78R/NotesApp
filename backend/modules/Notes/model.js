const db = require("../config/db");

const findAll = () => {
    return db
        .query("select * from note")
        .then(([data]) => {
            return data;
        })
        .catch((err) =>{
            console.error("Error ", err)
            return err;
        })
} 

const findOne = (id) => {
    return db
        .execute("select * from note where id = ?", [id])
        .then(([data]) => {
            return data;
        })
        .catch((err) =>{
            console.error("Error ", err)
            return err;
        })
} 

const createNote = (note) => {
    const { name } = note;
    return db
        .execute("insert into note (name) values (?)",
        [name])
        .then(([data]) => {
            return { id: data.insertId, ...note };
        })
        .catch((err) =>{
            console.error("err", err)
            return err;
        })
} 

const removeNote = (id) => {
    return db
        .execute("delete from note where id = ?", [id])
        .then(([data]) => {
            return data;
        })
        .catch((err) =>{
            console.error("Error ", err)
            return err;
        })
} 

const modifyNote = (note, id) => {
    return db
        .query("update note set ? where id = ?", [note, id])
        .then(([data]) => {
            return data;
        })
        .catch((err) =>{
            console.error("Error ", err)
            return err;
        })
} 

module.exports = { findAll, findOne, createNote, removeNote, modifyNote };