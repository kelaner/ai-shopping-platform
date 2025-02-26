'use client';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';

import { CONFIG } from 'src/config-global';
import { DashboardContent } from 'src/layouts/dashboard';
import { _bankingContacts, _bankingCreditCard, _bankingRecentTransitions } from 'src/_mock';

import { Iconify } from 'src/components/iconify/iconify';

import { BankingContacts } from '../banking-contacts';
import { BankingOverview } from '../banking-overview';
import { BankingQuickTransfer } from '../banking-quick-transfer';
import { BankingInviteFriends } from '../banking-invite-friends';
import { BankingCurrentBalance } from '../banking-current-balance';
import { BankingBalanceStatistics } from '../banking-balance-statistics';
import { BankingRecentTransitions } from '../banking-recent-transitions';
import { BankingExpensesCategories } from '../banking-expenses-categories';

// ----------------------------------------------------------------------

export function OverviewBankingView() {
  return (
    <DashboardContent maxWidth="xl">
      <Grid container spacing={3}>
        <Grid xs={12} md={7} lg={8}>
          <Box sx={{ gap: 3, display: 'flex', flexDirection: 'column' }}>
            <BankingOverview />

            <BankingBalanceStatistics
              title="余额统计"
              subheader="余额随时间的统计分析"
              chart={{
                series: [
                  {
                    name: '每周',
                    categories: ['1周', '2周', '3周', '4周', '5周'],
                    data: [
                      { name: '收入', data: [24, 41, 35, 151, 49] },
                      { name: '储蓄', data: [24, 56, 77, 88, 99] },
                      { name: '投资', data: [40, 34, 77, 88, 99] },
                    ],
                  },
                  {
                    name: '每月',
                    categories: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月','九月'],
                    data: [
                      { name: '收入', data: [83, 112, 119, 88, 103, 112, 114, 108, 93] },
                      { name: '储蓄', data: [46, 46, 43, 58, 40, 59, 54, 42, 51] },
                      { name: '投资', data: [25, 40, 38, 35, 20, 32, 27, 40, 21] },
                    ],
                  },
                  {
                    name: '每年',
                    categories: ['2018', '2019', '2020', '2021', '2022', '2023'],
                    data: [
                      { name: '收入', data: [76, 42, 29, 41, 27, 96] },
                      { name: '储蓄', data: [46, 44, 24, 43, 44, 43] },
                      { name: '投资', data: [23, 22, 37, 38, 32, 25] },
                    ],
                  },
                ],
              }}
            />

            <BankingExpensesCategories
              title="支出分类"
              chart={{
                series: [
                  { label: '娱乐', value: 3200 },
                  { label: '汽油', value: 1200 },
                  { label: '食品', value: 3800 },
                  { label: '饮品', value: 3600 },
                  { label: '话费', value: 1900 },
                  { label: '医疗', value: 1600 },
                  { label: '健身', value: 2800 },
                  { label: '超市', value: 2400 },
                ],
                icons: [
                  <Iconify icon="streamline:dices-entertainment-gaming-dices-solid" />,
                  <Iconify icon="maki:fuel" />,
                  <Iconify icon="ion:fast-food" />,
                  <Iconify icon="maki:cafe" />,
                  <Iconify icon="basil:mobile-phone-outline" />,
                  <Iconify icon="solar:medical-kit-bold" />,
                  <Iconify icon="ic:round-fitness-center" />,
                  <Iconify icon="solar:cart-3-bold" />,
                ],
              }}
            />

            {/* <BankingRecentTransitions */}
            {/*   title="Recent transitions" */}
            {/*   tableData={_bankingRecentTransitions} */}
            {/*   headLabel={[ */}
            {/*     { id: 'description', label: 'Description' }, */}
            {/*     { id: 'date', label: 'Date' }, */}
            {/*     { id: 'amount', label: 'Amount' }, */}
            {/*     { id: 'status', label: 'Status' }, */}
            {/*     { id: '' }, */}
            {/*   ]} */}
            {/* /> */}
          </Box>
        </Grid>

        <Grid xs={12} md={5} lg={4}>
          <Box sx={{ gap: 3, display: 'flex', flexDirection: 'column' }}>
            <BankingCurrentBalance list={_bankingCreditCard} />

            {/* <BankingQuickTransfer title="Quick transfer" list={_bankingContacts} /> */}

            {/* <BankingContacts */}
            {/*   title="Contacts" */}
            {/*   subheader="You have 122 contacts" */}
            {/*   list={_bankingContacts.slice(-5)} */}
            {/* /> */}

            <BankingInviteFriends
              price="￥50"
              title="邀请好友，赢取奖励"
              description="邀请好友加入，双方都能获得丰厚奖励，轻松分享，快乐加倍！"
              imgUrl={`${CONFIG.site.basePath}/assets/illustrations/illustration-receipt.webp`}
            />
          </Box>
        </Grid>
      </Grid>
    </DashboardContent>
  );
}
