

var request1 = new XMLHttpRequest()
var i=1;
request1.open('GET', 'http://localhost:8080/playlists', true)
request1.onload = function() {
  // Begin accessing JSON data here
  var data = JSON.parse(this.response)
  if (request1.status >= 200 && request1.status < 400) {
    data.forEach(song => {
      
      var table = document.getElementById("Ptable");
      var row = table.insertRow(i);
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      //var cell3 = row.insertCell(2);
      
      cell1.innerHTML = song.PlaylistID;

      cell2.innerHTML = song.SongID;
      i=i+1;
  
    })
  } else {
    const errorMessage = document.createElement('marquee')
    errorMessage.textContent = `Not working`
    app.appendChild(errorMessage)
  }
}


var request2 = new XMLHttpRequest()
var j=1;
request2.open('GET', 'http://localhost:8080/playlist_1', true)
request2.onload = function() {
  // Begin accessing JSON data here
  var data = JSON.parse(this.response)
  if (request2.status >= 200 && request2.status < 400) {
    data.forEach(song => {
      
      var table = document.getElementById("playlistTable");
      var row = table.insertRow(j);
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      var cell3 = row.insertCell(2);
      var cell4 = row.insertCell(3);
      var cell5 = row.insertCell(4);
      cell1.innerHTML = song.SongID;
      cell2.innerHTML = song.SongName;
      cell3.innerHTML = song.Genre;
      cell4.innerHTML = Math.trunc(song.Duration/60) + "min " + song.Duration%60+"sec";
      cell5.innerHTML = song.Artist;
      j=j+1;
  
    })
  } else {
    const errorMessage = document.createElement('marquee')
    errorMessage.textContent = `Not working`
    app.appendChild(errorMessage)
  }
}


request1.send()

request2.send()