'use client';

import {useCopilotAction} from "@copilotkit/react-core";
import {useTheme} from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
import {useEffect, useState} from "react";
import {_ecommerceNewProducts, _ecommerceSalesOverview,} from 'src/_mock';
import {MotivationIllustration} from 'src/assets/illustrations';

import {useMockedUser} from 'src/auth/hooks';

import {DashboardContent} from 'src/layouts/dashboard';
import {EcommerceCurrentBalance} from '../ecommerce-current-balance';
import {EcommerceNewProducts} from '../ecommerce-new-products';
import {EcommerceSaleByGender} from '../ecommerce-sale-by-gender';
import {EcommerceSalesOverview} from '../ecommerce-sales-overview';

import {EcommerceWelcome} from '../ecommerce-welcome';
import {EcommerceWidgetSummary} from '../ecommerce-widget-summary';
import {EcommerceYearlySales} from '../ecommerce-yearly-sales';

// ----------------------------------------------------------------------

export function OverviewEcommerceView() {
  const {user} = useMockedUser();

  const theme = useTheme();

  const [defaultYear, setDefaultYear] = useState<string>("2023");


  const EcommerceYearlySalesView = () => (
    <EcommerceYearlySales
      title="年销售额"
      subheader="(+43%) 相比去年"
      defaultYear={defaultYear ?? "2023"}
      chart={{
        categories: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
        series: [
          {
            name: "2022",
            data: [
              {
                name: "总收入",
                data: [10, 41, 35, 51, 49, 62, 69, 91, 148, 35, 51, 49],
              },
              {
                name: "总花费",
                data: [10, 34, 13, 56, 77, 88, 99, 77, 45, 13, 56, 77],
              },
            ],
          },
          {
            name: "2023",
            data: [
              {
                name: "总收入",
                data: [51, 35, 41, 10, 91, 69, 62, 148, 91, 69, 62, 49],
              },
              {
                name: "总花费",
                data: [56, 13, 34, 10, 77, 99, 88, 45, 77, 99, 88, 77],
              },
            ],
          },
        ],
      }}
    />
  );


  return (
    <DashboardContent maxWidth="xl">
      <Grid container spacing={3}>
        <Grid xs={12} md={8}>
          <EcommerceWelcome
            title={`祝贺 🎉  \n ${user?.displayName}`}
            description="你今天的销售额增加了57.6%。"
            img={<MotivationIllustration hideBackground/>}
            // action={
            //   <Button variant="contained" color="primary">
            //     Go now
            //   </Button>
            // }
          />
        </Grid>

        <Grid xs={12} md={4}>
          <EcommerceNewProducts list={_ecommerceNewProducts}/>
        </Grid>

        <Grid xs={12} md={4}>
          <EcommerceWidgetSummary
            title="销售额"
            percent={2.6}
            total={765}
            chart={{
              categories: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月',],
              series: [22, 8, 35, 50, 82, 84, 77, 12],
            }}
          />
        </Grid>

        <Grid xs={12} md={4}>
          <EcommerceWidgetSummary
            title="余额合计"
            percent={-0.1}
            total={18765}
            chart={{
              colors: [theme.vars.palette.warning.light, theme.vars.palette.warning.main],
              categories: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月',],
              series: [56, 47, 40, 62, 73, 30, 23, 54],
            }}
          />
        </Grid>

        <Grid xs={12} md={4}>
          <EcommerceWidgetSummary
            title="销售利润"
            percent={0.6}
            total={4876}
            chart={{
              colors: [theme.vars.palette.error.light, theme.vars.palette.error.main],
              categories: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月',],
              series: [40, 70, 75, 70, 50, 28, 7, 64],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <EcommerceSaleByGender
            title="服饰销售分区"
            total={2324}
            chart={{
              series: [
                {label: '男装', value: 25},
                {label: '女装', value: 50},
                {label: '童装', value: 75},
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <EcommerceYearlySalesView/>
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <EcommerceSalesOverview title="销售概况" data={_ecommerceSalesOverview}/>
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <EcommerceCurrentBalance
            title="当前余额"
            earning={25500}
            refunded={1600}
            orderTotal={287650}
            currentBalance={187650}
          />
        </Grid>

        {/* <Grid xs={12} md={6} lg={8}> */}
        {/*   <EcommerceBestSalesman */}
        {/*     title="Best salesman" */}
        {/*     tableData={_ecommerceBestSalesman} */}
        {/*     headLabel={[ */}
        {/*       {id: 'name', label: 'Seller'}, */}
        {/*       {id: 'category', label: 'Product'}, */}
        {/*       {id: 'country', label: 'Country', align: 'center'}, */}
        {/*       {id: 'totalAmount', label: 'Total', align: 'right'}, */}
        {/*       {id: 'rank', label: 'Rank', align: 'right'}, */}
        {/*     ]} */}
        {/*   /> */}
        {/* </Grid> */}

        {/* <Grid xs={12} md={6} lg={4}> */}
        {/*   <EcommerceLatestProducts title="Latest products" list={_ecommerceLatestProducts}/> */}
        {/* </Grid> */}
      </Grid>
    </DashboardContent>
  );
}
