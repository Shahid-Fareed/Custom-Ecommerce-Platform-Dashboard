// components/PieChart.tsx
import { useEffect } from 'react';
import dynamic from 'next/dynamic';

const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });

interface PieChartProps {
  chartId: string;
}

const PieChart: React.FC<PieChartProps> = ({ chartId }) => {
  useEffect(() => {
    const getChartOptions = () => {
      return {
        series: [52.8, 26.8, 20.4],
        colors: ["#1C64F2", "#16BDCA", "#9061F9"],
        chart: {
          height: 420,
          width: "100%",
          type: "pie",
        },
        stroke: {
          colors: ["white"],
          lineCap: "",
        },
        plotOptions: {
          pie: {
            labels: {
              show: true,
            },
            size: "100%",
            dataLabels: {
              offset: -25,
            },
          },
        },
        labels: ["Direct", "Organic search", "Referrals"],
        dataLabels: {
          enabled: true,
          style: {
            fontFamily: "Inter, sans-serif",
          },
        },
        legend: {
          position: "bottom",
          fontFamily: "Inter, sans-serif",
        },
        yaxis: {
          labels: {
            formatter: function (value: number) {
              return value + "%";
            },
          },
        },
        xaxis: {
          labels: {
            formatter: function (value: number) {
              return value + "%";
            },
          },
          axisTicks: {
            show: false,
          },
          axisBorder: {
            show: false,
          },
        },
      };
    };

    if (document.getElementById(chartId) && typeof ApexCharts !== 'undefined') {
      const chart = new ApexCharts(document.getElementById(chartId), getChartOptions());
      chart.render();
    }
  }, [chartId]);

  return <div id={chartId} className="py-6" />;
};

export default PieChart;
