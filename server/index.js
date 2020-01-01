const express = require('express');
const route = require("./routes/api")
const path = require('path'); // NEW
const bodyParser = require("body-parser")
const mongoose = require("mongoose")

const app = express();
const port = process.env.PORT || 3000;

const DIST_DIR = path.join(__dirname, '../dist'); // NEW
const HTML_FILE = path.join(DIST_DIR, 'index.html'); // NEW

mongoose.connect("mongodb://localhost/ninjago")
mongoose.Promise = global.Promise



const mockResponse = {
  foo: 'bar',
  bar: 'foo'
};

app.use(express.static(DIST_DIR)); // NEW

app.use(bodyParser.json())

app.use("/api", route)

app.use((err, req, res, next) =>{
  res.status(422).send({
      error: err.message
  })

})

/*
app.get('/', (req, res) => {
 res.sendFile(HTML_FILE); // EDIT
}); 
*/

app.listen(port, function () {
 console.log('App listening on port: ' + port);
});