import React from "react";
import "./ReportsLayout.css";

const ReportsLayout = () => {
  const reportsData = [
    { id: 1, doctor: "Dr. John Doe", specialty: "Cardiology" },
    { id: 2, doctor: "Dr. Jane Smith", specialty: "Dermatology" },
  ];

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
            <tr key={report.id}>
              <td>{index + 1}</td>
              <td>{report.doctor}</td>
              <td>{report.specialty}</td>
              <td>
                <a href="/patient_report.pdf" target="_blank" rel="noopener noreferrer">
                  <button className="view-btn">View Report</button>
                </a>
              </td>
              <td>
                <a href="/patient_report.pdf" download="patient_report.pdf">
                  <button className="download-btn">Download Report</button>
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportsLayout;
