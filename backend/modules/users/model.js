const db = require("../../config/db");

const findByMail = (email) => {
    return db
        .execute("select * from user where email = ?", [email])
        .then(([data]) => {
            return data;
        })
        .catch((err) =>{
            console.error("Error ", err)
            return err;
        })
}

const findAll = () => {
    return db
        .query("select * from user")
        .then(([data]) => {
            return data;
        })
        .catch((err) =>{
            console.error("Error ", err)
            return err;
        })
}

const addOne = (user) => {
    const { email, password, role } = user;
    return db
        .execute("insert into user (email, password, role) values (?, ?, ?)",
        [email, password, role])
        .then(([data]) => {
            console.log("data -> ", data)
            return { id: data.insertId, ...user };
        })
        .catch((err) =>{
            console.error("err", err)
            return err;
        })
}

const deleteOne = (id) => {
    return db
        .execute("delete from user where id = ?", [id])
        .then(([data]) => {
            // return data;
            return { affectedRows : data.affectedRows };
        })
        .catch((err) =>{
            console.error("Error ", err)
            return err;
        })
}

const updateOne = (user) => {
    return db
        .execute("update user set email = ?, password = ?, role = ? where id = ?",
        [user.email, user.password, user.role, user.id])
        .then(([data]) => {
            return { affectedRows : data.affectedRows, id: data.insertId, ...user };
        })
        .catch((err) =>{
            console.error("err", err)
            return err;
        })
}

const updateOneByMail = async (user, email) => {
    return db.query("UPDATE user SET ? WHERE email = ?", [user, email])
}

const getById = async (id) => {
    const [user] = await db.query("SELECT * FROM user WHERE id = ?", [id]);
    return user;
}


module.exports = { findByMail, findAll, deleteOne, addOne, updateOne, updateOneByMail, getById}