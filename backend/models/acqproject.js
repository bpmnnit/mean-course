const mongoose = require('mongoose');

const acqProjectSchema = mongoose.Schema({
  area: { type: String },
  contract: { type: String },
  vessel: { type: String },
  contractor: { type: String },
  start_date: { type: Date },
  end_date: { type: Date },
  mob_start_date: { type: Date },
  mob_end_date: { type: Date },
  volume: { type: Number },
  source_interval: { type: Number },
  sail_line_interval: { type: Number },
  streamer_length: { type: Number },
  receiver_interval: { type: Number },
  shot_point_interval: { type: Number },
  source_array: { type: Number },
  streamers: { type: Number },
  record_length: { type: Number },
  prime: { type: Number },
  infill_cap: { type: Number },
  prefix: { type: String },
  direction: { x: { type: Number }, y: { type: Number } },
  streamer_profile: { type : Array , "default" : [] },
  planned_completion_days: { type: Number },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});

module.exports = mongoose.model('AcqProject', acqProjectSchema);
