import React, { useState } from "react";
import "./ReportsLayout.css";

const ReportsLayout = () => {
  const [selectedReport, setSelectedReport] = useState(null);

  // Reports data
  const reportsData = [
    { id: 1, doctor: "Dr. John Doe", specialty: "Cardiology", reportAvailable: true },
    { id: 2, doctor: "Dr. Jane Smith", specialty: "Dermatology", reportAvailable: true },
  ];

  // Open report in new tab
  const openReportInNewTab = () => {
    const reportUrl = "/patient_report.pdf"; // Ensure this file exists
    window.open(reportUrl, "_blank");
  };

  // Download report
  const downloadReport = () => {
    const reportUrl = "/patient_report.pdf"; // Ensure this file exists
    const link = document.createElement("a");
    link.href = reportUrl;
    link.download = "patient_report.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="reports-layout">
      <h2 className="reports-title">Reports</h2>

      {/* Reports Table */}
      <table className="reports-table">
        <thead>
          <tr>
            <th>Serial Number</th>
            <th>Doctor Name</th>
            <th>Doctor Speciality</th>
            <th>View Report</th>
            <th>Download Report</th>
          </tr>
        </thead>
        <tbody>
          {reportsData.map((report, index) => (
            <tr key={report.id} className={selectedReport?.id === report.id ? "selected" : ""}>
              <td>{index + 1}</td>
              <td>{report.doctor}</td>
              <td>{report.specialty}</td>
              <td>
                <button className="view-btn" onClick={openReportInNewTab}>
                  View Report
                </button>
              </td>
              <td>
                <button className="download-btn" onClick={downloadReport}>
                  Download Report
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportsLayout;
