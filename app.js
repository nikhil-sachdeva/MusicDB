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
app.get('/playlists',(req,res) => {
	connection.query("SELECT * FROM playlist",(err,rows,query) =>{
		res.json(rows)
	})
})
//distinct artist, songs
app.get('/allartists',(req,res) => {
	connection.query("SELECT DISTINCT Artist FROM songs",(err,rows,query) =>{
		res.json(rows)

	})
})
//songname starts with s
app.get('/ssongs',(req,res) => {
	connection.query("SELECT * FROM songs WHERE SongName LIKE 's%' ",(err,rows,query) =>{
		res.json(rows)
	})
})

//genre =pop
app.get('/pop',(req,res) => {
	connection.query("SELECT * FROM songs WHERE Genre='pop' ",(err,rows,query) =>{
		res.json(rows)
	})
})

//duration
app.get('/time',(req,res) => {
	connection.query("SELECT SongName, Duration FROM songs where Duration<'300'",(err,rows,query) =>{
		res.json(rows)
	})
})

//playlist songs
app.get('/playlist_1',(req,res) => {
	connection.query("select songs.SongID, songs.SongName,songs.Genre,songs.Duration,songs.Artist from songs RIGHT JOIN (select * from playlist where PlaylistID=1) as playlist1 on songs.SongID=playlist1.SongID",(err,rows,query) =>{
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
		res.redirect('http://localhost:8080/all.html')
		res.end()


	})
})





app.post('/add_playlist', (req,res) => {
	console.log("adding new playlist")
	const plid = req.body.playlistID
	const nid = req.body.songID
	const query = "insert into playlist (SongID,PlaylistID) values (?,?);"
	connection.query(query,[nid,plid],(err, results, fields) => {
		if(err){
			console.log("Errorrrr")
			console.log(err.message)
			res.sendStatus(500)
			return
		}
		
		console.log(results)
		res.redirect('http://localhost:8080/create.html')
		res.end()


	})
})
// created using create table songs ( SongID int AUTO_INCREMENT, SongName varchar(30), Genre varchar(30), Duration int, Artist varchar(30), PRIMARY KEY (SongID));
