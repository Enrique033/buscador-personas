const express = require("express")
const mysql = require("mysql2")
const cors = require("cors")

const app = express()
app.use(express.json())

app.use(cors())

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "buscador_personas"
})

db.connect(err => {

    if(err){
        console.log("Error conectando a MySQL")
        return
    }

    console.log("Conectado a MySQL")

})

app.get("/", (req,res)=>{
    res.send("Servidor del buscador funcionando")
})

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

const PORT = process.env.PORT || 3000

app.listen(PORT, ()=>{
console.log("Servidor corriendo")
})

app.post("/historial", (req,res)=>{

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