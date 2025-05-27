// const mongoose = require('mongoose');

// const excelFileSchema = new mongoose.Schema({
//   filename: {
//     type: String,
//     required: true,
//   },
//   data: {
//     type: Buffer,
//     required: true,
//   },
//   contentType: {
//     type: String,
//     required: true,
//     default: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
//   qrDataCount: {
//     type: Number,
//     required: true,
//   }
// });

// const ExcelFile = mongoose.model('ExcelFile', excelFileSchema);

// module.exports = ExcelFile; 