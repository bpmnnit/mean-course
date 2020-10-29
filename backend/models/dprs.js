const mongoose = require('mongoose');

const dprSchema = mongoose.Schema({
  date: { type: Date, required: true },
  fieldparty: { type: Number, required: true },
  accepted: { type: Number, required: true },
  rejected: { type: Number, required: true },
  skipped: { type: Number, required: true },
  recovered: { type: Number, required: true },
  repeated: { type: Number, required: true },
  conversionfactor: { type: Number, required: true },
  coverage: { type: Number, required: true },
  area: { type: String, required: true },
  shottype: { type: String, required: true },
  acquisitiontype: { type: String, required: true },
});

module.exports = mongoose.model('Dpr', dprSchema);
