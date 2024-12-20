import React, { useState } from 'react';
import axios from 'axios';

const ShodanReport = () => {
  const [ip, setIp] = useState('');
  const [report, setReport] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    setReport(null); // Clear previous report

    if (!ip) {
      setError('IP address is required');
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/shodan`,
        { ip }
      );
      setReport(response.data); // Save the fetched data
    } catch (err) {
      setError(err.response?.data?.error || 'Error fetching Shodan data');
    }
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
        Shodan Threat Intelligence Report
      </h1>
      <p style={{ marginBottom: '20px' }}>
        This tool allows you to fetch detailed information about an IP address
        using the Shodan API. Enter an IP address to retrieve data such as
        organization, ISP, open ports, and more.
      </p>

      <form onSubmit={handleSubmit} style={{ margin: '20px 0' }}>
        <input
          type="text"
          placeholder="Enter IP address"
          value={ip}
          onChange={(e) => setIp(e.target.value)}
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
          Get Report
        </button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {report && (
        <table
          style={{
            marginTop: '20px',
            width: '60%', // Adjust the width
            marginLeft: 'auto', // Center horizontally
            marginRight: 'auto', // Center horizontally
            borderCollapse: 'collapse',
            border: '2px solid #333',
          }}
        >
          <thead>
            <tr>
              <th
                style={{
                  padding: '10px',
                  backgroundColor: '#f4f4f4',
                  border: '1px solid #333',
                }}
              >
                Field
              </th>
              <th
                style={{
                  padding: '10px',
                  backgroundColor: '#f4f4f4',
                  border: '1px solid #333',
                }}
              >
                Value
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '10px', border: '1px solid #333' }}>IP</td>
              <td style={{ padding: '10px', border: '1px solid #333' }}>
                {report.ip_str}
              </td>
            </tr>
            <tr>
              <td style={{ padding: '10px', border: '1px solid #333' }}>
                Organization
              </td>
              <td style={{ padding: '10px', border: '1px solid #333' }}>
                {report.org || 'N/A'}
              </td>
            </tr>
            <tr>
              <td style={{ padding: '10px', border: '1px solid #333' }}>ISP</td>
              <td style={{ padding: '10px', border: '1px solid #333' }}>
                {report.isp || 'N/A'}
              </td>
            </tr>
            <tr>
              <td style={{ padding: '10px', border: '1px solid #333' }}>
                Open Ports
              </td>
              <td style={{ padding: '10px', border: '1px solid #333' }}>
                {report.ports?.join(', ') || 'None'}
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ShodanReport;
