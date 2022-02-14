import ReactApexChart from "react-apexcharts";

export default function ApexChart(props) {
  const options = props.chartOptions;

  const data = props.chartData;

  return (
    <ReactApexChart
      options={options}
      series={data}
      type="area"
      width="100%"
      height="100%"
    />
  );
}
