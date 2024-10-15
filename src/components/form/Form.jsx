import React, { useState } from 'react';
import styles from './Form.module.scss';
import { countryCodes } from '../../data/CountryCodes';

const DataForm = ({ onSubmit, toggleModal }) => {
  const [formData, setFormData] = useState({
    age: 18,
    experience: 2,
    degree: false, // Keep as a boolean
    income: 100000,
    country: 'United Kingdom',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Convert value based on input type or name
    const isNumberField = ['age', 'experience', 'income'].includes(name);
    const parsedValue =
      type === 'checkbox'
        ? checked
        : name === 'degree'
        ? value === 'true' // Convert "true"/"false" strings to booleans
        : isNumberField
        ? value === ''
          ? ''
          : Number(value)
        : value;

    setFormData({
      ...formData,
      [name]: parsedValue,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    toggleModal();
  };

  return (
    <div className={styles.container}>
      <p className={styles.title}>
        Submit your own data to see how you compare to other attendees at the
        event
      </p>
      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Age Input */}
        <label htmlFor="age" className={styles.label}>
          Age:
        </label>
        <input
          type="number"
          id="age"
          name="age"
          step="1"
          value={formData.age}
          onChange={handleChange}
          className={styles.input}
          required
        />

        {/* Yearly Income Input */}
        <label htmlFor="income" className={styles.label}>
          Yearly Income:
        </label>
        <input
          type="number"
          id="income"
          name="income"
          step="1000"
          value={formData.income}
          onChange={handleChange}
          className={styles.input}
          required
        />

        {/* Degree - Now a Boolean Dropdown */}
        <label htmlFor="degree" className={styles.label}>
          Degree:
        </label>
        <select
          id="degree"
          name="degree"
          value={formData.degree}
          onChange={handleChange}
          className={styles.input}
          required
        >
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select>

        {/* Country of Origin Dropdown */}
        <label htmlFor="country" className={styles.label}>
          Country of Origin:
        </label>
        <select
          id="country"
          name="country"
          value={formData.country}
          onChange={handleChange}
          className={styles.input}
          required
        >
          {Object.entries(countryCodes).map(([code, name]) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>

        {/* Years of Experience Slider */}
        <label htmlFor="experience" className={styles.label}>
          Years of Experience:
          <span className={styles.span}>{formData.experience}</span>
        </label>
        <input
          type="range"
          id="experience"
          name="experience"
          min="0"
          max="50"
          step="1"
          value={formData.experience}
          onChange={handleChange}
          className={styles.input}
        />

        <button type="submit" className={styles.button}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default DataForm;
