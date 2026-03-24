import React from 'react';
import ReactECharts from 'echarts-for-react';
import { formatNumber } from '../../utils/formatters';

interface GrowthChartProps {
  data: { date: string; followers: number }[];
}

export const GrowthChart: React.FC<GrowthChartProps> = ({ data }) => {
  const options = {
    tooltip: {
      trigger: 'axis',
      formatter: (params: any) => {
        return `${params[0].name}<br/>Followers: <b>${formatNumber(params[0].value)}</b>`;
      }
    },
    grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: data.map(d => d.date),
      axisLine: { lineStyle: { color: '#E5E7EB' } },
      axisLabel: { color: '#6B7280' }
    },
    yAxis: {
      type: 'value',
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { lineStyle: { color: '#F3F4F6', type: 'dashed' } },
      axisLabel: {
        color: '#6B7280',
        formatter: (value: number) => formatNumber(value)
      }
    },
    series: [
      {
        name: 'Followers',
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 8,
        itemStyle: { color: '#6366F1' },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(99, 102, 241, 0.2)' },
              { offset: 1, color: 'rgba(99, 102, 241, 0)' }
            ]
          }
        },
        data: data.map(d => d.followers)
      }
    ]
  };

  return <ReactECharts option={options} style={{ height: '300px', width: '100%' }} />;
};
