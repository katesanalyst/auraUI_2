export const weeklyCreated = [3200, 4100, 3800, 4500, 3900, 4200, 3817];
export const weeklyResolved = [2100, 2800, 2400, 3100, 2600, 2900, 2176];
export const weekDays = ['Dec 18', 'Dec 19', 'Dec 20', 'Dec 21', 'Dec 22', 'Dec 23', 'Dec 24'];

export function getCreatedVsResolvedOptions(isDark: boolean): ApexCharts.ApexOptions {
  const textColor = '#8a929a';
  const gridColor = isDark ? '#2a3a4a' : '#e5eaef';
  return {
    chart: { type: 'area', fontFamily: "'Plus Jakarta Sans', sans-serif", toolbar: { show: false } },
    colors: ['#0085db', '#46caeb'],
    stroke: { curve: 'smooth', width: 2 },
    fill: {
      type: 'gradient',
      gradient: { shadeIntensity: 1, opacityFrom: 0.4, opacityTo: 0.05, stops: [0, 100] },
    },
    grid: { borderColor: gridColor, strokeDashArray: 4, xaxis: { lines: { show: false } } },
    xaxis: {
      categories: weekDays,
      labels: { style: { colors: textColor, fontSize: '12px' } },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      labels: {
        style: { colors: textColor, fontSize: '12px' },
        formatter: (v) => `${(v / 1000).toFixed(1)}k`,
      },
    },
    tooltip: { theme: isDark ? 'dark' : 'light', y: { formatter: (v) => v.toLocaleString() } },
    dataLabels: { enabled: false },
    legend: { show: false },
  };
}

export function getConversionsOptions(isDark: boolean): ApexCharts.ApexOptions {
  const textColor = '#8a929a';
  const gridColor = isDark ? '#2a3a4a' : '#e5eaef';
  return {
    chart: { type: 'area', fontFamily: "'Plus Jakarta Sans', sans-serif", toolbar: { show: false }, sparkline: { enabled: true } },
    colors: ['#0085db'],
    stroke: { curve: 'smooth', width: 2 },
    fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.4, opacityTo: 0.05, stops: [0, 100] } },
    grid: { borderColor: gridColor, strokeDashArray: 4, xaxis: { lines: { show: false } } },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      labels: { style: { colors: textColor, fontSize: '12px' } },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      labels: {
        style: { colors: textColor, fontSize: '12px' },
        formatter: (v) => `${(v / 1000).toFixed(0)}k`,
      },
    },
    tooltip: { theme: isDark ? 'dark' : 'light', y: { formatter: (v) => v.toLocaleString() } },
    dataLabels: { enabled: false },
    legend: { show: false },
  };
}

export function getChannelsOptions(isDark: boolean): ApexCharts.ApexOptions {
  return {
    chart: { type: 'donut', fontFamily: "'Plus Jakarta Sans', sans-serif" },
    colors: ['#0085db', '#46caeb', '#39b69a', '#fb977d'],
    labels: ['Email', 'Chat', 'Phone', 'Social'],
    plotOptions: {
      pie: {
        donut: {
          size: '70%',
          labels: {
            show: true,
            name: { show: true, fontSize: '14px', fontWeight: 600 },
            value: { show: true, fontSize: '16px', fontWeight: 700 },
            total: { show: true, label: 'Total', fontSize: '14px', fontWeight: 600 },
          },
        },
      },
    },
    stroke: { width: 2, colors: [isDark ? '#1a2234' : '#fff'] },
    legend: { position: 'bottom', fontSize: '13px' },
    dataLabels: { enabled: false },
    theme: { mode: isDark ? 'dark' : 'light' },
  };
}

export function getSatisfactionOptions(isDark: boolean): ApexCharts.ApexOptions {
  return {
    chart: { type: 'donut', fontFamily: "'Plus Jakarta Sans', sans-serif" },
    colors: ['#39b69a', '#f0c040', '#f44336'],
    labels: ['Positive', 'Neutral', 'Negative'],
    plotOptions: {
      pie: {
        donut: {
          size: '70%',
          labels: {
            show: true,
            name: { show: true, fontSize: '14px', fontWeight: 600 },
            value: { show: true, fontSize: '16px', fontWeight: 700, formatter: (v) => `${v}%` },
            total: { show: true, label: '156 Customers', fontSize: '13px', fontWeight: 600 },
          },
        },
      },
    },
    stroke: { width: 2, colors: [isDark ? '#1a2234' : '#fff'] },
    legend: { show: false },
    dataLabels: { enabled: false },
    theme: { mode: isDark ? 'dark' : 'light' },
  };
}
