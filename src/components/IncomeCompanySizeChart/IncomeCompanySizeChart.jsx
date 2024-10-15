import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { AgCharts } from 'ag-charts-react';
import 'ag-charts-enterprise';
import { data } from './data';

const boxPlotData = [
  {
    range: '1',
    min: 5000,
    q1: 5000,
    median: 15000,
    q3: 75000,
    max: 200000,
  },
  {
    range: '1-5',
    min: 5000,
    q1: 15000,
    median: 40000,
    q3: 75000,
    max: 200000,
  },
  {
    range: '5-10',
    min: 5000,
    q1: 15000,
    median: 40000,
    q3: 75000,
    max: 200000,
  },
  {
    range: '10-20',
    min: 5000,
    q1: 15000,
    median: 40000,
    q3: 75000,
    max: 200000,
  },
  {
    range: '20-50',
    min: 5000,
    q1: 40000,
    median: 75000,
    q3: 75000,
    max: 200000,
  },
  {
    range: '50-100',
    min: 5000,
    q1: 40000,
    median: 75000,
    q3: 75000,
    max: 200000,
  },
  {
    range: '100-1000',
    min: 5000,
    q1: 40000,
    median: 75000,
    q3: 150000,
    max: 200000,
  },
  {
    range: '>1000',
    min: 5000,
    q1: 40000,
    median: 75000,
    q3: 150000,
    max: 200000,
  },
];

const ChartExample = () => {
  const [options, setOptions] = useState({
    title: {
      text: 'Salary Distribution by Company Size',
    },
    data: data,
    theme: 'ag-vivid-dark',
    height: 675,
    series: [
      {
        type: 'box-plot',
        direction: 'horizontal',
        yKey: 'range',
        xKey: 'p50',
        minKey: 'min',
        maxKey: 'max',
      },
    ],
    axes: [
      {
        type: 'category',
        position: 'left',
        title: { text: 'Company Size' },
      },
      {
        type: 'number',
        position: 'bottom',
        title: { text: 'Salary' },
      },
    ],
  });

  return <AgCharts options={options} />;
};

export default ChartExample;
