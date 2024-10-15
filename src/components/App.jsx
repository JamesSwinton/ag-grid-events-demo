import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './App.module.scss';
import Form from './form/Form';
import DataGrid from './DataGrid/DataGrid';
import MapChart from './MapChart/MapChart';
import AgeIncomeChart from './AgeIncomeChart/AgeIncomeChart';
import agChartsLogo from '../assets/ag-charts-logo.png';
import agGridLogo from '../assets/ag-grid-logo.png';
import { defaultData } from '../data/defaultData';

function App() {
  const location = useLocation();
  const navigate = useNavigate();
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

  useEffect(() => {
    if (location.pathname === '/clear') {
      localStorage.removeItem('appData');
      setData([]); // Clear the state to reset the data
      navigate('/'); // Navigate back to root immediately after clearing
    }
  }, [location, navigate]);

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <div className={styles.logoContainer}>
          <img src={agGridLogo} className={styles.logo} alt="ag-Grid Logo" />
          <img src={agChartsLogo} className={styles.logo} alt="ag-Grid Logo" />
        </div>
        <Form onSubmit={handleFormData} />
      </div>
      <div className={styles.content}>
        <div className={styles.gridContainer}>
          <DataGrid rowData={data} />
        </div>
        <div className={styles.chartContainer}>
          <div className={styles.chart}>
            <AgeIncomeChart data={data} />
          </div>
          <div className={styles.chart}>
            <MapChart data={data} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
