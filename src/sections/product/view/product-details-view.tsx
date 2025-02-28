'use client';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';

import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';

import {useCallback, useEffect, useState} from 'react';
import {PRODUCT_PUBLISH_OPTIONS} from 'src/_mock';

import {Iconify} from 'src/components/iconify';

import {useTabs} from 'src/hooks/use-tabs';
import {DashboardContent} from 'src/layouts/dashboard';

import {paths} from 'src/routes/paths';

import {varAlpha} from 'src/theme/styles';
import type {IProductItem} from 'src/types/product';
import {ProductDetailsCarousel} from '../product-details-carousel';
import {ProductDetailsDescription} from '../product-details-description';

import {ProductDetailsReview} from '../product-details-review';
import {ProductDetailsSummary} from '../product-details-summary';
import {ProductDetailsToolbar} from '../product-details-toolbar';

// ----------------------------------------------------------------------

const SUMMARY = [
  {
    "title": "100% 正品",
    "description": "我们承诺所有产品均为正品，质量有保障，让您购买无忧。",
    "icon": "solar:verified-check-bold"
  },
  {
    "title": "10天退换",
    "description": "提供10天无理由退换服务，如有任何问题，可随时联系客服处理。",
    "icon": "solar:clock-circle-bold"
  },
  {
    "title": "一年保修",
    "description": "享受一年免费保修服务，售后无忧，品质保障。",
    "icon": "solar:shield-check-bold"
  }
];

// ----------------------------------------------------------------------

type Props = {
  product?: IProductItem;
};

export function ProductDetailsView({product}: Props) {
  const tabs = useTabs('description');

  const [publish, setPublish] = useState('');

  useEffect(() => {
    if (product) {
      setPublish(product?.publish);
    }
  }, [product]);

  const handleChangePublish = useCallback((newValue: string) => {
    setPublish(newValue);
  }, []);

  return (
    <DashboardContent>
      <ProductDetailsToolbar
        backLink={paths.dashboard.product.root}
        editLink={paths.dashboard.product.edit(`${product?.id}`)}
        liveLink={paths.product.details(`${product?.id}`)}
        publish={publish}
        onChangePublish={handleChangePublish}
        publishOptions={PRODUCT_PUBLISH_OPTIONS}
      />

      <Grid container spacing={{xs: 3, md: 5, lg: 8}}>
        <Grid xs={12} md={6} lg={7}>
          <ProductDetailsCarousel images={product?.images ?? []}/>
        </Grid>

        <Grid xs={12} md={6} lg={5}>
          {product && <ProductDetailsSummary disableActions product={product}/>}
        </Grid>
      </Grid>

      <Box
        gap={5}
        display="grid"
        gridTemplateColumns={{xs: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)'}}
        sx={{my: 10}}
      >
        {SUMMARY.map((item) => (
          <Box key={item.title} sx={{textAlign: 'center', px: 5}}>
            <Iconify icon={item.icon} width={32} sx={{color: 'primary.main'}}/>

            <Typography variant="subtitle1" sx={{mb: 1, mt: 2}}>
              {item.title}
            </Typography>

            <Typography variant="body2" sx={{color: 'text.secondary'}}>
              {item.description}
            </Typography>
          </Box>
        ))}
      </Box>

      <Card>
        <Tabs
          value={tabs.value}
          onChange={tabs.onChange}
          sx={{
            px: 3,
            boxShadow: (theme) =>
              `inset 0 -2px 0 0 ${varAlpha(theme.vars.palette.grey['500Channel'], 0.08)}`,
          }}
        >
          {[
            {value: 'description', label: '描述'},
            {value: 'reviews', label: `评价 (${product?.reviews.length})`},
          ].map((tab) => (
            <Tab key={tab.value} value={tab.value} label={tab.label}/>
          ))}
        </Tabs>

        {tabs.value === 'description' && (
          <ProductDetailsDescription description={product?.description ?? ''}/>
        )}

        {tabs.value === 'reviews' && (
          <ProductDetailsReview
            ratings={product?.ratings ?? []}
            reviews={product?.reviews ?? []}
            totalRatings={product?.totalRatings ?? 0}
            totalReviews={product?.totalReviews ?? 0}
          />
        )}
      </Card>
    </DashboardContent>
  );
}
