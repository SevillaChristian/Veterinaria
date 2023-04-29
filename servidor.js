const express = require('express');
const mysql = require('mysql');
const multer = require('multer');

const app = express();
app.use(express.static(__dirname));
app.use(express.json())
app.use(express.static('public'))
app.use(express.urlencoded({
    extended: true
}))
var con = mysql.createConnection({
    host : 'localhost',
    user : 'patrick',
    password : '1234',
    database : 'veterinaria'
});
//configuracion multer
const upload = multer({
    dest: 'public/imagenes',
    fileFilter : function(req, file, cb){
        if(!file.originalname.match(/\.(jpg|jpeg)$/)){
            return cb(new Error('Solo se permiten archvios JPG'))
        }
        cb(null, true);
    }//finf del filefilter
})//fin del multer

app.post("/registrar", upload.single('file'),(req,res)=>{
    var id_cliente = req.body.id_cliente;
    var nombre = req.body.nombre;
    var nombre_mascota = req.body.nombre_mascota;
    var fecha_nacimiento = req.body.fecha_nacimiento;
    var especie = req.body.especie;
    var raza = req.body.raza;
    var sexo = req.body.sexo;
    var tipo_membresia = req.body.membresia;
    var nombre_cliente = req.body.nombre_cliente;
    var fecha_registro = req.body.fecha_registro;
    var correo_electronico = req.body.correo;
    var telefono = req.body.telefono;
    var direccion = req.body.direccion;
    const imagen = req.body.imagen;
    var membresia = req.body.membresia;
    const fechaActual = new Date().toISOString().slice(0, 10);

    console.log(req.file);
    console.log('¡conectado!');
    //clientes
    var sql = 'INSERT INTO clientes (id_cliente, nombre, correo_electronico, telefono, direccion, fecha_registro) VALUES(?, ?, ?, ?, ?, ?)';
    con.query(sql, [id_cliente, nombre_cliente, correo_electronico, telefono, direccion, fechaActual], function(err, result){
        if(err) throw err;
        console.log("Numero de registros insertados: " + result.affectedRows);
        console.log(id_cliente, nombre, fecha_nacimiento, especie, raza, sexo, imagen);
        });
        //mascotas
        var sql = 'INSERT INTO mascotas (id_cliente, nombre, fecha_nacimiento, especie, raza, sexo, imagen) VALUES(?, ?, ?, ?, ?, ?, ?)';
        con.query(sql, [id_cliente, nombre, fecha_nacimiento, especie, raza, sexo, imagen], function(err, result){
            if(err) throw err;
            console.log("Numero de registros insertados: " + result.affectedRows);
            console.log(id_cliente, nombre, fecha_nacimiento, especie, raza, sexo, imagen);
            res.send('Imagen cargada correctamente');
            });
            //membresia
        var sql = 'INSERT INTO membresia (id_membresia, tipo_membresia, fecha_inicio, fecha_vencimiento, costo, id_cliente) VALUES(?, ?, ?, ?, ?, ?)';
        con.query(sql, [id_cliente, tipo_membresia, fechaActual, fechaActual, 200, id_cliente], function(err, result){
            if(err) throw err;
            console.log("Numero de registros insertados: " + result.affectedRows);
            console.log(id_mascotas, tipo_membresia, fecha_inicio, fecha_vencimiento, costo, id_cliente,);
            res.send('listo');
            });
    });
    

app.get("/", (req, res)=>{
    return res.redirect('index.html');
}).listen(5000);
console.log('escuchando el puerto 5000');