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
	connection.query("SELECT * FROM songs",(err,rows,query) =>{
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

// created using create table songs ( SongID int AUTO_INCREMENT, SongName varchar(30), Genre varchar(30), Duration int, Artist varchar(30), PRIMARY KEY (SongID));