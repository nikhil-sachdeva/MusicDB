

var request1 = new XMLHttpRequest()
var i=1;
request1.open('GET', 'http://localhost:8080/allartists', true)
request1.onload = function() {
  // Begin accessing JSON data here
  var data = JSON.parse(this.response)
  if (request1.status >= 200 && request1.status < 400) {
    data.forEach(song => {
      
      var table = document.getElementById("table1");
      var row = table.insertRow(i);
      var cell1 = row.insertCell(0);

      //var cell3 = row.insertCell(2);
      

      cell1.innerHTML = song.Artist;
      i=i+1;
  
    })
  } else {
    const errorMessage = document.createElement('marquee')
    errorMessage.textContent = `Not working`
    app.appendChild(errorMessage)
  }
}
request1.send()


var request2 = new XMLHttpRequest()
var j=1;
request2.open('GET', 'http://localhost:8080/ssongs', true)
request2.onload = function() {
  // Begin accessing JSON data here
  var data = JSON.parse(this.response)
  if (request2.status >= 200 && request2.status < 400) {
    data.forEach(song => {
      
      var table = document.getElementById("table2");
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
request2.send()

var request3 = new XMLHttpRequest()
var k=1;
request3.open('GET', 'http://localhost:8080/time', true)
request3.onload = function() {
  // Begin accessing JSON data here
  var data = JSON.parse(this.response)
  if (request3.status >= 200 && request3.status < 400) {
    data.forEach(song => {
      
      var table = document.getElementById("table3");
      var row = table.insertRow(k);
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);

      cell1.innerHTML = song.SongName;

      cell2.innerHTML = Math.trunc(song.Duration/60) + "min " + song.Duration%60+"sec";
      k=k+1;
    })
  } else {
    const errorMessage = document.createElement('marquee')
    errorMessage.textContent = `Not working`
    app.appendChild(errorMessage)
  }
}
request3.send()