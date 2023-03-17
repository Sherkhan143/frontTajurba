const mysql = require('mysql');
const con = mysql.createConnection({
    // host : "localhost",
    // user : "root",
    // password : "root",
    // database : "tajurba",
    // port : 3306

    host : "sql10.freesqldatabase.com",
    user: "sql10606488",
    password: "AmHEigxuQp",
    database:"sql10606488",
    port : 3306,
    multipleStatements:true
});

con.connect((err) => {
    if(err){
     throw err;
     console.log("NOT CONNECTED")
    }
        
    console.log("connection created..!!");
});

module.exports.con = con;