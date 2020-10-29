const mongoose = require('mongoose');

const atlasSchema = mongoose.Schema({
  sig: { type: String },
  name: { type: String },
  onoff: { type: String },
  sector: { type: String },
  basin: { type: String },
  asset: { type: String },
  blocktype: { type: String },
  year: { type: String },
  size: { type: Number },
  surveymode: { type: String },
  sourcetype: { type: String },
  acqparty: { type: String },
  acqfromdate: {type: Date },
  acqtodate: { type: Date },
  acqagency: { type: String },
  procparty: { type: String },
  procfromdate: { type: Date },
  proctodate: { type: Date },
  procagency: { type: String },
  locationMapImagePath: { type: String },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});

module.exports = mongoose.model('Atlas', atlasSchema);
