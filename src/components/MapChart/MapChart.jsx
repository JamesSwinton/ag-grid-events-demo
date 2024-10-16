import React, { useEffect, useState } from 'react';
import { AgCharts } from 'ag-charts-react';
import { defaultData } from './data';
import { topology } from './topology';
import 'ag-charts-enterprise';

const MapChart = ({ data }) => {
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
  }, [data]);

  const options = {
    title: { text: 'Attendee Nationalities' },
    subtitle: {
      text: 'Zoom into the map and hover specific countries for more information',
    },
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
        colorRange: ['#1b4f72', '#f4d03f', '#e67e22', '#c0392b'],
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
          fontSize: 1,
          color: '#192232',
        },
      },
    },
  };

  return <AgCharts options={options} />;
};

export default MapChart;
