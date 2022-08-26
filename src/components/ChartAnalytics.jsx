import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';


const ChartAnalytics = ({ analytica }) => {
  ChartJS.register(ArcElement, Tooltip, Legend);
  const data = {
    datasets: [
      {
        label: '# of Votes',
        data: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        options: {
          tooltips: {
            callbacks: {
              title: function (tooltipItem, data) {
                return data['labels'][tooltipItem[0]['index']];
              },
              label: function (tooltipItem, data) {
                return data['datasets'][0]['data'][tooltipItem['index']];
              },
              afterLabel: function (tooltipItem, data) {
                var dataset = data['datasets'][0];
                var percent = Math.round((dataset['data'][tooltipItem['index']] / dataset["_meta"][0]['total']) * 100)
                return '(' + percent + '%)';
              }
            },
            backgroundColor: '#FFF',
            titleFontSize: 16,
            titleFontColor: '#0066ff',
            bodyFontColor: '#000',
            bodyFontSize: 14,
            displayColors: false
          }
        },

        backgroundColor: [
          '#78BAED',
          '#4BA4E8',
          '#F2EC7E',
          '#F4BC33',
          '#F1D44A',
          '#FF1DC0',
          '#D24FC5',
          '#F18B0D',
          '#F18B0D',
        ],
        borderColor: [
          '#78BAED',
          '#4BA4E8',
          '#F2EC7E',
          '#F4BC33',
          '#F1D44A',
          '#FF1DC0',
          '#D24FC5',
          '#F18B0D',
          '#F18B0D',
        ],
        borderWidth: 1,
      },
      {
        label: '# of Votes',
        data: [1, 1, 3, 5],
        backgroundColor: [
          '#4BA4E8',
          '#1D8DE1',
          '#416989',
          '#A6D1F3',
        ],
        borderColor: [

          '#4BA4E8',
          '#1D8DE1',
          '#416989',
          '#A6D1F3',
        ],
        borderWidth: 1,
      },
    ],
  };
  const titleTooltip = (tooltipItems) => {
    return 'Node Type    18%'
  }

  const a = 'Node Type'
  const options = {
    plugins: {
      tooltip: {
        yAlign: 'top',
        backgroundColor: 'white',
        titleMarginBottom: 0,
        titleColor: 'black',
        displayColors: false,
        callbacks: {
          title: titleTooltip,
        }
      }
    },
  };

  return (
    <div>
      <Doughnut data={data} options={options} className={analytica ? 'chart_analytica' : 'chart_analytics'} />
    </div>
  )
}

export default ChartAnalytics