require("dotenv").config();

const fs = require("fs");
const mysql = require("mysql2/promise");
const argon2 = require("argon2");

const migrate = async () => {
  const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

  const connection = await mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    multipleStatements: true,
  });

  await connection.query(`drop database if exists ${DB_NAME}`);
  await connection.query(`create database ${DB_NAME}`);
  await connection.query(`use ${DB_NAME}`);

  const sql = fs.readFileSync("./notes.sql", "utf8");

  await connection.query(sql);

  const user = [
    { 
      "username" : "Alexandre78R",
      "password" : "alex",
      "avatar" : `${process.env.BACKEND_URL}/upload/default_user.png`,
      "email" : "alexandre.renard98@gmail.com",
      "role" : "ROLE_ADMIN"
    },
    { 
      "username" : "username1",
      "password" : "user1",
      "avatar" : `${process.env.BACKEND_URL}/upload/default_user.png`,
      "email" : "user1@gmail.com",
      "role" : "ROLE_USER"
    },
    { 
      "username" : "username2",
      "password" : "user2",
      "avatar" : `${process.env.BACKEND_URL}/upload/default_user.png`,
      "email" : "user2@gmail.com",
      "role" : "ROLE_USER"
    },
    { 
      "username" : "username3",
      "password" : "user3",
      "avatar" : `${process.env.BACKEND_URL}/upload/default_user.png`,
      "email" : "user3@gmail.com",
      "role" : "ROLE_USER"
    },
    { 
      "username" : "username4",
      "password" : "user4",
      "avatar" : `${process.env.BACKEND_URL}/upload/default_user.png`,
      "email" : "user4@gmail.com",
      "role" : "ROLE_USER"
    },
    { 
      "username" : "username5",
      "password" : "user5",
      "avatar" : `${process.env.BACKEND_URL}/upload/default_user.png`,
      "email" : "user4@gmail.com",
      "role" : "ROLE_USER"
    },
    { 
      "username" : "admin1",
      "password" : "admin1",
      "avatar" : `${process.env.BACKEND_URL}/upload/default_user.png`,
      "email" : "admin1@gmail.com",
      "role" : "ROLE_ADMIN"
    },
    { 
      "username" : "admin2",
      "password" : "admin2",
      "avatar" : `${process.env.BACKEND_URL}/upload/default_user.png`,
      "email" : "admin2@gmail.com",
      "role" : "ROLE_ADMIN"
    },
    { 
      "username" : "toto",
      "password" : "toto",
      "avatar" : `${process.env.BACKEND_URL}/upload/default_user.png`,
      "email" : "toto@gmail.com",
      "role" : "ROLE_ADMIN"
    },
    { 
      "username" : "tutu",
      "password" : "tutu",
      "avatar" : `${process.env.BACKEND_URL}/upload/default_user.png`,
      "email" : "tutu@gmail.com",
      "role" : "ROLE_USER"
    },
  ];

  for (let i = 0; i < user.length; i++) {
    const { username, password, avatar, email, role } = user[i];
    const hash = await argon2.hash(password);
    await connection.query("insert into user (username, password, avatar, email, role) values (?, ?, ?, ?, ?)",
    [username, hash, avatar, email, role]);
    await console.log(`Add user : ${email} - ${username}`);
  }

  await console.log(`Total User : ${user.length}`);


  const note = [
    { 
      "title" : "title Note 1",
      "text" : "<p>Holla je test la création de note : 1 </p><p><br></p><p><br></p>",
      "isPublic" : "1"
    },
    { 
      "title" : "title Note 2",
      "text" : "<p>Holla je test la création de note : 2 </p><p><br></p><p><br></p>",
      "isPublic" : "1"
    },
    { 
      "title" : "title Note 3",
      "text" : "<p>Holla je test la création de note : 3 </p><p><br></p><p><br></p>",
      "isPublic" : "1"
    },
    { 
      "title" : "title Note 4",
      "text" : "<p>Holla je test la création de note : 4 </p><p><br></p><p><br></p>",
      "isPublic" : "1"
    },
    { 
      "title" : "title Note 5",
      "text" : "<p>Holla je test la création de note : 5 </p><p><br></p><p><br></p>",
      "isPublic" : "1"
    },
    { 
      "title" : "title Note 6",
      "text" : "<p>Holla je test la création de note : 6 </p><p><br></p><p><br></p>",
      "isPublic" : "1"
    },
    { 
      "title" : "title Note 7",
      "text" : "<p>Holla je test la création de note : 7 </p><p><br></p><p><br></p>",
      "isPublic" : "1"
    },
    { 
      "title" : "title Note 8",
      "text" : "<p>Holla je test la création de note : 8 </p><p><br></p><p><br></p>",
      "isPublic" : "1"
    },
    { 
      "title" : "title Note 9",
      "text" : "<p>Holla je test la création de note : 9 </p><p><br></p><p><br></p>",
      "isPublic" : "1"
    },
    { 
      "title" : "title Note 10",
      "text" : "<p>Holla je test la création de note :10 </p><p><br></p><p><br></p>",
      "isPublic" : "1"
    },
    { 
      "title" : "title Note 11",
      "text" : "<p>Holla je test la création de note : 11 </p><p><br></p><p><br></p>",
      "isPublic" : "1"
    },
    { 
      "title" : "title Note 12",
      "text" : "<p>Holla je test la création de note : 12 </p><p><br></p><p><br></p>",
      "isPublic" : "1"
    },
    { 
      "title" : "title Note 13",
      "text" : "<p>Holla je test la création de note : 13 </p><p><br></p><p><br></p>",
      "isPublic" : "1"
    },
    { 
      "title" : "title Note 14",
      "text" : "<p>Holla je test la création de note : 14 </p><p><br></p><p><br></p>",
      "isPublic" : "1"
    },
    { 
      "title" : "title Note 15",
      "text" : "<p>Holla je test la création de note : 15 </p><p><br></p><p><br></p>",
      "isPublic" : "1"
    },
    { 
      "title" : "title Note 16",
      "text" : "<p>Holla je test la création de note : 16 </p><p><br></p><p><br></p>",
      "isPublic" : "1"
    },
  ];

  for (let i = 0; i < note.length; i++) {
    const { title, text, isPublic } = note[i];
    await connection.query("insert into notes (title, text, isPublic) values (?, ?, ?)",
    [title, text, isPublic]);
    await console.log(`Add note : ${title}`);
  }

  await console.log(`Total note : ${note.length}`);

  const userNote = [
    { 
      "user_id" : "1",
      "notes_id" : "1",
      "role" : "ROLE_EDIT"
    },
    { 
      "user_id" : "2",
      "notes_id" : "2",
      "role" : "ROLE_EDIT"
    },
    { 
      "user_id" : "3",
      "notes_id" : "3",
      "role" : "ROLE_EDIT"
    },
    { 
      "user_id" : "4",
      "notes_id" : "4",
      "role" : "ROLE_EDIT"
    },
    { 
      "user_id" : "5",
      "notes_id" : "5",
      "role" : "ROLE_EDIT"
    },
    { 
      "user_id" : "6",
      "notes_id" : "6",
      "role" : "ROLE_EDIT"
    },
    { 
      "user_id" : "7",
      "notes_id" : "7",
      "role" : "ROLE_EDIT"
    },
    { 
      "user_id" : "8",
      "notes_id" : "8",
      "role" : "ROLE_EDIT"
    },
    { 
      "user_id" : "9",
      "notes_id" : "9",
      "role" : "ROLE_EDIT"
    },
    { 
      "user_id" : "10",
      "notes_id" : "10",
      "role" : "ROLE_EDIT"
    },
    { 
      "user_id" : "1",
      "notes_id" : "11",
      "role" : "ROLE_EDIT"
    },
    { 
      "user_id" : "3",
      "notes_id" : "12",
      "role" : "ROLE_EDIT"
    },
    { 
      "user_id" : "2",
      "notes_id" : "13",
      "role" : "ROLE_EDIT"
    },
    { 
      "user_id" : "3",
      "notes_id" : "14",
      "role" : "ROLE_EDIT"
    },
    { 
      "user_id" : "1",
      "notes_id" : "5",
      "role" : "ROLE_EDIT"
    },
    { 
      "user_id" : "2",
      "notes_id" : "5",
      "role" : "ROLE_EDIT"
    },
    { 
      "user_id" : "1",
      "notes_id" : "10",
      "role" : "ROLE_EDIT"
    },
    { 
      "user_id" : "1",
      "notes_id" : "13",
      "role" : "ROLE_EDIT"
    },
    {
    "user_id" : "1",
    "notes_id" : "12",
    "role" : "ROLE_EDIT"
    },
    {
      "user_id" : "1",
      "notes_id" : "15",
      "role" : "ROLE_EDIT"
    },
    {
      "user_id" : "1",
      "notes_id" : "16",
      "role" : "ROLE_VIEW"
    },
    {
      "user_id" : "2",
      "notes_id" : "15",
      "role" : "ROLE_VIEW"
    },
    {
      "user_id" : "2",
      "notes_id" : "16",
      "role" : "ROLE_EDIT"
    },
  ];

  for (let i = 0; i < userNote.length; i++) {
    const { user_id, notes_id, role } = userNote[i];
    await connection.query("insert into user_has_notes (user_id, notes_id, role) values (?, ?, ?)",
    [user_id, notes_id, role]);
    await console.log(`Add userNote : ${user_id} ${notes_id}`);
  }

  await console.log(`Total userNote : ${userNote.length}`);

  connection.end();
};

try {
  migrate().then(() => console.log("Database schema successfully synchronised"));;
} catch (err) {
  console.error(err);
}