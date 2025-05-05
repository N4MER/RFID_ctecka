const sql = require('mssql');


const config = {
  user: 'username',
  password: 'password',
  server: 'server ip',
  database: 'databasename',
  options: {
    encrypt: true,
    trustServerCertificate: true
  }
};

let pool;

async function connect() {
  try {
    pool = await sql.connect(config);
    console.log('Connected to SQL Server');
  } catch (err) {
    console.error('Error connecting to SQL Server:', err);
  };
}

async function addHistory(card_id, isCardSaved) {
  try {
    if (isCardSaved) {
      const query = await pool.request()
        .input('cardID', sql.NVarChar, card_id)
        .query('SELECT TOP 1 description FROM history WHERE card_id = @cardID ORDER BY time DESC');

      let description;

      if (query.recordset.length > 0) {
        description = query.recordset[0].description;
        if (description === "entry") {
          description = "exit";
        } else {
          description = "entry";
        }
      } else {
        description = "entry";
      }
      await pool.request()
        .input('cardID', sql.NVarChar, card_id)
        .input('description', sql.NVarChar, description)
        .input('is_saved_card', sql.Bit, isCardSaved)
        .query('INSERT INTO history (card_id, description, is_saved_card) VALUES (@cardID, @description, @is_saved_card)');
    } else {
      await pool.request()
        .input('cardID', sql.NVarChar, card_id)
        .input('description', sql.NVarChar, 'other')
        .input('is_saved_card', sql.Bit, isCardSaved)
        .query(
          'INSERT INTO history (card_id, description, is_saved_card) VALUES (@cardID, @description, @is_saved_card)'
        )
    }
  } catch (err) {
    console.error("Error querying the database:", err);
  }
}

async function addCard(card_id, name) {
  try {
    await pool.request()
      .input('card_id', sql.NChar, card_id)
      .input('name', sql.NVarChar, name)
      .query(
        'INSERT INTO cards (id, name) VALUES (@card_id, @name)'
      )
  } catch (err) {
    console.error("Error querying the database:", err);
  }
}

async function isAllowed(card_id) {
  let result = false;
  const query = await loadCardIDs();

  if (query.recordset.length > 0) {
    for (let card of query.recordset) {
      if (card.id.trim() == card_id) {
        result = true;
        break;
      }
    }
  }
  return result;
}

async function loadCardIDs() {
  try {
    const query = await sql.query(
      'SELECT id FROM cards'
    );
    return query;
  } catch (err) {
    console.error("Error querying the database:", err);
  }

}

async function loadHistory() {
  try {
    const query = await sql.query(
      'SELECT TOP 10 * FROM history JOIN cards on cards.id = history.card_id ORDER BY time DESC'
    );
    const recordset = query.recordset;
    return recordset;
  } catch (err) {
    console.error("Error querying the database:", err);
  }

}


module.exports = {
  connect,
  addHistory,
  isAllowed,
  loadHistory,
  addCard
};



