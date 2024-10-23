import React from 'react';
import { AgCharts } from 'ag-charts-react';

const formatCurrencyUSD = (amount) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(amount);

function calculateTrendLine(data) {
  const n = data.length;
  const sumX = data.reduce((sum, point) => sum + point.age, 0);
  const sumY = data.reduce((sum, point) => sum + point.income, 0);
  const sumXY = data.reduce((sum, point) => sum + point.age * point.income, 0);
  const sumX2 = data.reduce((sum, point) => sum + point.age * point.age, 0);

  // Calculate slope (m) and intercept (b)
  const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;

  return { slope, intercept };
}

function generateAverageIncomeData(data, trendLine) {
  // Find the minimum and maximum age
  const ages = data.map((point) => point.age);
  const minAge = Math.min(...ages);
  const maxAge = Math.max(...ages);

  // Calculate the average income at the start (minAge) and end (maxAge)
  return [
    {
      age: minAge,
      averageIncome: trendLine.slope * minAge + trendLine.intercept,
    },
    {
      age: maxAge,
      averageIncome: trendLine.slope * maxAge + trendLine.intercept,
    },
  ];
}

function splitDataByDegree(data) {
  const withDegree = data.filter((item) => item.degree === true);
  const withoutDegree = data.filter((item) => item.degree === false);

  return { withDegree, withoutDegree };
}

const AgeIncomeChart = ({ data }) => {
  const trendLine = calculateTrendLine(data);
  const averageIncomeData = generateAverageIncomeData(data, trendLine);
  const { withDegree, withoutDegree } = splitDataByDegree(data);

  const incomeVsExperienceOptions = {
    title: { text: 'Attendee Income Distribution by Age, Experience & Degree' },
    subtitle: { text: 'Realtime attendee data' },
    data: data,
    theme: 'ag-vivid-dark',
    series: [
      {
        type: 'bubble',
        xKey: 'age',
        yKey: 'income',
        yName: 'With Degree',
        sizeKey: 'experience',
        data: withDegree,
        fill: '#C6B1FC',
        stroke: '#C6B1FC',
      },
      {
        type: 'bubble',
        xKey: 'age',
        yKey: 'income',
        yName: 'Without Degree',
        sizeKey: 'experience',
        fill: '#2CDBD6',
        stroke: '#2CDBD6',
        data: withoutDegree,
      },
      {
        type: 'line',
        xKey: 'age',
        yKey: 'averageIncome',
        yName: 'Average',
        data: averageIncomeData,
        stroke: '#FFE4A3',
        marker: {
          enabled: false,
        },
        tooltip: {
          enabled: false,
        },
      },
    ],
    axes: [
      {
        type: 'number',
        position: 'bottom',
        title: { text: 'Age' },
        label: {
          formatter: (p) => {
            return p.value + ' years';
          },
        },
      },
      {
        type: 'number',
        position: 'left',
        title: { text: 'Yearly Income (USD)' },
        label: {
          formatter: (p) => {
            return formatCurrencyUSD(p.value);
          },
        },
      },
    ],
  };

  return <AgCharts options={incomeVsExperienceOptions} />;
};

export default AgeIncomeChart;
