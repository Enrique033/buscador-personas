const mysql = require("mysql2")

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "buscador_personas"
})

db.connect(err => {
    if(err){
        console.log("Error conexión DB")
        return
    }

    console.log("Conectado a MySQL")
})

module.exports = db