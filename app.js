var express = require('express');
var app = express();

const mysql = require('mysql');

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended:false})
)
app.use(express.static('./front'))

const connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : '',
		database : 'MUSIC'
})


var server = app.listen(process.env.PORT || 8080, function () {
   var port = server.address().port;
   console.log("App now running on port", port);
});

app.get('/songs',(req,res) => {
	connection.query("SELECT * FROM songs",(err,rows,query) =>{
		res.json(rows)
	})
})

// created using create table songs ( SongID int AUTO_INCREMENT, SongName varchar(30), Genre varchar(30), Duration int, Artist varchar(30), PRIMARY KEY (SongID));