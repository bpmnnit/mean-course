const Atlas = require('../models/atlas');

exports.createAtlas = (req, res, next) => {
  const url = req.protocol + '://' + req.get("host");
  console.log(url);
  console.log(req.body);
  console.log(req.files);
  const atlas = new Atlas({
    sig: req.body.sig,
    name: req.body.name,
    onoff: req.body.onoff,
    sector: req.body.sector,
    basin: req.body.basin,
    asset: req.body.asset,
    blocktype: req.body.blocktype,
    year: req.body.year,
    size: req.body.size,
    surveymode: req.body.surveymode,
    sourcetype: req.body.sourcetype,
    acqgrid: req.body.acqgrid,
    acqparty: req.body.acqparty,
    acqfromdate: req.body.acqfromdate,
    acqtodate: req.body.acqtodate,
    acqagency: req.body.acqagency,
    procparty: req.body.procparty,
    procfromdate: req.body.procfromdate,
    proctodate: req.body.proctodate,
    procagency: req.body.procagency,
    locationMapImagePath: url + '/images/locationMapImages/' + req.files[0].filename,
    foldMapImagePath: url + '/images/foldMapImages/' + req.files[1].filename,
    inlineImagePath: url + '/images/inlineImages/' + req.files[2].filename,
    xlineImagePath: url + '/images/xlineImages/' + req.files[3].filename,
    timeSliceImagePath: url + '/images/timeSliceImages/' + req.files[4].filename,
    creator: req.userData.userId
  });
  atlas.save().then(createdAtlas => {
    res.status(201).json({
      message: 'Atlas added successfully.',
      atlas: {
        ...createdAtlas,
        id: createdAtlas._id
      }
    });
  })
  .catch(error => {
    res.status(500).json({
      message: 'Atlas creation failed.'
    });
  });
}

exports.getAtlas = (req, res, next) => {
  const pageSize = +req.query.pageSize;
  const currentPage = +req.query.page;
  const atlasQuery = Atlas.find();
  let fetchedAtlas;
  if(pageSize && currentPage) {
    atlasQuery
      .skip(pageSize * (currentPage - 1))
      .limit(pageSize);
  }
  atlasQuery
    .then(documents => {
      fetchedAtlas = documents;
      return Atlas.countDocuments();
    })
    .then(count => {
      res.status(200).json({
        message: "Atlas fetched successfully!",
        atlas: fetchedAtlas,
        maxAtlas: count
      });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Atlas retrieval failed.'
      });
    });
}
