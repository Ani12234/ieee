import React, { useState, useEffect, lazy, Suspense } from "react";
import axios from 'axios';

const QrScanner = lazy(() => import("react-qr-scanner"));
const CSVLink = lazy(() => import("react-csv").then(module => ({ default: module.CSVLink })));

const QRScanner = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [debugMessage, setDebugMessage] = useState("Initializing scanner...");
  const [isMobile, setIsMobile] = useState(false);
  const [scannerActive, setScannerActive] = useState(true);
  const [membersIds, setMembersIds] = useState(new Set());
  const [isServerConnected, setIsServerConnected] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!isSecureContext()) {
      setError("Camera access requires a secure context. Please use HTTPS or localhost.");
      setDebugMessage("Insecure context detected");
      return;
    }

    const checkMobile = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      return /iphone|ipad|ipod|android|blackberry|windows phone/g.test(userAgent);
    };
    setIsMobile(checkMobile());

    // Check server connection
    axios.get('http://localhost:5000/')
      .then(() => {
        setIsServerConnected(true);
        setDebugMessage("Scanner ready and server connected");
      })
      .catch(() => {
        setIsServerConnected(false);
        setError("Server connection failed. Please check if the server is running.");
        setDebugMessage("Server connection failed");
      });
  }, []);

  // Reset scanner every second to allow continuous scanning
  useEffect(() => {
    const interval = setInterval(() => {
      setScannerActive(false);
      setTimeout(() => setScannerActive(true), 100);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const [videoDevices, setVideoDevices] = useState([]);

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      const videoInputDevices = devices.filter(device => device.kind === "videoinput");
      setVideoDevices(videoInputDevices);
    });
  }, []);

  const rearCamera = videoDevices.find(device => device.label.toLowerCase().includes("back"))?.deviceId;

  const constraints = {
    video: rearCamera ? { deviceId: { exact: rearCamera } } : { facingMode: "environment" },
  };

  const handleScan = async (scannedData) => {
    if (!scannedData?.text) return;

    setDebugMessage(`Scanned data detected: ${scannedData.text}`);
    const parsedData = parseVCARD(scannedData.text);

    if (parsedData && parsedData.membershipId) {
      if (!membersIds.has(parsedData.membershipId)) {
        const completeData = {
          ...parsedData,
          rawData: scannedData.text,
          scanType: scannedData.type || 'vcard',
          deviceInfo: {
            isMobile,
            userAgent: navigator.userAgent,
            platform: navigator.platform
          },
          timestamp: new Date().toISOString(),
          additionalData: {
            scannerActive,
            videoDevices: videoDevices.length
          }
        };

        setData((prevData) => [...prevData, completeData]);
        setMembersIds((prevIds) => new Set(prevIds).add(parsedData.membershipId));
        setError("");
        setDebugMessage("Data added successfully");
      } else {
        setDebugMessage("Duplicate membership ID detected");
      }
    } else {
      setError("Invalid QR code format.");
      setDebugMessage("Invalid QR code format detected");
    }
  };

  const handleError = (err) => {
    console.error("Scanner error:", err);
    if (err.name === "NotAllowedError") {
      setError(
        "Camera access denied. Please:\n" +
        "1. Click the camera icon in your browser's address bar\n" +
        "2. Allow camera access for this site\n" +
        "3. Refresh the page"
      );
    } else {
      setError(
        isMobile
          ? "An error occurred while accessing the camera. Please grant camera permissions and use a supported browser (Chrome, Safari, Firefox)."
          : "An error occurred while accessing the camera. Please check camera permissions."
      );
    }
    setDebugMessage("Failed to initialize scanner. Please check camera permissions.");
  };

  const parseVCARD = (scannedData) => {
    try {
      if (scannedData.includes("BEGIN:VCARD")) {
        const nicknameMatch = scannedData.match(/NICKNAME:([^ ]+)/);
        const membershipIdMatch = scannedData.match(/Member#: (\d+)/);

        if (nicknameMatch && membershipIdMatch) {
          return {
            name: nicknameMatch[1].trim(),
            membershipId: membershipIdMatch[1].trim(),
            timestamp: new Date().toISOString()
          };
        }
      }

      if (scannedData.includes("Member Name:")) {
        const nameMatch = scannedData.match(/Member Name:([^,]+)/);
        const memberNumberMatch = scannedData.match(/Member Number:([^,]+)/);

        if (nameMatch && memberNumberMatch) {
          return {
            name: nameMatch[1].trim(),
            membershipId: memberNumberMatch[1].trim(),
            timestamp: new Date().toISOString()
          };
        }
      }
    } catch (e) {
      console.error("Error parsing scanned data:", e);
    }

    return null;
  };

  const generateExcel = async () => {
    if (data.length === 0) {
      setError("No data to export");
      return;
    }

    const XLSX = await import('xlsx');
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Attendance");
    XLSX.writeFile(wb, "Attendance.xlsx");
    setDebugMessage("Excel file generated successfully");
  };

  const saveToDatabase = async () => {
    if (data.length === 0) {
      setError("No data to save");
      return;
    }

    if (!isServerConnected) {
      setError("Server is not connected");
      return;
    }

    setIsSaving(true);
    setDebugMessage("Saving data to database...");

    try {
      // Generate Excel file
      const ws = XLSX.utils.json_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'QR Scanned Data');
      
      // Convert Excel file to base64 using browser-compatible method
      const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
      const excelBase64 = btoa(String.fromCharCode(...new Uint8Array(excelBuffer)));
      
      // Prepare data to send
      const requestData = {
        qrData: data,
        excelFile: {
          data: excelBase64
        }
      };

      // Log the data being sent
      console.log("Sending data to server:", { qrDataCount: data.length });
      
      // Save both QR data and Excel file to MongoDB
      const response = await axios.post('http://localhost:5000/operate/qr-data', requestData);
      
      // Check the results
      const { results, message, excelResult } = response.data;
      const successful = results.filter(r => r.success).length;
      const failed = results.filter(r => !r.success).length;

      let statusMessage = message;
      if (excelResult) {
        statusMessage += `\nExcel file: ${excelResult.message}`;
      }

      if (failed > 0) {
        const failedEntries = results.filter(r => !r.success).map(r => r.message).join('\n');
        setError(`Some entries failed to save:\n${failedEntries}\n${statusMessage}`);
        setDebugMessage(statusMessage);
      } else {
        setError("");
        setDebugMessage(statusMessage);
      }
    } catch (err) {
      console.error("Error saving to MongoDB:", err);
      const errorMessage = err.response?.data?.error 
        ? `${err.response.data.error}\n${err.response.data.details || ''}`
        : err.message || "Error saving data to database. Please try again.";
      setError(errorMessage);
      setDebugMessage("Failed to save data");
    } finally {
      setIsSaving(false);
    }
  };

  const styles = {
    container: {
      minHeight: "100vh",
      backgroundColor: "#f9fafb",
      padding: "2rem",
    },
    card: {
      maxWidth: "900px",
      margin: "0 auto",
      backgroundColor: "white",
      borderRadius: "8px",
      padding: "1.5rem",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
    title: {
      fontSize: "1.875rem",
      fontWeight: "bold",
      textAlign: "center",
      color: "#059669",
      marginBottom: "1.5rem",
    },
    deviceInfo: {
      textAlign: "center",
      color: "#4b5563",
      marginBottom: "1rem",
      fontSize: "0.875rem",
    },
    scannerContainer: {
      position: "relative",
      width: "320px",
      height: "240px",
      margin: "0 auto",
      overflow: "hidden",
      borderRadius: "8px",
      border: "2px solid #059669",
    },
    scanner: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      willReadFrequently: true,
    },
    errorMessage: {
      marginTop: "1rem",
      padding: "1rem",
      backgroundColor: "#fee2e2",
      color: "#dc2626",
      borderRadius: "6px",
      textAlign: "center",
    },
    debugMessage: {
      marginTop: "1rem",
      textAlign: "center",
      color: "#4b5563",
    },
    dataSection: {
      marginTop: "2rem",
    },
    sectionTitle: {
      fontSize: "1.25rem",
      fontWeight: "600",
      color: "#1f2937",
      marginBottom: "1rem",
    },
    counter: {
      fontSize: "1.125rem",
      fontWeight: "500",
      color: "#374151",
      marginBottom: "1rem",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      marginTop: "1rem",
    },
    tableHeader: {
      backgroundColor: "#059669",
      color: "white",
    },
    th: {
      padding: "0.75rem",
      textAlign: "left",
    },
    td: {
      padding: "0.75rem",
      borderBottom: "1px solid #e5e7eb",
      color: "black",
    },
    noData: {
      textAlign: "center",
      color: "#6b7280",
      marginTop: "1rem",
    },
    buttonContainer: {
      textAlign: "center",
      marginTop: "1.5rem",
      display: "flex",
      gap: "1rem",
      justifyContent: "center",
    },
    button: {
      display: "inline-block",
      backgroundColor: "#059669",
      color: "white",
      padding: "0.5rem 1rem",
      borderRadius: "6px",
      textDecoration: "none",
      cursor: "pointer",
      transition: "background-color 0.2s",
      border: "none",
    },
    buttonDisabled: {
      backgroundColor: "#9CA3AF",
      cursor: "not-allowed",
    },
  };

  const headers = [
    { label: "Name", key: "name" },
    { label: "Membership ID", key: "membershipId" },
    { label: "Timestamp", key: "timestamp" },
  ];

  // Add a function to check if we're in a secure context
  const isSecureContext = () => {
    return window.isSecureContext || window.location.protocol === 'https:' || window.location.hostname === 'localhost';
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>QR Code Scanner</h1>
        <p style={styles.deviceInfo}>
          {isMobile ? "Using rear camera (mobile device detected)" : "Using front camera (desktop device detected)"}
        </p>

        <div style={styles.scannerContainer}>
          {scannerActive && (
            <Suspense fallback={<div style={{color: 'white'}}>Loading Scanner...</div>}>
              <QrScanner
                delay={300}
                style={styles.scanner}
                onError={handleError}
                onScan={handleScan}
                constraints={constraints}
              />
            </Suspense>
          )}
        </div>

        {error && <div style={styles.errorMessage}>{error}</div>}
        <p style={styles.debugMessage}>{debugMessage}</p>

        <div style={styles.dataSection}>
          <h2 style={styles.sectionTitle}>Scanned Data</h2>
          <p style={styles.counter}>Total QR Codes Scanned: {data.length}</p>

          {data.length > 0 ? (
            <table style={styles.table}>
              <thead style={styles.tableHeader}>
                <tr>
                  <th style={styles.th}>Name</th>
                  <th style={styles.th}>Membership ID</th>
                  <th style={styles.th}>Time</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index}>
                    <td style={styles.td}>{item.name}</td>
                    <td style={styles.td}>{item.membershipId.toString()}</td>
                    <td style={styles.td}>{new Date(item.timestamp).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p style={styles.noData}>No data scanned yet.</p>
          )}

          {data.length > 0 && (
            <div style={styles.buttonContainer}>
              <button
                onClick={generateExcel}
                style={styles.button}
              >
                Generate Excel
              </button>
              <Suspense fallback={<button style={styles.button} disabled>Loading...</button>}>
                <CSVLink 
                  data={data} 
                  headers={headers} 
                  filename={"Attendance.csv"} 
                  style={styles.button}
                >
                  Download CSV
                </CSVLink>
              </Suspense>
              <button
                onClick={saveToDatabase}
                style={{
                  ...styles.button,
                  ...(isSaving ? styles.buttonDisabled : {})
                }}
                disabled={isSaving || !isServerConnected}
              >
                {isSaving ? "Saving..." : "Save to Database"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QRScanner;