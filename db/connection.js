const mysql = require('mysql');
const con = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "root",
    database : "tajurba",
    port : 3306
});

con.connect((err) => {
    if(err){
     throw err;
     console.log("NOT CONNECTED")
    }
        
    console.log("connection created..!!");
});

module.exports.con = con;