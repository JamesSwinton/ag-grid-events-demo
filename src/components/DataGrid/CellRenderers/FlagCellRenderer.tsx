import { nationalityCodes } from '../../../data/nationalityCodes';
import styles from './FlagCellRenderer.module.scss';

function getnationalityCode(nationalityName) {
  for (const [code, name] of Object.entries(nationalityCodes)) {
    if (name === nationalityName) {
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
        src={`./flags/${getnationalityCode(params.value)}.svg`}
        alt={params.value?.toLowerCase()}
      />
    </div>
  );
};
