import type { StackProps } from '@mui/material/Stack';

import { useState } from 'react';
import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Accordion, { accordionClasses } from '@mui/material/Accordion';
import AccordionDetails, { accordionDetailsClasses } from '@mui/material/AccordionDetails';
import AccordionSummary, { accordionSummaryClasses } from '@mui/material/AccordionSummary';

import { varAlpha } from 'src/theme/styles';

import { Iconify } from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';

import { SectionTitle } from './components/section-title';
import { FloatLine, FloatPlusIcon, FloatTriangleDownIcon } from './components/svg-elements';

// ----------------------------------------------------------------------

const FAQs = [
  {
    question: '什么是AI驱动型网络电商销售平台？',
    answer: (
      <Typography>
        AI驱动型网络电商销售平台是一种利用人工智能技术（如机器学习、自然语言处理等）来提升用户体验、优化运营效率和提高销售转化率的电商平台。例如，通过智能推荐系统为用户推荐个性化商品，或者通过智能客服快速解答用户问题。
      </Typography>
    ),
  },
  {
    question: '平台的主要功能有哪些？',
    answer: (
      <Box component="ul" sx={{ pl: 3, listStyleType: 'disc' }}>
        <li> 个性化商品推荐：根据用户的历史行为和偏好，智能推荐符合用户需求的商品。</li>
        <li> 智能客服：24/7在线解答用户问题，提供快速响应。</li>
        <li>智能搜索：支持自然语言搜索，快速找到用户想要的商品。</li>
        <li>数据分析与洞察：通过AI分析用户行为和销售数据，帮助商家优化运营策略。</li>
      </Box>
    ),
  },
  {
    question: '如何注册并登录平台？',
    answer: (
      <Typography>
        您可以通过点击登录页的“注册”按钮，填写必要的信息完成注册。注册完成后，使用注册的账号和密码登录即可。
      </Typography>
    ),
  },
  {
    question: '平台支持哪些支付方式？',
    answer: (
      <Typography>
        平台支持多种支付方式，包括但不限于信用卡、借记卡、支付宝、微信支付以及货到付款（部分商家支持）。您可以根据自己的需求选择合适的支付方式。
      </Typography>
    ),
  },
  {
    question: '我可以如何跟踪我的订单状态？',
    answer: (
      <Typography>
        您可以在“订单”页面查看订单的详细信息和物流状态。平台会实时更新订单进度，确保您随时掌握订单动态。
      </Typography>
    ),
  },
  {
    question: '智能客服能解决什么问题？',
    answer: (
      <Typography>
        智能客服可以快速解答您的常见问题，如订单查询、商品信息、退换货政策等。
      </Typography>
    ),
  },
  {
    question: '平台的退换货政策是什么？',
    answer: (
      <Typography>
        平台支持7天无理由退换货（部分商品除外）。如果您对商品不满意，可以在收到商品后的7天内申请退换货。具体政策请参考平台的退换货规则。
      </Typography>
    ),
  },
];

// ----------------------------------------------------------------------

