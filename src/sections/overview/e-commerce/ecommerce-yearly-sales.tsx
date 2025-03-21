import {useCopilotAction} from "@copilotkit/react-core";

import type {CardProps} from '@mui/material/Card';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import {useTheme} from '@mui/material/styles';

import {useCallback, useState} from 'react';
import type {ChartOptions} from 'src/components/chart';
import {Chart, ChartLegends, ChartSelect, useChart} from 'src/components/chart';

import {fShortenNumber} from 'src/utils/format-number';

// ----------------------------------------------------------------------

type Props = CardProps & {
  title?: string;
  subheader?: string;
  defaultYear?: string;
  chart: {
    colors?: string[];
    categories?: string[];
    series: {
      name: string;
      data: {
        name: string;
        data: number[];
      }[];
    }[];
    options?: ChartOptions;
  };
};

export function EcommerceYearlySales({title, subheader, chart, ...other}: Props) {
  const theme = useTheme();

  const [selectedSeries, setSelectedSeries] = useState(other.defaultYear ?? '2023');


  const chartColors = chart.colors ?? [theme.palette.primary.main, theme.palette.warning.main];

  const chartOptions = useChart({
    colors: chartColors,
    xaxis: {categories: chart.categories},
    ...chart.options,
  });

  const handleChangeSeries = useCallback((newValue: string) => {
    setSelectedSeries(newValue);
  }, []);

  const currentSeries = chart.series.find((i) => i.name === selectedSeries);



  return (
    <Card {...other}>
      <CardHeader
        title={title}
        subheader={subheader}
        action={
          <ChartSelect
            options={chart.series.map((item) => item.name)}
            value={selectedSeries}
            onChange={handleChangeSeries}
          />
        }
        sx={{mb: 3}}
      />

      <ChartLegends
        colors={chartOptions?.colors}
        labels={chart.series[0].data.map((item) => item.name)}
        values={[fShortenNumber(1234), fShortenNumber(6789)]}
        sx={{px: 3, gap: 3}}
      />

      <Chart
        type="area"
        series={currentSeries?.data}
        options={chartOptions}
        height={320}
        loadingProps={{sx: {p: 2.5}}}
        sx={{py: 2.5, pl: 1, pr: 2.5}}
      />
    </Card>
  );
}
