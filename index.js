const express = require('express');
const Joi = require('joi');
const app = express();
app.use(express.json());

let genres = [
  {
    id: 1,
    title: 'Action'
  },
  {
    id: 2,
    title: 'Romance'
  },
  {
    id: 3,
    title: 'Physchology'
  }
];

app.get('/api/genres', (req, res) => {
  return res.send(genres);
});

app.get('/api/genre/:id', (req, res) => {
  const id = req.params.id;
  const genre = genres.find(c => c.id === parseInt(id));
  if (!genre) res.status(404).send('The Genre does not exist');

  return res.send(genre);
});

app.post('/api/genres', (req, res) => {
  const schema = {
    title: Joi.string()
      .min(3)
      .trim()
      .required()
  };
  const result = Joi.validate(req.body, schema);

  if (result.error) {
    return res.status(400).send(result.error.details[0].message);
  }

  const title = req.body.title;
  const genre = {
    id: genres.length + 1,
    title: title
  };

  genres.push(genre);
  return res.send(genre);
});

app.put('/api/genre/:id', (req, res) => {
  const id = req.params.id;
  const genre = genres.find(c => c.id === parseInt(id));

  if (!genre) res.status(404).send('The Genre does not exist');

  const schema = {
    title: Joi.string()
      .min(3)
      .trim()
      .required()
  };
  const result = Joi.validate(req.body, schema);

  if (result.error) {
    return res.status(400).send(result.error.details[0].message);
  }

  /* No Understanding -> even the original json changes? */
  genre.title = req.body.title;
  return res.send(genre);
});

app.delete('/api/genre/:id', (req, res) => {
  const id = req.params.id;
  const genre = genres.find(c => c.id === parseInt(id));

  if (!genre) res.status(404).send('The Genre Does not exist');

  const index = genres.indexOf(genre);
  /* let inx = null;
  const index1 = genres.filter((c, ind) => {
    if (c.id === parseInt(genre.id)) {
      inx = ind;
      return ind;
    }
  }); */
  genres.splice(index, 1);
  return res.send(genre);
});

const port = process.env.PORT || 3000;
app.listen(port, () =>
  console.log(`Listening ${port} port, ${genres.map(c => c.title)}`)
);
