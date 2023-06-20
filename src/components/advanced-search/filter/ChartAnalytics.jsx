import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import PropTypes from 'prop-types';

function ChartAnalytics({
  analyticsData, totalResults, title, filter,
}) {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
  );

  const options = {
    indexAxis: 'y',
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: title,
        font: {
          size: 20,
        },
        padding: {
          top: 10,
          bottom: 10,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 16,
          },
        },
      },
    },
  };
  const labels = [];
  const valuesData = [];
  const colors = [];
  const prepareData = (aggregations) => {
    if (!aggregations || !aggregations.length || !aggregations[0]) {
      return;
    }

    Object.keys(aggregations[0]).forEach((key) => {
      if (key) {
        labels.push(filter.type === 'date' ? key.substring(0, 4) : key);
        valuesData.push(aggregations[0][key]);
        colors.push((Math.round((aggregations[0][key] / totalResults) * 100) > 50) ? 'green' : 'LimeGreen');
      }
    });
  };

  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: valuesData,
        backgroundColor: colors,
        borderColor: colors,
        barPercentage: 0.9,
        categoryPercentage: 0.6,
      },
    ],
  };

  prepareData(analyticsData);

  return ((<Bar options={options} data={data} style={{ height: '400px' }} />));
}

ChartAnalytics.propTypes = {
  totalResults: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  analyticsData: PropTypes.instanceOf(Object).isRequired,
  filter: PropTypes.instanceOf(Object).isRequired,
};

export default ChartAnalytics;
