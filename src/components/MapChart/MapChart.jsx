import React, { useEffect, useState } from 'react';
import { AgCharts } from 'ag-charts-react';
import { defaultData } from './data';
import { topology } from './topology';
import 'ag-charts-enterprise';

const MapChart = ({ data }) => {
  const [chartData, setChartData] = useState(defaultData);

  useEffect(() => {
    // Make a deep copy of defaultData to avoid mutating it directly
    const updatedData = JSON.parse(JSON.stringify(defaultData));

    // Increment country values based on data
    data.forEach((attendee) => {
      const country = updatedData.find(
        (country) => country.name === attendee.country
      );
      if (country) {
        country.value += 1;
      }
    });

    setChartData(updatedData);
  }, [data]);

  const options = {
    title: { text: 'Attendee Countries' },
    subtitle: { text: 'Realtime attendee data' },
    data: chartData, // use the updated chartData state
    topology,
    height: 575,
    theme: 'ag-vivid-dark',
    zoom: {
      enabled: true,
      scrollingStep: 1,
    },
    series: [
      {
        type: 'map-shape-background',
      },
      {
        type: 'map-shape',
        title: 'Attendees Country',
        idKey: 'name',
        colorKey: 'value',
        colorName: 'Number of Attendees',
        colorRange: ['#1b4f72', '#2ecc71', '#2cdbd6'],
      },
    ],
    gradientLegend: {
      enabled: true,
      position: 'right',
      gradient: {
        preferredLength: 200,
        thickness: 2,
      },
      scale: {
        label: {
          fontSize: 12,
        },
        interval: {
          step: 1,
          minSpacing: 100,
        },
      },
    },
  };

  return <AgCharts options={options} />;
};

export default MapChart;
