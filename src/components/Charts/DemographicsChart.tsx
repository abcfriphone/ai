import React from 'react';
import ReactECharts from 'echarts-for-react';

interface DemographicsChartProps {
  data: { name: string; value: number }[];
  type: 'pie' | 'bar';
  title?: string;
}

export const DemographicsChart: React.FC<DemographicsChartProps> = ({ data, type, title }) => {
  const isPie = type === 'pie';

  const options = {
    tooltip: {
      trigger: isPie ? 'item' : 'axis',
      formatter: isPie ? '{b}: {c}%' : '{b}: {c}%'
    },
    grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
    xAxis: isPie ? undefined : {
      type: 'value',
      axisLine: { show: false },
      splitLine: { lineStyle: { color: '#F3F4F6', type: 'dashed' } },
      axisLabel: { formatter: '{value}%', color: '#6B7280' }
    },
    yAxis: isPie ? undefined : {
      type: 'category',
      data: data.map(d => d.name).reverse(),
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: '#374151', fontWeight: 500 }
    },
    series: [
      {
        type: type,
        radius: isPie ? ['40%', '70%'] : undefined,
        itemStyle: {
          borderRadius: isPie ? 4 : [0, 4, 4, 0],
          color: isPie ? undefined : '#8B5CF6'
        },
        data: isPie ? data : data.map(d => d.value).reverse(),
        label: {
          show: isPie,
          formatter: '{b}\n{c}%'
        }
      }
    ],
    color: ['#6366F1', '#EC4899', '#8B5CF6', '#14B8A6', '#F59E0B']
  };

  return <ReactECharts option={options} style={{ height: '300px', width: '100%' }} />;
};
