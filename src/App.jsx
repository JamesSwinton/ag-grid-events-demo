import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './App.module.scss';
import Form from './components/form/Form';
import DataGrid from './components/DataGrid';
import MapChart from './components/MapChart/MapChart';
import AgeIncomeChart from './components/AgeIncomeChart/AgeIncomeChart';
import agChartsLogo from './assets/ag-charts-logo.png';
import agGridLogo from './assets/ag-grid-logo.png';
import { defaultData } from './data';

function App() {
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const [data, setData] = useState(() => {
    const savedData = localStorage.getItem('appData');
    return savedData ? JSON.parse(savedData) : defaultData;
  });

  const handleFormData = (newData) => {
    setData((prevData) => {
      const updatedData = [...prevData, newData];
      localStorage.setItem('appData', JSON.stringify(updatedData)); // Persist new data immediately
      return updatedData;
    });
  };

  const clearData = () => {
    localStorage.removeItem('appData');
    setData([]); // Clear the state to reset the data
  };

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === '/clear') {
      clearData();
      navigate('/'); // Navigate back to root immediately after clearing
    }
  }, [location, navigate]);

  return (
    <div className={styles.app}>
      {showModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <div className={styles.formContainer}>
              <Form onSubmit={handleFormData} toggleModal={toggleModal} />
            </div>
          </div>
        </div>
      )}
      {/* Includes section describing the demo */}
      <div className={styles.gridGrid}>
        <div className={styles.gridItem1}>
          <img src={agGridLogo} className={styles.logo} alt="ag-Grid Logo" />
          <img src={agChartsLogo} className={styles.logo} alt="ag-Grid Logo" />
          <div className={styles.textContainer}>
            <p>
              Welcome to our AG Grid and AG Charts demo - add your data with the
              buttons below, and then browse the info from other attendees using
              AG Grid and AG Charts
            </p>
            <div className={styles.buttonContainer}>
              <button className={styles.button} onClick={() => toggleModal()}>
                Add Your Data
              </button>
              <button
                className={styles.secondaryButton}
                onClick={() => toggleModal()}
              >
                View Source Code
              </button>
            </div>
          </div>
        </div>
        <div className={styles.gridItem2}>
          <DataGrid rowData={data} toggleModal={toggleModal} />
        </div>
      </div>
      {/* <img src={agGridLogo} className={styles.logo} alt="ag-Grid Logo" />
      <img src={agChartsLogo} className={styles.logo} alt="ag-Grid Logo" />
      <div className={styles.gridContainer}>
        <DataGrid rowData={data} toggleModal={toggleModal} />
      </div> */}
      <div className={styles.chartGrid}>
        <div className={styles.chartItem}>
          <AgeIncomeChart data={data} />
        </div>
        <div className={styles.chartItem}>
          <MapChart data={data} />
        </div>
        {/* <div className={styles.chartItem}>
          <IncomeCompanySizeChart />
        </div> */}
      </div>
    </div>
  );
}

export default App;
