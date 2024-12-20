import React, { useState } from 'react';
import axios from 'axios';

const CVEReport = () => {
  const [cveId, setCveId] = useState('');
  const [report, setReport] = useState(null);
  const [error, setError] = useState('');

  const baseURL = import.meta.env.VITE_API_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setReport(null);

    if (!cveId) {
      setError('CVE ID is required');
      return;
    }

    try {
      const response = await axios.post(`${baseURL}/cve`, { cveId });
      setReport(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Error fetching CVE data');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '36px', marginBottom: '10px' }}>
        CVE Intelligence Report
      </h1>
      <p style={{ textAlign: 'center', marginBottom: '20px', fontSize: '16px', color: '#555' }}>
        Enter a CVE ID to retrieve detailed vulnerability information, including metrics, weaknesses, and references.
      </p>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Enter CVE ID (e.g., CVE-2021-25419)"
          value={cveId}
          onChange={(e) => setCveId(e.target.value)}
          style={{
            padding: '10px',
            width: '70%',
            marginRight: '10px',
            borderRadius: '5px',
            border: '1px solid #ccc',
          }}
        />
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            backgroundColor: '#007BFF',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Get Report
        </button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {report && (
        <div style={{ textAlign: 'left' }}>
          <h2 style={{ fontWeight: 'bold', color: 'red' }}>CVE Details</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
            <thead>
              <tr style={{ backgroundColor: '#f2f2f2' }}>
                <th style={{ padding: '10px', border: '2px solid #ddd' }}>Attribute</th>
                <th style={{ padding: '10px', border: '2px solid #ddd' }}>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '10px', border: '2px solid #ddd' }}>CVE ID</td>
                <td style={{ padding: '10px', border: '2px solid #ddd' }}>
                  {report.vulnerabilities[0]?.cve.id || 'N/A'}
                </td>
              </tr>
              <tr>
                <td style={{ padding: '10px', border: '2px solid #ddd' }}>Published Date</td>
                <td style={{ padding: '10px', border: '2px solid #ddd' }}>
                  {report.vulnerabilities[0]?.cve.published || 'N/A'}
                </td>
              </tr>
              <tr>
                <td style={{ padding: '10px', border: '2px solid #ddd' }}>Last Modified</td>
                <td style={{ padding: '10px', border: '2px solid #ddd' }}>
                  {report.vulnerabilities[0]?.cve.lastModified || 'N/A'}
                </td>
              </tr>
              <tr>
                <td style={{ padding: '10px', border: '2px solid #ddd' }}>Status</td>
                <td style={{ padding: '10px', border: '2px solid #ddd' }}>
                  {report.vulnerabilities[0]?.cve.vulnStatus || 'N/A'}
                </td>
              </tr>
              <tr>
                <td style={{ padding: '10px', border: '2px solid #ddd' }}>Descriptions</td>
                <td style={{ padding: '10px', border: '2px solid #ddd' }}>
                  <ul>
                    {report.vulnerabilities[0]?.cve.descriptions.map((desc, index) => (
                      <li key={index}>
                        <strong>{desc.lang.toUpperCase()}:</strong> {desc.value}
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>

          <h3 style={{ fontWeight: 'bold', color: 'red' }}>Metrics</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
            <thead>
              <tr style={{ backgroundColor: '#f2f2f2' }}>
                <th style={{ padding: '10px', border: '2px solid #ddd' }}>Metric</th>
                <th style={{ padding: '10px', border: '2px solid #ddd' }}>Value</th>
              </tr>
            </thead>
            <tbody>
              {report.vulnerabilities[0]?.cve.metrics.cvssMetricV31 && (
                <>
                  <tr>
                    <td style={{ padding: '10px', border: '2px solid #ddd' }}>Version</td>
                    <td style={{ padding: '10px', border: '2px solid #ddd' }}>3.1</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '10px', border: '2px solid #ddd' }}>Vector String</td>
                    <td style={{ padding: '10px', border: '2px solid #ddd' }}>
                      {report.vulnerabilities[0]?.cve.metrics.cvssMetricV31[0].cvssData.vectorString}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ padding: '10px', border: '2px solid #ddd' }}>Base Score</td>
                    <td style={{ padding: '10px', border: '2px solid #ddd' }}>
                      {report.vulnerabilities[0]?.cve.metrics.cvssMetricV31[0].cvssData.baseScore}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ padding: '10px', border: '2px solid #ddd' }}>Severity</td>
                    <td style={{ padding: '10px', border: '2px solid #ddd' }}>
                      {report.vulnerabilities[0]?.cve.metrics.cvssMetricV31[0].cvssData.baseSeverity}
                    </td>
                  </tr>
                </>
              )}
            </tbody>
          </table>

          <h3 style={{ fontWeight: 'bold', color: 'red' }}>Weaknesses</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
            <thead>
              <tr style={{ backgroundColor: '#f2f2f2' }}>
                <th style={{ padding: '10px', border: '2px solid #ddd' }}>Source</th>
                <th style={{ padding: '10px', border: '2px solid #ddd' }}>Description</th>
              </tr>
            </thead>
            <tbody>
              {report.vulnerabilities[0]?.cve.weaknesses.map((weakness, index) => (
                <tr key={index}>
                  <td style={{ padding: '10px', border: '2px solid #ddd' }}>{weakness.source}</td>
                  <td style={{ padding: '10px', border: '2px solid #ddd' }}>
                    {weakness.description.map((desc) => desc.value).join(', ')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3 style={{ fontWeight: 'bold', color: 'red' }}>References</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f2f2f2' }}>
                <th style={{ padding: '10px', border: '2px solid #ddd' }}>Reference</th>
                <th style={{ padding: '10px', border: '2px solid #ddd' }}>Tags</th>
              </tr>
            </thead>
            <tbody>
              {report.vulnerabilities[0]?.cve.references.map((ref, index) => (
                <tr key={index}>
                  <td style={{ padding: '10px', border: '2px solid #ddd' }}>
                    <a href={ref.url} target="_blank" rel="noopener noreferrer">
                      {ref.url}
                    </a>
                  </td>
                  <td style={{ padding: '10px', border: '2px solid #ddd' }}>
                    {ref.tags?.join(', ') || 'N/A'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CVEReport;