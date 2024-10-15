import React, { useState } from 'react';
import Select from 'react-select'; // Import react-select
import styles from './Form.module.scss';
import { nationalityCodes } from '../../data/nationalityCodes';

const DataForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    age: '',
    experience: 0,
    degree: '',
    income: 0,
    nationality: '',
  });

  const [errors, setErrors] = useState({});

  // Prepare options for react-select
  const nationalityOptions = Object.entries(nationalityCodes).map(
    ([code, name]) => ({
      value: name,
      label: name,
    })
  );

  const handleChange = ({ target: { name, value, type, checked } }) => {
    const parsedValue =
      type === 'checkbox'
        ? checked
        : name === 'degree'
        ? value === 'true'
        : ['age', 'experience', 'income'].includes(name)
        ? value === ''
          ? ''
          : Number(value.replace(/[^\d]/g, ''))
        : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: parsedValue,
    }));
  };

  // Handler specifically for react-select
  const handleNationalityChange = (selectedOption) => {
    setFormData((prevData) => ({
      ...prevData,
      nationality: selectedOption ? selectedOption.value : '',
    }));
  };

  const validateForm = () => {
    let validationErrors = {};
    if (formData.age < 18 || formData.age > 100) {
      validationErrors.age = 'Age must be between 18 and 100.';
    }
    if (formData.income < 0) {
      validationErrors.income = 'Income must be a positive number.';
    }
    if (formData.experience < 0 || formData.experience > 50) {
      validationErrors.experience =
        'Experience must be between 0 and 50 years.';
    }
    if (!formData.nationality) {
      validationErrors.nationality = 'Nationality is required.';
    }
    if (formData.degree === '') {
      validationErrors.degree = 'Degree selection is required.';
    }
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const formatIncome = (income) => {
    return income
      ? new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 0,
        }).format(income)
      : '';
  };

  return (
    <div className={styles.container}>
      <p className={styles.title}>
        Use the form below to add your data to the grid and charts, and see how
        you compare to other attendees at this event.
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
          placeholder="Enter your age"
          value={formData.age}
          onChange={handleChange}
          className={styles.input}
          required
        />
        {errors.age && <span className={styles.error}>{errors.age}</span>}

        {/* Yearly Income Input with Currency Formatting */}
        <label htmlFor="income" className={styles.label}>
          Yearly Income ($):
        </label>
        <input
          type="text"
          id="income"
          name="income"
          placeholder="Enter your yearly income in USD"
          value={formatIncome(formData.income)}
          onChange={handleChange}
          className={styles.input}
          required
        />
        {errors.income && <span className={styles.error}>{errors.income}</span>}

        {/* Degree - Boolean Dropdown */}
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
          <option value="">Select...</option>
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select>
        {errors.degree && <span className={styles.error}>{errors.degree}</span>}

        {/* Nationality of Origin Searchable Dropdown */}
        <label htmlFor="nationality" className={styles.label}>
          Nationality:
        </label>
        <Select
          id="nationality"
          name="nationality"
          options={nationalityOptions}
          value={nationalityOptions.find(
            (option) => option.value === formData.nationality
          )}
          onChange={handleNationalityChange}
          className={styles.reactSelectInput}
          isClearable
        />
        {errors.nationality && (
          <span className={styles.error}>{errors.nationality}</span>
        )}

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
        {errors.experience && (
          <span className={styles.error}>{errors.experience}</span>
        )}

        <button type="submit" className={styles.button}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default DataForm;
