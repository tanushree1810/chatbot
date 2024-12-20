import React, { useState } from 'react';
import axios from 'axios';
import { jsPDF } from 'jspdf';

const VirusTotalReport = () => {
  const [type, setType] = useState('file'); // 'file', 'url', or 'ip'
  const [input, setInput] = useState('');
  const [report, setReport] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setReport(null);

    if (!input) {
      setError(`${type.toUpperCase()} is required`);
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/virustotal/${type}`,
        { [type === 'file' ? 'hash' : type]: input } // Dynamic key based on type
      );
      setReport(response.data);
    } catch (err) {
      setError(err.response?.data?.error || `Error fetching VirusTotal ${type} data`);
    }
  };

  // Function to download report as PDF
  const handleDownloadPDF = () => {
    if (!report) {
      alert('No report available to download.');
      return;
    }

    const doc = new jsPDF();

    // Title
    doc.setFontSize(16);
    doc.text('VirusTotal Threat Intelligence Report', 10, 10);

    // Add metadata
    doc.setFontSize(12);
    let yOffset = 20;
    Object.entries(report).forEach(([key, value]) => {
      const content =
        typeof value === 'object' ? JSON.stringify(value, null, 2) : value;

      const lines = doc.splitTextToSize(`${key}: ${content}`, 180); // Wrap text to fit within the page width
      lines.forEach((line) => {
        doc.text(line, 10, yOffset);
        yOffset += 10;

        if (yOffset > 280) {
          doc.addPage();
          yOffset = 10;
        }
      });
    });

    // Save the PDF
    doc.save('VirusTotal_Report.pdf');
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '20px',
      }}
    >
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '10px' }}>
        VirusTotal Threat Intelligence Report
      </h1>
      <p style={{ marginBottom: '20px' }}>
        Fetch detailed VirusTotal reports for files, URLs, or IP addresses. Select the type and
        input the required information to get started.
      </p>

      <form onSubmit={handleSubmit} style={{ margin: '20px 0' }}>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          style={{
            marginRight: '10px',
            padding: '10px',
            borderRadius: '5px',
            border: '1px solid #ccc',
          }}
        >
          <option value="file">File (Hash)</option>
          <option value="url">URL</option>
          <option value="ip">IP Address</option>
        </select>

        <input
          type="text"
          placeholder={`Enter ${type === 'file' ? 'hash' : type}`}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{
            marginRight: '10px',
            padding: '10px',
            width: '250px',
            borderRadius: '5px',
            border: '1px solid #ccc',
          }}
        />

        <button
          type="submit"
          style={{
            padding: '10px 20px',
            borderRadius: '5px',
            backgroundColor: '#007BFF',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Fetch Report
        </button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {report && (
        <button
          onClick={handleDownloadPDF}
          style={{
            marginTop: '20px',
            padding: '10px 20px',
            borderRadius: '5px',
            backgroundColor: '#28A745',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Download Report as PDF
        </button>
      )}
    </div>
  );
};

export default VirusTotalReport;
