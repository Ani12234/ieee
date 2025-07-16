const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRouter = require("./routes/auth-routes");
// const qrRoutes = require("./routes/qrRoutes");
const eventRoutes = require("./routes/eventRoutes");
const meetingRoutes = require("./routes/meetingRoutes");
// const QRData = require("./models/QRData");
// const ExcelFile = require("./models/ExcelFile");

require("dotenv").config(); // Load environment variables from .env file

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((error) => {
    console.error("MongoDB connection error:", {
      message: error.message,
      stack: error.stack,
      time: new Date().toISOString()
    });
    // Log the MongoDB URI without exposing credentials
    const redactedUri = process.env.MONGO_URI 
      ? process.env.MONGO_URI.replace(/mongodb(\+srv)?:\/\/([^:]+):([^@]+)@/, 'mongodb$1://$2:***@')
      : 'Not provided';
    console.error("Connection attempted with URI pattern:", redactedUri);
  });
const PORT = process.env.PORT || 5000;

const app = express();
// Enhanced CORS configuration for cross-origin authentication
const corsOptions = {
  origin: function(origin, callback) {
    const allowedOrigins = [
      "http://localhost:5173",
      "https://ieee-beta-five.vercel.app",
      "https://ieee-bkw9.vercel.app"
    ];
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      return callback(null, true);
    }
    console.log('CORS blocked origin:', origin);
    return callback(null, false);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization', 'Cache-Control'],
  exposedHeaders: ['Content-Length', 'X-Foo', 'X-Bar'],
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
app.get("/", (req, res) => {
  res.json("hello");
});

app.use(cookieParser());
// Increase payload size limit for file uploads (50MB)
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
// Support both URL patterns for backward compatibility
app.use("/api/auth", authRouter);
app.use("/auth", authRouter); // Legacy route support for backward compatibility
// app.use("/operate/qr-data", qrRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/meetings", meetingRoutes);

// QR Data and Excel routes
// app.post("/operate/qr-data", async (req, res) => {
//   try {
//     const { qrData, excelFile } = req.body;
//     console.log("Received QR data count:", qrData.length);

//     // Validate the QR data
//     if (!Array.isArray(qrData)) {
//       console.error("Invalid data format: not an array");
//       return res.status(400).json({ error: "Data must be an array" });
//     }

//     // Validate each QR entry
//     for (const entry of qrData) {
//       if (!entry.name || !entry.membershipId) {
//         console.error("Invalid entry format:", entry);
//         return res.status(400).json({ 
//           error: "Each entry must have name and membershipId",
//           invalidEntry: entry 
//         });
//       }
//     }

//     // Process QR data entries
//     const qrResults = await Promise.all(
//       qrData.map(async (entry) => {
//         try {
//           // Check if exact same entry exists within the last minute
//           const oneMinuteAgo = new Date(Date.now() - 60000);
//           const existingEntry = await QRData.findOne({
//             membershipId: entry.membershipId,
//             name: entry.name,
//             timestamp: {
//               $gte: oneMinuteAgo
//             }
//           });

//           if (existingEntry) {
//             console.log(`Duplicate scan detected for membership ID: ${entry.membershipId} within last minute`);
//             return {
//               success: false,
//               message: `Duplicate scan detected for membership ID: ${entry.membershipId} within last minute`,
//               data: entry
//             };
//           }

//           // Create new entry with all data
//           const newEntry = new QRData({
//             name: entry.name,
//             membershipId: entry.membershipId,
//             timestamp: new Date(entry.timestamp),
//             rawData: entry.rawData || null,
//             scanType: entry.scanType || null,
//             deviceInfo: entry.deviceInfo || null,
//             location: entry.location || null,
//             additionalData: entry.additionalData || {}
//           });

//           await newEntry.save();
//           console.log(`Successfully saved entry for membership ID: ${entry.membershipId}`);
          
//           return {
//             success: true,
//             message: `Successfully saved entry for membership ID: ${entry.membershipId}`,
//             data: newEntry
//           };
//         } catch (err) {
//           console.error(`Error processing entry for membership ID ${entry.membershipId}:`, err);
//           return {
//             success: false,
//             message: `Error processing entry: ${err.message}`,
//             data: entry
//           };
//         }
//       })
//     );

//     // Save Excel file if provided
//     let excelResult = null;
//     if (excelFile) {
//       try {
//         const newExcelFile = new ExcelFile({
//           filename: `qr_scanned_data_${new Date().toISOString().split('T')[0]}.xlsx`,
//           data: Buffer.from(excelFile.data, 'base64'),
//           contentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
//           qrDataCount: qrData.length
//         });
//         await newExcelFile.save();
//         excelResult = {
//           success: true,
//           message: "Excel file saved successfully",
//           filename: newExcelFile.filename
//         };
//       } catch (err) {
//         console.error("Error saving Excel file:", err);
//         excelResult = {
//           success: false,
//           message: `Error saving Excel file: ${err.message}`
//         };
//       }
//     }

//     // Count successful and failed entries
//     const successful = qrResults.filter(r => r.success).length;
//     const failed = qrResults.filter(r => !r.success).length;

//     res.json({
//       message: `Processed ${qrResults.length} entries (${successful} successful, ${failed} failed)`,
//       results: qrResults,
//       excelResult
//     });
//   } catch (err) {
//     console.error("Error processing data:", err);
//     res.status(500).json({
//       error: "Error processing data",
//       details: err.message,
//       stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
//     });
//   }
// });

app.listen(PORT, () => console.log(`Server is now running on port ${PORT}`));
