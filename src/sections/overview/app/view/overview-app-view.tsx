'use client';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';

import { DashboardContent } from 'src/layouts/dashboard';
import { SeoIllustration } from 'src/assets/illustrations';
import { _appAuthors, _appRelated, _appFeatured, _appInvoices, _appInstalled } from 'src/_mock';

import { svgColorClasses } from 'src/components/svg-color';

import { useMockedUser } from 'src/auth/hooks';

import { AppWidget } from '../app-widget';
import { AppWelcome } from '../app-welcome';
import { AppFeatured } from '../app-featured';
import { AppNewInvoice } from '../app-new-invoice';
import { AppTopAuthors } from '../app-top-authors';
import { AppTopRelated } from '../app-top-related';
import { AppAreaInstalled } from '../app-area-installed';
import { AppWidgetSummary } from '../app-widget-summary';
import { AppCurrentDownload } from '../app-current-download';
import { AppTopInstalledCountries } from '../app-top-installed-countries';

// ----------------------------------------------------------------------

export function OverviewAppView() {
  const { user } = useMockedUser();

  const theme = useTheme();

  return (
    <DashboardContent maxWidth="xl">
      <Grid container spacing={3}>
        <Grid xs={12} md={8}>
          <AppWelcome
            title={`欢迎回来 👋 \n `}
            description="我们致力于为您提供最智能、最便捷的购物体验。感谢您的支持！"
            img={<SeoIllustration hideBackground />}
            // action={
            //   <Button variant="contained" color="primary">
            //     Go now
            //   </Button>
            // }
          />
        </Grid>

        <Grid xs={12} md={4}>
          <AppFeatured list={_appFeatured} />
        </Grid>

        <Grid xs={12} md={4}>
          <AppWidgetSummary
            title="活跃天数"
            percent={2.6}
            total={365}
            chart={{
              categories: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月'],
              series: [15, 18, 12, 30, 28, 11, 19, 26],
            }}
          />
        </Grid>

        <Grid xs={12} md={4}>
          <AppWidgetSummary
            title="购物总价值"
            percent={0.2}
            total={4876}
            chart={{
              colors: [theme.vars.palette.info.main],
              categories: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月'],
              series: [20, 41, 63, 33, 28, 35, 50, 46],
            }}
          />
        </Grid>

        <Grid xs={12} md={4}>
          <AppWidgetSummary
            title="下单总数"
            percent={-0.1}
            total={78}
            chart={{
              colors: [theme.vars.palette.error.main],
              categories: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月'],
              series: [18, 19, 31, 8, 16, 37, 12, 33],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppCurrentDownload
            title="最近开销"
            subheader="在不同系统购物平台的开销"
            chart={{
              series: [
                { label: 'Mac', value: 1244 },
                { label: 'Window', value: 5345 },
                { label: 'iOS', value: 4413 },
                { label: 'Android', value: 7343 },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppAreaInstalled
            title="花销分类"
            subheader="(+43%) 相比去年"
            chart={{
              categories: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月','九月','十月','十一月','十二月'],
              series: [
                {
                  name: '2022',
                  data: [
                    { name: '食品', data: [12, 10, 18, 22, 20, 12, 8, 21, 20, 14, 15, 16] },
                    { name: '衣物', data: [12, 10, 18, 22, 20, 12, 8, 21, 20, 14, 15, 16] },
                    { name: '数码', data: [12, 10, 18, 22, 20, 12, 8, 21, 20, 14, 15, 16] },
                  ],
                },
                {
                  name: '2023',
                  data: [
                    { name: '食品', data: [6, 18, 14, 9, 20, 6, 22, 19, 8, 22, 8, 17] },
                    { name: '衣物', data: [6, 18, 14, 9, 20, 6, 22, 19, 8, 22, 8, 17] },
                    { name: '数码', data: [6, 18, 14, 9, 20, 6, 22, 19, 8, 22, 8, 17] },
                  ],
                },
                {
                  name: '2024',
                  data: [
                    { name: '食品', data: [6, 20, 15, 18, 7, 24, 6, 10, 12, 17, 18, 10] },
                    { name: '衣物', data: [6, 20, 15, 18, 7, 24, 6, 10, 12, 17, 18, 10] },
                    { name: '数码', data: [6, 20, 15, 18, 7, 24, 6, 10, 12, 17, 18, 10] },
                  ],
                },
              ],
            }}
          />
        </Grid>

        {/* <box> */}

        {/* <Grid xs={12} lg={8}> */}
        {/*   <AppNewInvoice */}
        {/*     title="New invoice" */}
        {/*     tableData={_appInvoices} */}
        {/*     headLabel={[ */}
        {/*       { id: 'id', label: 'Invoice ID' }, */}
        {/*       { id: 'category', label: 'Category' }, */}
        {/*       { id: 'price', label: 'Price' }, */}
        {/*       { id: 'status', label: 'Status' }, */}
        {/*       { id: '' }, */}
        {/*     ]} */}
        {/*   /> */}
        {/* </Grid> */}

        {/* <Grid xs={12} md={6} lg={4}> */}
        {/*   <AppTopRelated title="Related applications" list={_appRelated} /> */}
        {/* </Grid> */}

        {/* <Grid xs={12} md={6} lg={4}> */}
        {/*   <AppTopInstalledCountries title="Top installed countries" list={_appInstalled} /> */}
        {/* </Grid> */}

        {/* <Grid xs={12} md={6} lg={4}> */}
        {/*   <AppTopAuthors title="Top authors" list={_appAuthors} /> */}
        {/* </Grid> */}

        {/* <Grid xs={12} md={6} lg={4}> */}
        {/*   <Box sx={{ gap: 3, display: 'flex', flexDirection: 'column' }}> */}
        {/*     <AppWidget */}
        {/*       title="Conversion" */}
        {/*       total={38566} */}
        {/*       icon="solar:user-rounded-bold" */}
        {/*       chart={{ series: 48 }} */}
        {/*     /> */}

        {/*     <AppWidget */}
        {/*       title="Applications" */}
        {/*       total={55566} */}
        {/*       icon="fluent:mail-24-filled" */}
        {/*       chart={{ */}
        {/*         series: 75, */}
        {/*         colors: [theme.vars.palette.info.light, theme.vars.palette.info.main], */}
        {/*       }} */}
        {/*       sx={{ bgcolor: 'info.dark', [`& .${svgColorClasses.root}`]: { color: 'info.light' } }} */}
        {/*     /> */}

        {/*   </Box> */}
        {/* </Grid> */}
        {/* </box> */}
      </Grid>
    </DashboardContent>
  );
}
