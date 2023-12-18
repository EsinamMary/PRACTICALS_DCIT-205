const mongoose = require('mongoose');

const encounterSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient'
  },
  date: {
    type: Date,
    required: true
  },
  type: {
    type: String,
    enum: ['Emergency', 'OPD', 'Specialist Care'],
    required: true
  }
});

const Encounter = mongoose.model('Encounter', encounterSchema);

module.exports = Encounter;