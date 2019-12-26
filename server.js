
const db = require('./db/index.js');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const PORT = process.env.PORT || 5000;

const Album = require('./db/models/album.js').Album;

app.use(bodyParser.json());

app.get('/album', (req, res) => {
  Album.find()
    .then((album) => res.status(200).send(album))
    .catch((err) => res.status(400).send(err));
})

app.post('/album', (req, res) => {
    const body = req.body;
    const album = new Album({
      name: body.name,
      artist: body.artist,
    });
    album.save(album)
       .then((album) => res.status(201).send(album))
       .catch((err) => res.status(400).send(err));
});

db.connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log('Listening on port ' + PORT);
    });
  });

module.exports = app;
