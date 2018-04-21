function intentCreate (task, callback) {
  var xhr = new XMLHttpRequest()
  var url = '/fn/Intents/intentCreate'
  xhr.open('POST', url, true)
  xhr.setRequestHeader('Content-type', 'application/json')
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      callback(JSON.parse(xhr.responseText))
    }
  }
  var timestamp = Math.floor(Date.now() / 1000);
  var data = JSON.stringify({'content': task, 'timestamp': timestamp})
  xhr.send(data)
  displayIntent({content: task, timestamp: timestamp})
}

function intentRead (hash, callback) {
  var xhr = new XMLHttpRequest()
  var url = '/fn/Intents/intentRead'
  xhr.open('POST', url, true)
  xhr.setRequestHeader('Content-type', 'application/json')
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      callback(JSON.parse(xhr.responseText))
    }
  }
  var data = JSON.stringify(hash)
  xhr.send(data)
}

function displayIntent(data) {

    $( "#intents" ).append( "<li>" + data.content + " " + data.timestamp);
        
}
    

function getAllIntents () {
    $.post({ url: '/fn/Intents/getAllIntents', data: '', dataType: "json", contentType: "application/json", success: function ( result ) {
        result.sort(function(a, b){
            return a.Entry.timestamp-b.Entry.timestamp
        })

        for ( var x=0; x<result.length; x++ ) {
            var content = result[x].Entry.content;
            var timestamp = result[x].Entry.timestamp;
            $( "#intents" ).append( "<li>" + content + " " + timestamp );
        }
            
    } } );
        
}