const express = require('express');
const path = require('path');
const database = require('./myModules/database');
const app = express();

database.connect();

const hostname = 'ip adresa serveru';
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.text());

app.get('/', async (req, res) => {
  const cards = await database.loadHistory()
  res.render('index', {cards});
});

app.post('/receive_card_id', async (req, res) => {
  const cardID = req.body.trim();

  if (!/^\d+$/.test(cardID)) {
    return res.status(400).send('Invalid card ID');
  }

  const isAllowed = await database.isAllowed(cardID);
  let cards;

  res.status(200).send(isAllowed);
  if(isAllowed){
    await database.addHistory(cardID, isAllowed);
    cards = await database.loadHistory();
  }
});

app.post('/add_card', async (req, res) => {
  const [name, card_id] = req.body.split('|').map(s => s.trim());
  
  if (!name || !card_id || isNaN(card_id)) {
    return res.status(400).send('Invalid input');
  }

  try {
    await database.addCard(card_id, name);
    res.status(200).send('Card added');
  } catch (err) {
    console.error(err);
    res.status(500).send('Database error');
  }
});

app.use((req, res) => {
  res.status(404).send('404 Not Found');
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

