import React, { useState } from "react";
import * as XLSX from "xlsx";
import "./ImportFile.css";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const ImportFile = () => {
  const [excelFile, setExcelFile] = useState(null);
  const [excelData, setExcelData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10); // Set the number of rows per page
  const [editRowIndex, setEditRowIndex] = useState(null);
  const [editedRowData, setEditedRowData] = useState([]);

  const handleFileChange = (event) => {
    setExcelFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (excelFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        setExcelData(jsonData);
        setCurrentPage(1); // Reset to the first page whenever a new file is uploaded
      };
      reader.readAsArrayBuffer(excelFile);
    }
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const getPaginatedData = () => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return excelData.slice(startIndex, endIndex);
  };

  const handleEditClick = (rowIndex) => {
    setEditRowIndex(rowIndex);
    setEditedRowData([...excelData[rowIndex]]);
  };

  const handleDeleteClick = (rowIndex) => {
    const updatedData = excelData.filter((_, index) => index !== rowIndex);
    setExcelData(updatedData);
    setEditRowIndex(null);
  };

  const handleSaveEdit = () => {
    const updatedData = [...excelData];
    updatedData[editRowIndex] = editedRowData;
    setExcelData(updatedData);
    setEditRowIndex(null);
  };

  const handleInputChange = (event, cellIndex) => {
    const { value } = event.target;
    const updatedRowData = [...editedRowData];
    updatedRowData[cellIndex] = value;
    setEditedRowData(updatedRowData);
  };

  return (
    <div className="import-file-container">
      <div className="navbar">
        <div className="navbar-left">
          <h2 className="navbar-title">NOTE: IMPORT EXCEL FILES ONLY</h2>
          <form className="import-file-form" onSubmit={handleSubmit}>
            <input 
              type="file" 
              accept=".xls,.xlsx" 
              onChange={handleFileChange} 
              className="import-file-input" 
            />
            <button type="submit" className="import-file-button">Upload</button>
          </form>
        </div>
      </div>
      <div className="table-container" style={{ marginTop: '60px' }}>
        {excelData.length > 0 && (
          <>
            <table className="excel-table">
              <tbody>
                {getPaginatedData().map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex}>
                        {editRowIndex === rowIndex ? (
                          <input
                            type="text"
                            value={editedRowData[cellIndex]}
                            onChange={(e) => handleInputChange(e, cellIndex)}
                            className="edit-input"
                          />
                        ) : (
                          cell
                        )}
                      </td>
                    ))}
                    <td>
                      {editRowIndex === rowIndex ? (
                        <>
                          <button onClick={handleSaveEdit} className="save-button">Save</button>
                          <button onClick={() => setEditRowIndex(null)} className="cancel-button">Cancel</button>
                        </>
                      ) : (
                        <>
                          <button onClick={() => handleEditClick(rowIndex)} className="edit-button">Edit</button>
                          <button onClick={() => handleDeleteClick(rowIndex)} className="delete-button">Delete</button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Stack spacing={2} className="pagination-container" style={{ marginTop: '16px', display: 'flex', justifyContent: 'center' }}>
              <Pagination 
                count={Math.ceil(excelData.length / rowsPerPage)} 
                page={currentPage} 
                onChange={handlePageChange} 
                shape="rounded" 
                variant="outlined" 
              />
            </Stack>
          </>
        )}
      </div>
    </div>
  );
};

export default ImportFile;
