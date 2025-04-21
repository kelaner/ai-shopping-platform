import type { StackProps } from '@mui/material/Stack';

import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Rating from '@mui/material/Rating';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { fToNow } from 'src/utils/format-time';

import { _mock } from 'src/_mock';
import { maxLine, varAlpha, textGradient } from 'src/theme/styles';

import { varFade, MotionViewport, AnimateCountUp } from 'src/components/animate';
import {
  Carousel,
  useCarousel,
  CarouselDotButtons,
  carouselBreakpoints,
  CarouselArrowBasicButtons,
} from 'src/components/carousel';

import { SectionTitle } from './components/section-title';
import { FloatLine, FloatTriangleDownIcon } from './components/svg-elements';

// ----------------------------------------------------------------------

export function HomeTestimonials({ sx, ...other }: StackProps) {
  const theme = useTheme();

  const renderLines = (
    <>
      <Stack
        spacing={8}
        alignItems="center"
        sx={{ top: 64, left: 80, position: 'absolute', transform: 'translateX(-15px)' }}
      >
        <FloatTriangleDownIcon sx={{ position: 'static', opacity: 0.12 }} />
        <FloatTriangleDownIcon sx={{ width: 30, height: 15, opacity: 0.24, position: 'static' }} />
      </Stack>
      <FloatLine vertical sx={{ top: 0, left: 80 }} />
    </>
  );

  const carousel = useCarousel({
    align: 'start',
    slidesToShow: { xs: 1, sm: 2, md: 3, lg: 4 },
    breakpoints: {
      [carouselBreakpoints.sm]: { slideSpacing: '24px' },
      [carouselBreakpoints.md]: { slideSpacing: '40px' },
      [carouselBreakpoints.lg]: { slideSpacing: '64px' },
    },
  });

  const renderDescription = (
    <SectionTitle
      caption="推荐"
      title="好评上升"
      txtGradient="中..."
      sx={{ mb: { xs: 5, md: 8 }, textAlign: 'center' }}
    />
  );

  const horizontalDivider = (position: 'top' | 'bottom') => (
    <Divider
      component="div"
      sx={{
        width: 1,
        opacity: 0.16,
        height: '1px',
        border: 'none',
        position: 'absolute',
        background: `linear-gradient(to right, ${varAlpha(theme.vars.palette.grey['500Channel'], 0)} 0%, ${theme.vars.palette.grey[500]} 50%, ${varAlpha(theme.vars.palette.grey['500Channel'], 0)} 100%)`,
        ...(position === 'top' && { top: 0 }),
        ...(position === 'bottom' && { bottom: 0 }),
      }}
    />
  );

  const verticalDivider = (
    <Divider
      component="div"
      orientation="vertical"
      flexItem
      sx={{
        opacity: 0.16,
        border: 'none',
        width: '1px',
        background: `linear-gradient(to bottom, ${varAlpha(theme.vars.palette.grey['500Channel'], 0)} 0%, ${theme.vars.palette.grey[500]} 50%, ${varAlpha(theme.vars.palette.grey['500Channel'], 0)} 100%)`,
        display: { xs: 'none', md: 'block' },
      }}
    />
  );

  const renderContent = (
    <Stack sx={{ position: 'relative', py: { xs: 5, md: 8 } }}>
      {horizontalDivider('top')}

      <Carousel carousel={carousel}>
        {TESTIMONIALS.map((item) => (
          <Stack key={item.id} component={m.div} variants={varFade().in}>
            <Stack spacing={1} sx={{ typography: 'subtitle2' }}>
              <Rating size="small" name="read-only" value={item.rating} precision={0.5} readOnly />
              {item.category}
            </Stack>

            <Typography
              sx={{ ...maxLine({ line: 4, persistent: theme.typography.body1 }), mt: 2, mb: 3 }}
            >
              {item.content}
            </Typography>

            <Stack direction="row" alignItems="center" spacing={2}>
              <Avatar alt={item.name} src={item.avatar} sx={{ width: 48, height: 48 }} />
              <Stack sx={{ typography: 'subtitle1' }}>
                <Box component="span">{item.name}</Box>
                <Box component="span" sx={{ typography: 'body2', color: 'text.disabled' }}>
                  {fToNow(new Date(item.postedAt))}
                </Box>
              </Stack>
            </Stack>
          </Stack>
        ))}
      </Carousel>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ mt: { xs: 5, md: 8 } }}
      >
        <CarouselDotButtons
          fallback
          variant="rounded"
          scrollSnaps={carousel.dots.scrollSnaps}
          selectedIndex={carousel.dots.selectedIndex}
          onClickDot={carousel.dots.onClickDot}
        />

        <CarouselArrowBasicButtons {...carousel.arrows} options={carousel.options} />
      </Stack>
    </Stack>
  );

  const renderNumber = (
    <Stack sx={{ py: { xs: 5, md: 8 }, position: 'relative' }}>
      {horizontalDivider('top')}

      <Stack spacing={5} direction={{ xs: 'column', md: 'row' }} divider={verticalDivider}>
        {[
          { label: '采购订单', value: 12.121 },
          { label: '满意顾客', value: 160 },
          { label: '流水金额', value: 131.313 },
        ].map((item) => (
          <Stack key={item.label} spacing={2} sx={{ textAlign: 'center', width: 1 }}>
            <m.div variants={varFade({ distance: 24 }).inUp}>
              <AnimateCountUp
                to={item.value}
                unit={item.label === '满意顾客' ? '+' : 'k+'}
                toFixed={item.label === '满意顾客' ? 0 : 1}
                sx={{
                  fontWeight: 'fontWeightBold',
                  fontSize: { xs: 40, md: 64 },
                  lineHeight: { xs: 50 / 40, md: 80 / 64 },
                  fontFamily: theme.typography.fontSecondaryFamily,
                }}
              />
            </m.div>

            <m.div variants={varFade({ distance: 24 }).inUp}>
              <Box
                component="span"
                sx={{
                  ...textGradient(
                    `90deg, ${theme.vars.palette.text.primary}, ${varAlpha(theme.vars.palette.text.primaryChannel, 0.2)}`
                  ),
                  opacity: 0.4,
                  typography: 'h6',
                }}
              >
                {item.label}
              </Box>
            </m.div>
          </Stack>
        ))}
      </Stack>

      {horizontalDivider('bottom')}
    </Stack>
  );

  return (
    <Stack component="section" sx={{ py: 10, position: 'relative', ...sx }} {...other}>
      <MotionViewport>
        {renderLines}

        <Container>
          {renderDescription}

          {renderContent}

          {renderNumber}
        </Container>
      </MotionViewport>
    </Stack>
  );
}

