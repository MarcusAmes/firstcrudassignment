var express = require('express');
var app = express();
const fs = require('fs')
var port = process.env.PORT || 8000;

app.post('/users/:name/:email/:state', (req, res) => {
  let id;
  let data = JSON.parse(fs.readFileSync('./storage.json', 'utf8'));
  if(data.users.length > 0) {
    id = data.users[data.users.length-1].id + 1;
  } else {
    id = 1
  }
  let {name, email, state} = req.params
  let obj = {
    id,
    name,
    email,
    state
  }
  res.json(obj)
  data.users.push(obj)
  fs.writeFileSync('./storage.json', JSON.stringify(data));
})

app.get('/users', (req, res) => {
  res.json(JSON.parse(fs.readFileSync('./storage.json', 'utf8')));
})

app.get('/users/:id', (req, res) => {
  let foundObj;
  let data = JSON.parse(fs.readFileSync('./storage.json', 'utf8'))
  for(let i = 0; i < data.users.length; i++) {
    if(data.users[i].id === Number(req.params.id)){
      foundObj = data.users[i]
    }
  }
  if(foundObj){
    res.json(foundObj)
  } else {
    res.sendStatus(400)
  }
})

app.post('/users/:id', (req, res) => {
  
})

app.delete('/users/:id', (req, res) => {
  let foundObj;
  let tempArr;
  let data = JSON.parse(fs.readFileSync('./storage.json', 'utf8'))
  for(let i = 0; i < data.users.length; i++) {
    if(data.users[i].id === Number(req.params.id)){
      foundObj = data.users[i]
      tempArr = data.users.slice(0,i).concat(data.users.slice(i+1,data.users.length))
    }
  }
  if(foundObj){
    res.json(foundObj)
    data.users = tempArr;
    fs.writeFileSync('./storage.json', JSON.stringify(data));
  } else {
    res.sendStatus(400)
  }
})

app.get('/yourroute', function(req, res) {
  res.send("stuff");
});

app.use(function(req, res) {
  res.sendStatus(404);
});

app.listen(port, function() {
  console.log('Listening on port', port);
});
