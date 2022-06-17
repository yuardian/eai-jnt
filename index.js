var express = require('express');
var mysql = require('mysql');
var cors = require('cors');
var bodyparser = require('body-parser');
var app = express();
const port = process.env.PORT || 3000;


app.use(cors());
app.use(bodyparser.json());


// app.listen('3000',()=>{
//     console.log('Node Berjalan Good..');
// })



// mysql database connection 

var db = mysql.createConnection({
    host:'localhost',
    port:'3307',
    user:'root@',
    password:'',
    database:'eai_jnt'
});

// check db connection 
db.connect((err)=>{
    if(err) throw err;
    else
    {
        console.log('Database Bisa Jalan kok...');
    }
});


// REST API CURD

app.get('/api',(req,res)=>{
    res.send('Api working');
});


// Create data 

app.post('/api/create',(req,res)=>{

    console.log(req.body);

    // sql query 

    let sql = ` INSERT INTO data_layanan (kode_layanan, jenis_layanan, jenis_transportasi)
                VALUES('${req.body.kode_layanan}','${req.body.jenis_layanan}', '${req.body.jenis_transportasi}')
               `;
    // run query 
    db.query(sql,(err,result)=>{
            if(err) throw err;
            res.send('Sudah Membuat Data Baru');
    });        


});


// Read data 
app.get('/api/read',(req,res)=>{
    // sql query 
    let sql = `SELECT * FROM data_layanan`;
    // run query 
    db.query(sql,(err,result)=>{
        if(err) throw err;
        res.send(result);
    });
})

// Read single data 
app.get('/api/read/:id',(req,res)=>{
    console.log(req.params.id);
    // sql query 
    let sql = `SELECT * FROM data_layanan
                WHERE kode_layanan = '${req.params.id}'
                `;
    // run query 
    db.query(sql,(err,result)=>{
        if(err) throw err;
        res.send(result);
    });          


});

// update single data 

app.put('/api/update/:id',(req,res)=>{
        console.log(req.params.id);
        // sql query 
        let sql = `UPDATE data_layanan SET 
                    jenis_layanan = '${req.body.jenis_layanan}',
                    jenis_transportasi = '${req.body.jenis_transportasi}',

                    WHERE kode_layanan = '${req.params.id}'
                    `;
        // run query 
        db.query(sql,(err,result)=>{
                if(err) throw err;
                res.send('Update Data done...');
        })            
})


// delete single data 

app.delete('/api/delete/:id',(req,res)=>{

    // sql query 
    let sql = `DELETE FROM data_layanan
                WHERE kode_layanan = '${req.params.id}'
                `;
    //    run query 
    db.query(sql,(err,result)=>{
        if(err) throw err;
        res.send('Data di sudah ke Hapus ya..');
    });         
});