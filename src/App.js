import React, { useEffect, useState } from 'react';
import ReactApexCharts from 'react-apexcharts';
import axios from 'axios';
import './App.css';

export default function App() {
  const [requests, setRequests] = useState('');
  const [requestsIds, setRequestsIds] = useState('');
  const getChart = async () => {
    const response = await axios.get('https://checkinn.co/api/v1/int/requests');
    const json = await response.data.requests;
    setRequests(json);
    setRequestsIds(await json.map(el => el.desk.id));
  }

  const chartData = {
    options: {
      chart: {
        height: 350,
        type: 'line',
        dropShadow: {
          enabled: true,
          color: '#000',
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.2
        },
        toolbar: {
          show: false
        }
      },
      colors: ['#77B6EA', '#545454'],
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: 'smooth'
      },
      grid: {
        borderColor: '#e7e7e7',
        row: {
          colors: ['#f3f3f3', 'transparent'],
          opacity: 0.5
        },
      },
      markers: {
        size: 1
      },
      xaxis: {
        categories: requests && requests.map(el => el.desk.name)
      }
    },
    series: [{
      name: "Requests",
      data: requestsIds && requestsIds.map(el => requestsIds.filter(id => id === el).length)
    }]
  };


  useEffect(() => {
    getChart();
  }, []);

  return (
    <>
      <div className='container'>
        <h1 className='heading'>Requests Per Hotel</h1>
        <ReactApexCharts
          options={chartData.options}
          series={chartData.series}
          type="line"
          height={350}

        />
      </div>
    </>
  )
}
