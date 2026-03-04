const path = require("path")
const express = require("express")
const mysql = require("mysql2")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())

/* servir frontend */
app.use(express.static(path.join(__dirname, "../frontend")))

/* conexión mysql */

const db = mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "",
    database: process.env.DB_NAME || "buscador_personas"
})

db.connect(err => {

    if(err){
        console.log("Error conectando a MySQL")
        return
    }

    console.log("Conectado a MySQL")

})

/* ruta principal */

app.get("/", (req,res)=>{
res.sendFile(path.join(__dirname,"../frontend/index.html"))
})

/* búsqueda */

app.get("/buscar",(req,res)=>{

const q = req.query.q

const sql = `
SELECT * FROM personas
WHERE nombres LIKE ?
`

db.query(sql,[`%${q}%`],(err,result)=>{

if(err){
return res.json([])
}

res.json(result)

})

})

/* login */

app.post("/login",(req,res)=>{

const {usuario,password} = req.body

const sql = `
SELECT * FROM usuarios
WHERE usuario = ? AND password = ?
`

db.query(sql,[usuario,password],(err,result)=>{

if(err){
return res.status(500).send("error")
}

if(result.length === 0){
return res.json({ok:false})
}

res.json({ok:true})

})

})

/* historial */

app.post("/historial",(req,res)=>{

const {busqueda} = req.body

const sql = "INSERT INTO historial_busquedas (busqueda) VALUES (?)"

db.query(sql,[busqueda],(err,result)=>{

if(err){
console.log(err)
return res.status(500).send("error")
}

res.send({ok:true})

})

})

/* puerto */

const PORT = process.env.PORT || 3000

app.listen(PORT, ()=>{
console.log("Servidor corriendo en puerto " + PORT)
})