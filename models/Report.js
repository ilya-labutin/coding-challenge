const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
  id: String,
  source: String,
  sourceEntityId: String,

  reference: {
    referenceId: String,
    referenceType: String,
  },

  state: String,

  payload: {
    source: String,
    reportType: String,
    message: String,
    reportId: String,
    referenceResourceId: String,
    referenceResourceType: String,
  },

  created: Date,
});

module.exports = mongoose.models.Report || mongoose.model('Report', ReportSchema);
