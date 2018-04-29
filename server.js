const express = require('express')
let app = express();

app.use(express.static(__dirname+'/public'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.listen(3000, ()=>{
  console.log('server running on port 3000');
});
