import type { CardProps } from '@mui/material/Card';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';

import { fCurrency } from 'src/utils/format-number';

// ----------------------------------------------------------------------

type Props = CardProps & {
  title: string;
  earning: number;
  refunded: number;
  orderTotal: number;
  currentBalance: number;
};

export function EcommerceCurrentBalance({
  sx,
  title,
  earning,
  refunded,
  orderTotal,
  currentBalance,
  ...other
}: Props) {
  const row = (label: string, value: number) => (
    <Box sx={{ display: 'flex', typography: 'body2', justifyContent: 'space-between' }}>
      <Box component="span" sx={{ color: 'text.secondary' }}>
        {label}
      </Box>
      <Box component="span">{fCurrency(value)}</Box>
    </Box>
  );

  return (
    <Card sx={{ p: 3, ...sx }} {...other}>
      <Box sx={{ mb: 1, typography: 'subtitle2' }}>{title}</Box>

      <Box sx={{ gap: 2, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ typography: 'h3' }}>{fCurrency(currentBalance)}</Box>

        {row('订单总额', orderTotal)}
        {row('收入', earning)}
        {row('退款', refunded)}

        <Box sx={{ gap: 2, display: 'flex' }}>
          <Button fullWidth variant="contained" color="warning">
            提现
          </Button>

          <Button fullWidth variant="contained" color="primary">
            转账
          </Button>
        </Box>
      </Box>
    </Card>
  );
}
