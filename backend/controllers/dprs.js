const Dpr = require('../models/dprs');
const mongoose = require('mongoose');

exports.getDprs = (req, res, next) => {
  const pageSize = +req.query.pageSize;
  const currentPage = +req.query.page;
  const dprQuery = Dpr.aggregate([
    { "$sort" : { "date": -1 } },
    {
      "$addFields": {
        "date": {
          "$dateToString": {
            "format": "%d/%m/%Y",
            "date": "$date"
          }
        }
      }
    }
  ]);
  let fetchedDprs;
  if(pageSize && currentPage) {
    dprQuery
      .skip(pageSize * (currentPage - 1))
      .limit(pageSize);
  }
  dprQuery
    .then(documents => {
      fetchedDprs = documents;
      return Dpr.countDocuments();
    })
    .then(count => {
      res.status(200).json({
        message: "Dprs fetched successfully!",
        dprs: fetchedDprs,
        maxDprs: count
      });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Dprs retrieval failed.'
      });
    });
}

exports.updateDrps = (req, res, next) => {
  let data = req.body[0];
  let id = data[0];
  let field = data[1];
  let value = data[3];
  switch(field) {
    case 'fieldparty':
    case 'accepted':
    case 'rejected':
    case 'skipped':
    case 'recovered':
    case 'repeated':
    case 'conversionfactor':
    case 'coverage':
      value = +value;
      break;
    case 'date':
      value = value.split('/');
      value = value[2] + '-' + value[1] + '-' + value[0];
      value = new Date(value);
      break;
  }
  let idObj = id ? { _id: id } : { _id: mongoose.Types.ObjectId() };
  Dpr.update(idObj, {$set: {[field]: value}}, {upsert: true}).then(result => {
    if(result.n > 0) {
      res.status(200).json({ message: 'Update Successful!' });
    } else {
      res.status(401).json({ message: 'User not authorized to edit this DPR.' });
    }
  })
  .catch(error => {
    res.status(500).json({
      message: 'DPR updation failed.',
      error: error
    });
  });
}
