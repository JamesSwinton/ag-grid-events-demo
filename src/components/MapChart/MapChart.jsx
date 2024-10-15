import React, { useEffect, useState } from 'react';
import { AgCharts } from 'ag-charts-react';
import { defaultData } from './data';
import { topology } from './topology';
import 'ag-charts-enterprise';

const MapChart = ({ data }) => {
  const [stepInterval, setStepInterval] = useState(1);
  const [chartData, setChartData] = useState(defaultData);

  useEffect(() => {
    const updatedData = JSON.parse(JSON.stringify(defaultData));
    data.forEach((attendee) => {
      const nationality = updatedData.find(
        (nationality) => nationality.name === attendee.nationality
      );
      if (nationality) {
        nationality.value += 1;
      }
    });

    setChartData(updatedData);
    setStepInterval(Math.ceil(data?.length / 3));
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
        title: 'Attendees nationality',
        idKey: 'name',
        colorKey: 'value',
        colorName: 'Number of Attendees',
        colorRange: ['#1b4f72', '#2ecc71', '#2cdbd6'],
      },
    ],
    gradientLegend: {
      enabled: false,
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
          step: stepInterval,
        },
      },
    },
  };

  return <AgCharts options={options} />;
};

export default MapChart;
