import React from "react";
import styles from './CSVDataTable.module.css';

const CSVDataTable = ({ data }) => {
  const headers = data.length > 0 ? Object.keys(data[0]) : [];

  return (
    <>
      {data.length === 0 ? (
        <p>No data available.</p>
      ) : (
        <table className={styles.tableStyle}>
          <thead>
            <tr>
              {headers.map((header, index) => (
                <th key={index} className={styles.tableHeaderStyle}>
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                {headers.map((header, columnIndex) => (
                  <td key={columnIndex} className={styles.tableCellStyle}>
                    {row[header]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};


export default CSVDataTable;