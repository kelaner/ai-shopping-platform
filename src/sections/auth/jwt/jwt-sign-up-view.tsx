'use client';

import {z as zod} from 'zod';
import {useState} from 'react';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';

import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import {paths} from 'src/routes/paths';
import {useRouter} from 'src/routes/hooks';
import {RouterLink} from 'src/routes/components';

import {useBoolean} from 'src/hooks/use-boolean';

import {Iconify} from 'src/components/iconify';
import {Form, Field} from 'src/components/hook-form';

import {signUp} from 'src/auth/context/jwt';
import {useAuthContext} from 'src/auth/hooks';

// ----------------------------------------------------------------------

export type SignUpSchemaType = zod.infer<typeof SignUpSchema>;

export const SignUpSchema = zod.object({
  firstName: zod.string().min(1, {message: 'First name is required!'}),
  lastName: zod.string().min(1, {message: 'Last name is required!'}),
  email: zod
    .string()
    .min(1, {message: 'Email is required!'})
    .email({message: 'Email must be a valid email address!'}),
  password: zod
    .string()
    .min(1, {message: 'Password is required!'})
    .min(6, {message: 'Password must be at least 6 characters!'}),
});

// ----------------------------------------------------------------------

export function JwtSignUpView() {
  const {checkUserSession} = useAuthContext();

  const router = useRouter();

  const password = useBoolean();

  const [errorMsg, setErrorMsg] = useState('');

  const defaultValues = {
    firstName: 'Hello',
    lastName: 'Friend',
    email: 'hello@gmail.com',
    password: '@demo1',
  };

  const methods = useForm<SignUpSchemaType>({
    resolver: zodResolver(SignUpSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: {isSubmitting},
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await signUp({
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
      });
      await checkUserSession?.();

      router.refresh();
    } catch (error) {
      console.error(error);
      setErrorMsg(error instanceof Error ? error.message : error);
    }
  });

  const renderHead = (
    <Stack spacing={1.5} sx={{mb: 5}}>
      <Typography variant="h5">创建一个全新的账户</Typography>

      <Stack direction="row" spacing={0.5}>
        <Typography variant="body2" sx={{color: 'text.secondary'}}>
          已经有账号了？
        </Typography>

        <Link component={RouterLink} href={paths.auth.jwt.signIn} variant="subtitle2">
          登录
        </Link>
      </Stack>
    </Stack>
  );

  const renderForm = (
    <Stack spacing={3}>
      <Stack direction={{xs: 'column', sm: 'row'}} spacing={2}>
        <Field.Text name="firstName" label="用户名" InputLabelProps={{shrink: true}}/>
        {/* <Field.Text name="lastName" label="Last name" InputLabelProps={{shrink: true}}/> */}
      </Stack>

      <Field.Text name="email" label="邮件地址" InputLabelProps={{shrink: true}}/>

      <Field.Text
        name="password"
        label="密码"
        placeholder="6+ characters"
        type={password.value ? 'text' : 'password'}
        InputLabelProps={{shrink: true}}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={password.onToggle} edge="end">
                <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'}/>
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <LoadingButton
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
        loadingIndicator="创建账户中..."
      >
        创建账户
      </LoadingButton>
    </Stack>
  );

  const renderTerms = (
    <Typography
      component="div"
      sx={{
        mt: 3,
        textAlign: 'center',
        typography: 'caption',
        color: 'text.secondary',
      }}
    >
      {'通过注册，我同意 '}
      <Link underline="always" color="text.primary">
        服务条款
      </Link>
      {' 和 '}
      <Link underline="always" color="text.primary">
        隐私政策
      </Link>
      。
    </Typography>
  );

  return (
    <>
      {renderHead}

      {!!errorMsg && (
        <Alert severity="error" sx={{mb: 3}}>
          {errorMsg}
        </Alert>
      )}

      <Form methods={methods} onSubmit={onSubmit}>
        {renderForm}
      </Form>

      {renderTerms}
    </>
  );
}
