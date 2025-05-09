import type { StackProps } from '@mui/material/Stack';

import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { CONFIG } from 'src/config-global';
import { varAlpha, stylesMode } from 'src/theme/styles';

import { SvgColor } from 'src/components/svg-color';
import { varFade, MotionViewport } from 'src/components/animate';

import { SectionTitle } from './components/section-title';
import { CircleSvg, FloatLine, FloatPlusIcon } from './components/svg-elements';

// ----------------------------------------------------------------------

export function HomeComponent({ sx, ...other }: StackProps) {
  const renderLines = (
    <>
      <FloatPlusIcon sx={{ top: 72, left: 72 }} />
      <FloatPlusIcon sx={{ bottom: 72, left: 72 }} />
      <FloatLine sx={{ top: 80, left: 0 }} />
      <FloatLine sx={{ bottom: 80, left: 0 }} />
      <FloatLine vertical sx={{ top: 0, left: 80 }} />
    </>
  );

  const renderDescription = (
    <>
      <SectionTitle
        caption="让您的数据可视化"
        title="为何选择"
        txtGradient="智链云商?"
        sx={{ mb: { xs: 5, md: 8 }, textAlign: { xs: 'center', md: 'left' } }}
      />

      <Stack
        spacing={6}
        sx={{
          maxWidth: { sm: 560, md: 400 },
          mx: { xs: 'auto', md: 'unset' },
        }}
      >
        {ITEMS.map((item) => (
          <Box
            component={m.div}
            key={item.title}
            variants={varFade({ distance: 24 }).inUp}
            gap={3}
            display="flex"
          >
            <SvgColor src={item.icon} sx={{ width: 40, height: 40 }} />
            <Stack spacing={1}>
              <Typography variant="h5" component="h6">
                {item.title}
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>{item.description}</Typography>
            </Stack>
          </Box>
        ))}
      </Stack>
    </>
  );

  const renderImg = (
    <Stack
      component={m.div}
      variants={varFade({ distance: 24 }).inRight}
      alignItems="center"
      justifyContent="center"
      sx={{ height: 1, position: 'relative' }}
    >
      <Box
        sx={{
          left: 0,
          width: 720,
          borderRadius: 2,
          position: 'absolute',
          bgcolor: 'background.default',
          boxShadow: (theme) =>
            `-40px 40px 80px 0px ${varAlpha(theme.vars.palette.grey['500Channel'], 0.16)}`,
          [stylesMode.dark]: {
            boxShadow: (theme) =>
              `-40px 40px 80px 0px ${varAlpha(theme.vars.palette.common.blackChannel, 0.16)}`,
          },
        }}
      >
        <Box
          component="img"
          alt="Home Chart"
          src={`${CONFIG.site.basePath}/assets/images/home/home-chart.webp`}
          sx={{ width: 720 }}
        />
      </Box>
    </Stack>
  );

  return (
    <Stack
      component="section"
      sx={{
        overflow: 'hidden',
        position: 'relative',
        // py: { xs: 10, md: 20 },
        ...sx,
      }}
      {...other}
    >
      <MotionViewport>
        {/* {renderLines} */}

        {/* <Container sx={{ position: 'relative' }}> */}
        {/*   <Grid container columnSpacing={{ xs: 0, md: 8 }} sx={{ position: 'relative', zIndex: 9 }}> */}
        {/*     <Grid xs={12} md={6} lg={7}> */}
        {/*       {renderDescription} */}
        {/*     </Grid> */}

        {/*     <Grid md={6} lg={5} sx={{ display: { xs: 'none', md: 'block' } }}> */}
        {/*       {renderImg} */}
        {/*     </Grid> */}
        {/*   </Grid> */}

        {/*   <CircleSvg variants={varFade().in} sx={{ display: { xs: 'none', md: 'block' } }} /> */}
        {/* </Container> */}
      </MotionViewport>
    </Stack>
  );
}

// ----------------------------------------------------------------------

const ITEMS = [
  {
    icon: `${CONFIG.site.basePath}/assets/icons/home/ic-make-brand.svg`,
    title: '品牌建设',
    description: '整合型平台使您轻松打造销售渠道。',
  },
  {
    icon: `${CONFIG.site.basePath}/assets/icons/home/ic-design.svg`,
    title: 'UI & UX 设计',
    description: '基于原子设计系统的原理构建，专注于产品的外观和交互性',
  },
  {
    icon: `${CONFIG.site.basePath}/assets/icons/home/ic-development.svg`,
    title: '使用',
    description: '运行顺畅，界面清晰，流程易懂，为您节省时间和金钱。',
  },
];
