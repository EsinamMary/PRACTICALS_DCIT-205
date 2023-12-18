const express = require('express');
const mongoose = require('mongoose');
const Patient = require('./patient');
const Encounter = require('./encounter');
const app = express();
const port = 3001;

app.use(express.json());

const EncounterSchema = new mongoose.Schema({
  patientId: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  type: {
    type: String,
    enum: ['emergency', 'opd', 'specialist care'],
    required: true
  }
});

const Encounter = mongoose.model('Encounter', EncounterSchema);

// Create an encounter (POST /encounters)
app.post('/encounters', (req, res) => {
  const { patientId, date, type } = req.body;

  const newEncounter = new Encounter({
    patientId,
    date,
    type
  });

  newEncounter.save((err, encounter) => {
    if (err) {
      console.error('Failed to create an encounter:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    res.status(200).json(encounter);
  });
});

// Connect to MongoDB
mongoose
  .connect('mongodb+srv://Esinam:<password>@esinam.DodooEsinam.mongodb.net/nodeApi?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(port, () => {
      console.log(` Patient logi page  ${port}`);
    });
  })
  .catch((err) => console.error('Failed to connect to MongoDB:', err));