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
		password : 'Nikhil99',
		database : 'MUSIC'
})


var server = app.listen(process.env.PORT || 8080, function () {
   var port = server.address().port;
   console.log("App now running on port", port);
});

app.get('/songs',(req,res) => {
	connection.query("SELECT * FROM songs ORDER BY SongName",(err,rows,query) =>{
		res.json(rows)
	})
})

//distinct artist, songs
app.get('/allartists',(req,res) => {
	connection.query("SELECT DISTINCT Artist, SongName FROM songs",(err,rows,query) =>{
		res.json(rows)
	})
})
//songname starts with s
app.get('/ssongss',(req,res) => {
	connection.query("SELECT * FROM songs WHERE SongName LIKE 's%' ",(err,rows,query) =>{
		res.json(rows)
	})
})

//genre =pop
app.get('/pop',(req,res) => {
	connection.query("SELECT * FROM songs WHERE Genre='pop' ORDER BY ",(err,rows,query) =>{
		res.json(rows)
	})
})

//duration
app.get('/time',(req,res) => {
	connection.query("SELECT SongName, Duration FROM songs where Duration<'300'",(err,rows,query) =>{
		res.json(rows)
	})
})






app.post('/add_song', (req,res) => {
	console.log("adding new song")
	const name = req.body.name
	const genre = req.body.genre
	const duration = req.body.duration
	const artist = req.body.artist
	const query = "insert into songs (SongName,Genre,Duration,Artist) values (?,?,?,?);"
	connection.query(query,[name,genre,duration,artist],(err, results, fields) => {
		if(err){
			console.log("Errorrrr")
			console.log(err.message)
			res.sendStatus(500)
			return
		}
		
		console.log(results)
		res.end()


	})
})
app.get('/execute',(req,res) => {
	const q = req.body.query;
	connection.query(q,(err,rows,query) =>{
		res.json(rows)
	})
})

// created using create table songs ( SongID int AUTO_INCREMENT, SongName varchar(30), Genre varchar(30), Duration int, Artist varchar(30), PRIMARY KEY (SongID));
