import { countryCodes } from '../../../data/CountryCodes';
import styles from './FlagCellRenderer.module.scss';

function getCountryCode(countryName) {
  for (const [code, name] of Object.entries(countryCodes)) {
    if (name === countryName) {
      return code.toLowerCase();
    }
  }
  return null; // Return null if no match is found
}

export const FlagCellRenderer = (params) => {
  return (
    <div className={styles.flagCell}>
      <div className={styles.employeeData}>
        <span>{params.value}</span>
      </div>
      <img
        className={styles.image}
        src={`./flags/${getCountryCode(params.value)}.svg`}
        alt={params.value?.toLowerCase()}
      />
    </div>
  );
};
