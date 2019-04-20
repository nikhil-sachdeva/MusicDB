

var request = new XMLHttpRequest()
var i=1;
request.open('GET', 'http://localhost:8080/songs', true)
request.onload = function() {
  // Begin accessing JSON data here
  var data = JSON.parse(this.response)
  if (request.status >= 200 && request.status < 400) {
    data.forEach(song => {
      
      var table = document.getElementById("songTable");
      var row = table.insertRow(i);
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
      i=i+1;
  
    })
  } else {
    const errorMessage = document.createElement('marquee')
    errorMessage.textContent = `Not working`
    app.appendChild(errorMessage)
  }
}
request.send()
