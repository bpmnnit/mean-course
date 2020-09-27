const Dpr = require('../models/dprs');

exports.getDprs = (req, res, next) => {
  //const pageSize = +req.query.pageSize;
  //const currentPage = +req.query.page;
  const dprQuery = Dpr.find();
  let fetchedDprs;
  // if(pageSize && currentPage) {
  //   dprQuery
  //     .skip(pageSize * (currentPage - 1))
  //     .limit(pageSize);
  // }
  dprQuery
    .then(documents => {
      fetchedDprs = documents;
      return Dpr.countDocuments();
    })
    .then(count => {
      res.status(200).json({
        message: "Dprs fetched successfully!",
        Dprs: fetchedDprs,
        maxDprs: count
      });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Dprs retrieval failed.'
      });
    });
}