// ----------------------------------------------------------------------

const base = (index: number) => ({
  id: _mock.id(index),
  name: _mock.fullName(index),
  avatar: _mock.image.avatar(index),
  rating: 5,
});

const TESTIMONIALS = [
  {
    ...base(1),
    category: '智能推荐',
    content: `这个电商平台的智能推荐太强大了！每次推荐的商品都完全符合我的喜好和需求，感觉它比我自己还了解我。借助AI算法，精准地为我推送各种心仪好物，大大节省了我的购物时间。`,
    postedAt: 'April 20, 2024 23:15:30',
  },
  {
    ...base(2),
    category: '智能客服',
    content: `智能客服的响应速度超快，而且能理解复杂的问题并给出准确的答案。无论是咨询商品信息还是处理售后问题，AI客服都能高效解决，就像有个专业的购物顾问随时在身边。`,
    postedAt: 'March 19, 2024 23:15:30',
  },
  {
    ...base(3),
    category: '个性化体验',
    content: `平台通过AI分析我的购物历史和行为习惯，为我定制了专属的购物界面和优惠活动。这种个性化的体验让我感觉自己备受重视，购物变得更加有趣和贴心。`,
    postedAt: 'April 19, 2023 23:15:30',
  },
  {
    ...base(4),
    category: '价格预测',
    content: `AI驱动的价格预测功能太实用了！它能根据市场趋势和历史数据，预测商品价格的走势，帮助我在最合适的时机下单，节省了不少开支。`,
    postedAt: 'May 19, 2023 23:15:30',
  },
  {
    ...base(5),
    category: '智能搜索',
    content: `即使我的搜索关键词描述不太准确，智能搜索也能快速理解我的意图并给出相关的商品结果。AI技术让搜索变得更加智能和高效，找东西再也不费劲了。`,
    postedAt: 'June 19, 2023 23:15:30',
  },
  {
    ...base(6),
    category: '智能推荐',
    content: `自从用了这个平台的智能推荐，我发现了好多以前没关注过但又特别喜欢的商品。AI算法不断学习我的偏好，推荐的商品越来越合我心意。`,
    postedAt: 'July 19, 2023 23:15:30',
  },
  {
    ...base(7),
    category: '风险防控',
    content: `AI在平台的风险防控方面做得非常出色。它能实时监测交易数据，识别潜在的风险，保障我的购物安全和资金安全，让我购物无后顾之忧。`,
    postedAt: 'August 19, 2023 23:15:30',
  },
  {
    ...base(8),
    category: '智能营销',
    content: `平台的智能营销活动很有针对性，AI根据我的兴趣推送的优惠券和活动，让我享受到了很多实惠。这种精准的营销方式让我更愿意在平台上消费。`,
    postedAt: 'September 19, 2023 23:15:30',
  },
];
