const AcqProject = require('../models/acqproject');

exports.createAcqProject = (req, res, next) => {
  const url = req.protocol + '://' + req.get("host");
  console.log(url);
  console.log(req.body);
  const acqProject = new AcqProject({
    area: req.body.area,
    contract: req.body.contract,
    vessel: req.body.vessel,
    contractor: req.body.contractor,
    start_date: req.body.start_date,
    end_date: req.body.end_date,
    mob_start_date: req.body.mob_start_date,
    mob_end_date: req.body.mob_end_date,
    volume: req.body.volume,
    source_interval: req.body.source_interval,
    sail_line_interval: req.body.sail_line_interval,
    streamer_length: req.body.streamer_length,
    receiver_interval: req.body.receiver_interval,
    shot_point_interval: req.body.shot_point_interval,
    source_array: req.body.source_array,
    streamers: req.body.streamers,
    record_length: req.body.record_length,
    prime: req.body.prime,
    infill_cap: req.body.infill_cap,
    prefix: req.body.prefix,
    direction: req.body.direction,
    streamer_profile: req.body.streamer_profile,
    planned_completion_days: req.body.planned_completion_days,
    creator: req.userData.userId
  });
  console.log(acqProject);
  acqProject.save().then(createdAcqProject => {
    res.status(201).json({
      message: 'AcqProject added successfully.',
      acqProject: {
        ...createdAcqProject,
        id: createdAcqProject._id
      }
    });
  })
  .catch(error => {
    res.status(500).json({
      message: 'AcqProject creation failed.'
    });
  });
}

exports.getAcqProjects = (req, res, next) => {
  const pageSize = +req.query.pageSize;
  const currentPage = +req.query.page;
  const acqProjectQuery = AcqProject.find();
  let fetchedAcqProject;
  if(pageSize && currentPage) {
    acqProjectQuery
      .skip(pageSize * (currentPage - 1))
      .limit(pageSize);
  }
  acqProjectQuery
    .then(documents => {
      fetchedAcqProject = documents;
      console.log(fetchedAcqProject);
      return AcqProject.countDocuments();
    })
    .then(count => {
      res.status(200).json({
        message: "AcqProject fetched successfully!",
        acqProject: fetchedAcqProject,
        maxAcqProject: count
      });
    })
    .catch(error => {
      res.status(500).json({
        message: 'AcqProject retrieval failed.'
      });
    });
}
