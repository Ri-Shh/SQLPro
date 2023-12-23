import React, {useState} from "react";
import styles from './Task.module.css';
import { SettingFilled } from '@ant-design/icons';
import { CSVLink } from "react-csv";
import { jsPDF } from "jspdf";
import FileSaver from 'file-saver';
import XLSX from 'sheetjs-style';

function Task(props) {
    const [isFileDropdownOpen, setFileDropdownOpen] = useState(false);
    const [isRunDropdownOpen, setRunDropdownOpen] = useState(false);
    const [isExportDropdownOpen, setExportDropdownOpen] = useState(false);
    const [isImportModalOpen, setImportModalOpen] = useState(false);
    let text;

    const toggleFileDropdown = () => {
        setFileDropdownOpen(!isFileDropdownOpen);
        setExportDropdownOpen(false);
        setRunDropdownOpen(false);
    };
    
    const toggleRunDropdown = () => {
        setRunDropdownOpen(!isRunDropdownOpen);
        setExportDropdownOpen(false);
        setFileDropdownOpen(false);
    };
    
    const toggleExportDropdown = () => {
        setExportDropdownOpen(!isExportDropdownOpen);
        setFileDropdownOpen(false);
        setRunDropdownOpen(false);
    };

    const toggleImportModal = () => {
        setImportModalOpen(!isImportModalOpen);
    };
    
    const handleClick = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = async (e) => {
            text = (e.target.result);
            // console.log(text);
        }
        reader.readAsText(file);
    }
    
    const handleSubmit = () => {
        props.setQuery(text);
        setImportModalOpen(!isImportModalOpen);
    }

    const handleFileSaveAs = () => {
        console.log(props.query);
        const file = new File([props.query], "query.sql", {type: "text/plain;charset=utf-8"});
        FileSaver.saveAs(file);
    }
    const handleFileSave = () => {
        const file = new File([props.query], "query.sql", {type: "text/plain;charset=utf-8"});
        FileSaver.save(file);
    }

    const handlePDF = () => {
        // Default export is a4 paper, portrait, using millimeters for units
        const doc = new jsPDF();

        doc.text(JSON.stringify(props.csvData), 10, 10);
        doc.save("react-pdf.pdf");
    }

    const handleExcel = async () => {
        const fileType = 'application/vnd.openxmlformats.officedocument.spreadsheetml.sheet;charset=UTF-8';
        const fileExt = '.xlsx';
        const ws = XLSX.utils.json_to_sheet(props.csvData);
        const wb = { Sheets: {'data': ws}, SheetNames: ['data']};
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array'});
        const data = new Blob([excelBuffer], {type: fileType});
        FileSaver.saveAs(data, 'react-excel' + fileExt);
    }

    return (
        <div className={styles.taskflex}>
            <div className={styles.taskleft}>
                <div className={styles.taskOption} onClick={toggleFileDropdown}>
                    File
                    {isFileDropdownOpen && (
                        <div className={styles.dropdownContent}>
                            <div>New File</div>
                            {/* <div onClick={handleFileSave}>Save</div> */}
                            <div onClick={handleFileSaveAs}>Save As...</div>
                        </div>
                    )}
                </div>
                <div className={styles.taskOption} onClick={toggleImportModal}>
                    Open file
                </div>
                <div className={styles.taskOption} onClick={toggleRunDropdown}>
                    Run
                    {isRunDropdownOpen && (
                        <div className={styles.dropdownContent}>
                            <div onClick={() => props.setRun(1)}>Small Query</div>
                            <div onClick={() => props.setRun(2)}>Medium Query</div>
                            <div onClick={() => props.setRun(3)}>Large Query</div>
                        </div>
                    )}
                </div>
                <div className={styles.taskOption} onClick={toggleExportDropdown}>
                    Export
                    {isExportDropdownOpen && (
                        <div className={styles.dropdownContent}>
                            <div onClick={handlePDF}>as PDF</div>
                            <CSVLink data={props.csvData}><div>as CSV</div></CSVLink>
                            <div onClick={handleExcel}>as Excel</div>
                        </div>
                    )}
                </div>
            </div>
            <div className={styles.taskright}>
                <div className={styles.taskOption}>Sign in</div>
                <SettingFilled style={{ fontSize: '16px', paddingTop: "0px"}}/>
            </div>
            
            {isImportModalOpen && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <div>
                            <label htmlFor="fileInput">Choose a file:</label>
                            <input type="file" id="fileInput" onChange={handleClick}/>
                        </div>
                        <div>
                            <button onClick={toggleImportModal}>Close</button>
                            <br></br>
                            <br></br>
                            <button onClick={handleSubmit}>OK</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}


export default Task;

