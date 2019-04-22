

var request = new XMLHttpRequest()
var i=1;
request.open('GET', 'http://localhost:8000/allartist', true)
request.onload = function() {
  // Begin accessing JSON data here
  var data = JSON.parse(this.response)
  if (request.status >= 200 && request.status < 400) {
    data.forEach(song => {
      
      var table = document.getElementById("songTable");
      var row = table.insertRow(i);
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      //var cell3 = row.insertCell(2);
      
      cell1.innerHTML = song.SongName;

      cell2.innerHTML = song.Artist;
      i=i+1;
  
    })
  } else {
    const errorMessage = document.createElement('marquee')
    errorMessage.textContent = `Not working`
    app.appendChild(errorMessage)
  }
}
request.send()