export function HomeFAQs({ sx, ...other }: StackProps) {
  const [expanded, setExpanded] = useState<string | false>(FAQs[0].question);

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const renderDescription = (
    <SectionTitle caption="FAQs" title="我们已有" txtGradient="解答" sx={{ textAlign: 'center' }} />
  );

  const renderContent = (
    <Stack
      spacing={1}
      sx={{
        mt: 8,
        mx: 'auto',
        maxWidth: 720,
        mb: { xs: 5, md: 8 },
      }}
    >
      {FAQs.map((item, index) => (
        <Accordion
          key={item.question}
          component={m.div}
          variants={varFade({ distance: 24 }).inUp}
          expanded={expanded === item.question}
          onChange={handleChange(item.question)}
          sx={{
            borderRadius: 2,
            transition: (theme) =>
              theme.transitions.create(['background-color'], {
                duration: theme.transitions.duration.short,
              }),
            '&::before': { display: 'none' },
            '&:hover': {
              bgcolor: (theme) => varAlpha(theme.vars.palette.grey['500Channel'], 0.16),
            },
            '&:first-of-type, &:last-of-type': { borderRadius: 2 },
            [`&.${accordionClasses.expanded}`]: {
              m: 0,
              borderRadius: 2,
              boxShadow: 'none',
              bgcolor: (theme) => varAlpha(theme.vars.palette.grey['500Channel'], 0.08),
            },
            [`& .${accordionSummaryClasses.root}`]: {
              py: 3,
              px: 2.5,
              minHeight: 'auto',
              [`& .${accordionSummaryClasses.content}`]: {
                m: 0,
                [`&.${accordionSummaryClasses.expanded}`]: { m: 0 },
              },
            },
            [`& .${accordionDetailsClasses.root}`]: { px: 2.5, pt: 0, pb: 3 },
          }}
        >
          <AccordionSummary
            expandIcon={
              <Iconify
                width={20}
                icon={expanded === item.question ? 'mingcute:minimize-line' : 'mingcute:add-line'}
              />
            }
            aria-controls={`panel${index}bh-content`}
            id={`panel${index}bh-header`}
          >
            <Typography variant="h6"> {item.question}</Typography>
          </AccordionSummary>
          <AccordionDetails>{item.answer}</AccordionDetails>
        </Accordion>
      ))}
    </Stack>
  );

  const renderContact = (
    <Stack
      alignItems="center"
      sx={{
        px: 3,
        py: 8,
        textAlign: 'center',
        background: (theme) =>
          `linear-gradient(270deg, ${varAlpha(theme.vars.palette.grey['500Channel'], 0.08)}, ${varAlpha(theme.vars.palette.grey['500Channel'], 0)})`,
      }}
    >
      <m.div variants={varFade().in}>
        <Typography variant="h4">仍有问题？</Typography>
      </m.div>

      <m.div variants={varFade().in}>
        <Typography sx={{ mt: 2, mb: 3, color: 'text.secondary' }}>
          请描述您的案例，以获得最准确的建议。
        </Typography>
      </m.div>

      <m.div variants={varFade().in}>
        <Button
          color="inherit"
          variant="contained"
          href="mailto:support@minimals.cc?subject=[Feedback] from Customer"
          startIcon={<Iconify icon="fluent:mail-24-filled" />}
        >
          联系我们
        </Button>
      </m.div>
    </Stack>
  );

  return (
    <Stack component="section" sx={{ ...sx }} {...other}>
      <MotionViewport sx={{ pt: 10, position: 'relative' }}>
        <TopLines />

        <Container>
          {renderDescription}
          {renderContent}
        </Container>

        <Stack sx={{ position: 'relative' }}>
          <BottomLines />
          {renderContact}
        </Stack>
      </MotionViewport>
    </Stack>
  );
}

// ----------------------------------------------------------------------

function TopLines() {
  return (
    <>
      <Stack
        spacing={8}
        alignItems="center"
        sx={{
          top: 64,
          left: 80,
          position: 'absolute',
          transform: 'translateX(-15px)',
        }}
      >
        <FloatTriangleDownIcon sx={{ position: 'static', opacity: 0.12 }} />
        <FloatTriangleDownIcon
          sx={{
            position: 'static',
            opacity: 0.24,
            width: 30,
            height: 15,
          }}
        />
      </Stack>
      <FloatLine vertical sx={{ top: 0, left: 80 }} />
    </>
  );
}

function BottomLines() {
  return (
    <>
      <FloatLine sx={{ top: 0, left: 0 }} />
      <FloatLine sx={{ bottom: 0, left: 0 }} />
      <FloatPlusIcon sx={{ top: -8, left: 72 }} />
      <FloatPlusIcon sx={{ bottom: -8, left: 72 }} />
    </>
  );
}
