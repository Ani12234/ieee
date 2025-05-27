// const QRData = require('../models/QRData');

// // Save QR scanned data
// exports.saveQRData = async (req, res) => {
//   try {
//     const { content, timestamp } = req.body;
//     const qrData = new QRData({
//       content,
//       timestamp: new Date(timestamp)
//     });
//     await qrData.save();
//     res.status(201).json({ message: 'QR data saved successfully', data: qrData });
//   } catch (error) {
//     res.status(500).json({ message: 'Error saving QR data', error: error.message });
//   }
// };

// // Get all QR scanned data
// exports.getAllQRData = async (req, res) => {
//   try {
//     const qrData = await QRData.find().sort({ timestamp: -1 });
//     res.status(200).json(qrData);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching QR data', error: error.message });
//   }
// }; 