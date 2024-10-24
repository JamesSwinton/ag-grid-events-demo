import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './App.module.scss';
import Form from './form/Form';
import DataGrid from './DataGrid/DataGrid';
import MapChart from './MapChart/MapChart';
import AgeIncomeChart from './AgeIncomeChart/AgeIncomeChart';
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

  const removeData = (rowId) => {
    setData((prevData) => {
      const updatedData = prevData.filter((row) => row.id !== rowId);
      localStorage.setItem('appData', JSON.stringify(updatedData)); // Persist new data immediately
      console.log(updatedData);
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

  const links = [
    {
      text: 'Source Code',
      url: 'https://github.com/JamesSwinton/ag-grid-events-demo',
    },
    {
      text: 'Grid Docs',
      url: 'https://www.ag-grid.com/react-data-grid/getting-started/',
    },
    {
      text: 'Charts Docs',
      url: 'https://www.ag-grid.com/charts/react/quick-start/',
    },
  ];

  const [selectedNationalities, setSelectedNationalities] = useState([]);
  const onNationalitiesSelected = (nationalities) => {
    setSelectedNationalities(nationalities);
  };

  const [selectedIds, setSelectedIds] = useState([]);
  const onIdsSelected = (ids) => {
    setSelectedIds(ids);
  };

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <div className={styles.logoContainer}>
          <img
            src="./brand/ag-grid-logo.png"
            className={styles.logo}
            alt="ag-Grid Logo"
          />
          <img
            src="./brand/ag-charts-logo.png"
            className={styles.logo}
            alt="ag-Grid Logo"
          />
        </div>
        <Form onSubmit={handleFormData} />
        {/* <div className={styles.linksContainer}>
          {links.map((link, index) => (
            <span key={index} className={styles.linkItem}>
              <a href={link.url} target="_blank" className={styles.link}>
                {link.text}
              </a>
              {index < links.length - 1 && (
                <span className={styles.linkSeparator}>|</span>
              )}
            </span>
          ))}
        </div> */}
      </div>
      <div className={styles.content}>
        <div className={styles.gridContainer}>
          <DataGrid
            rowData={data}
            removeData={removeData}
            onNationalitiesSelected={onNationalitiesSelected}
            onIdsSelected={onIdsSelected}
          />
        </div>
        <div className={styles.chartContainer}>
          <div className={styles.chart}>
            <AgeIncomeChart data={data} selectedIds={selectedIds} />
          </div>
          <div className={styles.chart}>
            <MapChart
              data={data}
              selectedNationalities={selectedNationalities}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
