// const mongoose = require('mongoose');

// const qrDataSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   membershipId: {
//     type: String,
//     required: true,
//   },
//   timestamp: {
//     type: Date,
//     required: true,
//     default: Date.now,
//   },
//   rawData: {
//     type: String,
//     default: null,
//   },
//   scanType: {
//     type: String,
//     default: null,
//   },
//   deviceInfo: {
//     type: Object,
//     default: null,
//   },
//   location: {
//     type: Object,
//     default: null,
//   },
//   additionalData: {
//     type: Object,
//     default: {},
//   }
// });

// // Create a compound index for membershipId, name, and timestamp
// qrDataSchema.index({ membershipId: 1, name: 1, timestamp: 1 });

// const QRData = mongoose.model('QRData', qrDataSchema);

// module.exports = QRData; 