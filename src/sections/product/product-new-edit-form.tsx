import {useCopilotReadable} from "@copilotkit/react-core";
import {CopilotTextarea} from "@copilotkit/react-textarea";

import {zodResolver} from '@hookform/resolvers/zod';
import LoadingButton from '@mui/lab/LoadingButton';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import {useTheme} from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import TextField from "@mui/material/TextField";
import Typography from '@mui/material/Typography';
import {useCallback, useEffect, useMemo, useState} from 'react';
import {useForm} from 'react-hook-form';

import {
  _tags,
  PRODUCT_CATEGORY_GROUP_OPTIONS,
  PRODUCT_COLOR_NAME_OPTIONS,
  PRODUCT_GENDER_OPTIONS,
  PRODUCT_SIZE_OPTIONS,
} from 'src/_mock';
import {Field, Form, schemaHelper} from 'src/components/hook-form';

import {toast} from 'src/components/snackbar';
import {useRouter} from 'src/routes/hooks';

import {paths} from 'src/routes/paths';
import type {IProductItem} from 'src/types/product';

import {z as zod} from 'zod';

// ----------------------------------------------------------------------

export type NewProductSchemaType = zod.infer<typeof NewProductSchema>;

export const NewProductSchema = zod.object({
  name: zod.string().min(1, {message: 'Name is required!'}),
  description: schemaHelper.editor({message: {required_error: 'Description is required!'}}),
  images: schemaHelper.files({message: {required_error: 'Images is required!'}}),
  code: zod.string().min(1, {message: 'Product code is required!'}),
  sku: zod.string().min(1, {message: 'Product sku is required!'}),
  quantity: zod.number().min(1, {message: 'Quantity is required!'}),
  colors: zod.string().array().nonempty({message: 'Choose at least one option!'}),
  sizes: zod.string().array().nonempty({message: 'Choose at least one option!'}),
  tags: zod.string().array().min(2, {message: 'Must have at least 2 items!'}),
  gender: zod.string().array().nonempty({message: 'Choose at least one option!'}),
  price: zod.number().min(1, {message: 'Price should not be $0.00'}),
  // Not required
  category: zod.string(),
  priceSale: zod.number(),
  subDescription: zod.string(),
  taxes: zod.number(),
  saleLabel: zod.object({enabled: zod.boolean(), content: zod.string()}),
  newLabel: zod.object({enabled: zod.boolean(), content: zod.string()}),
});

// ----------------------------------------------------------------------

type Props = {
  currentProduct?: IProductItem;
};

export function ProductNewEditForm({currentProduct}: Props) {
  const router = useRouter();

  const [includeTaxes, setIncludeTaxes] = useState(false);

  const defaultValues = useMemo(
    () => ({
      name: currentProduct?.name || '',
      description: currentProduct?.description || '',
      subDescription: currentProduct?.subDescription || '',
      images: currentProduct?.images || [],
      //
      code: currentProduct?.code || '',
      sku: currentProduct?.sku || '',
      price: currentProduct?.price || 0,
      quantity: currentProduct?.quantity || 0,
      priceSale: currentProduct?.priceSale || 0,
      tags: currentProduct?.tags || [],
      taxes: currentProduct?.taxes || 0,
      gender: currentProduct?.gender || [],
      category: currentProduct?.category || PRODUCT_CATEGORY_GROUP_OPTIONS[0].classify[1],
      colors: currentProduct?.colors || [],
      sizes: currentProduct?.sizes || [],
      newLabel: currentProduct?.newLabel || {enabled: false, content: ''},
      saleLabel: currentProduct?.saleLabel || {enabled: false, content: ''},
    }),
    [currentProduct]
  );

  const methods = useForm<NewProductSchemaType>({
    resolver: zodResolver(NewProductSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: {isSubmitting},
  } = methods;

  const values = watch();

  useEffect(() => {
    if (currentProduct) {
      reset(defaultValues);
    }
  }, [currentProduct, defaultValues, reset]);

  useEffect(() => {
    if (includeTaxes) {
      setValue('taxes', 0);
    } else {
      setValue('taxes', currentProduct?.taxes || 0);
    }
  }, [currentProduct?.taxes, includeTaxes, setValue]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      toast.success(currentProduct ? 'Update success!' : 'Create success!');
      router.push(paths.dashboard.product.root);
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });

  const handleRemoveFile = useCallback(
    (inputFile: File | string) => {
      const filtered = values.images && values.images?.filter((file) => file !== inputFile);
      setValue('images', filtered);
    },
    [setValue, values.images]
  );

  const handleRemoveAllFiles = useCallback(() => {
    setValue('images', [], {shouldValidate: true});
  }, [setValue]);

  const handleChangeIncludeTaxes = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setIncludeTaxes(event.target.checked);
  }, []);

  const [name, setName] = useState<string>('');
  const [text, setText] = useState<string>('');

  const handleChangeName = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  }, []);

  useCopilotReadable({
    description: "当前页面要新添加的产品的名字",
    value: name
  });

  const theme = useTheme();

  const renderDetails = (
    <Card>
      <CardHeader title="详情" subheader="标题、简短描述、图片..." sx={{mb: 3}}/>

      <Divider/>

      <Stack spacing={3} sx={{p: 3}}>
        {/* <Field.Text name="name" label="产品名称"/> */}
        <TextField
          variant="outlined"
          fullWidth
          label="产品名称"
          value={name}
          onChange={handleChangeName}
        />

        <Stack spacing={1.5}>
          <Typography variant="subtitle2">描述</Typography>
          <CopilotTextarea
            value={text}
            onValueChange={(value) => setText(value)}
            placeholder="请输入产品描述..."
            autosuggestionsConfig={{
              textareaPurpose: "描述当前页面要新添加的产品的功能和特点",
              chatApiConfigs: {},
            }}
            style={{
              width: "100%",
              border: `1px solid ${theme.palette.grey[400]}`,
              borderRadius: theme.shape.borderRadius,
              padding: theme.spacing(1),
              backgroundColor: theme.palette.background.paper,
              minHeight: 200
            }}
          />
        </Stack>


        <Stack spacing={1.5}>
          <Typography variant="subtitle2">内容</Typography>
          <Field.Editor name="description" sx={{maxHeight: 480}}/>
        </Stack>

        <Stack spacing={1.5}>
          <Typography variant="subtitle2">图片</Typography>
          <Field.Upload
            multiple
            thumbnail
            name="images"
            maxSize={3145728}
            onRemove={handleRemoveFile}
            onRemoveAll={handleRemoveAllFiles}
            onUpload={() => console.info('ON UPLOAD')}
          />
        </Stack>
      </Stack>
    </Card>
  );

  const renderProperties = (
    <Card>
      <CardHeader
        title="特性"
        subheader="添加功能和属性..."
        sx={{mb: 3}}
      />

      <Divider/>

      <Stack spacing={3} sx={{p: 3}}>
        <Box
          columnGap={2}
          rowGap={3}
          display="grid"
          gridTemplateColumns={{xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)'}}
        >
          <Field.Text name="code" label="产品代码"/>

          <Field.Text name="sku" label="产品SKU"/>

          <Field.Text
            name="quantity"
            label="数量"
            placeholder="0"
            type="number"
            InputLabelProps={{shrink: true}}
          />

          <Field.Select native name="category" label="分类" InputLabelProps={{shrink: true}}>
            {PRODUCT_CATEGORY_GROUP_OPTIONS.map((category) => (
              <optgroup key={category.group} label={category.group}>
                {category.classify.map((classify) => (
                  <option key={classify} value={classify}>
                    {classify}
                  </option>
                ))}
              </optgroup>
            ))}
          </Field.Select>

          <Field.MultiSelect
            checkbox
            name="colors"
            label="颜色"
            options={PRODUCT_COLOR_NAME_OPTIONS}
          />

          <Field.MultiSelect checkbox name="sizes" label="尺寸" options={PRODUCT_SIZE_OPTIONS}/>
        </Box>

        <Field.Autocomplete
          name="tags"
          label="标签"
          placeholder="+ Tags"
          multiple
          freeSolo
          disableCloseOnSelect
          options={_tags.map((option) => option)}
          getOptionLabel={(option) => option}
          renderOption={(props, option) => (
            <li {...props} key={option}>
              {option}
            </li>
          )}
          renderTags={(selected, getTagProps) =>
            selected.map((option, index) => (
              <Chip
                {...getTagProps({index})}
                key={option}
                label={option}
                size="small"
                color="info"
                variant="soft"
              />
            ))
          }
        />

        <Stack spacing={1}>
          <Typography variant="subtitle2">人群</Typography>
          <Field.MultiCheckbox row name="gender" options={PRODUCT_GENDER_OPTIONS} sx={{gap: 2}}/>
        </Stack>

        <Divider sx={{borderStyle: 'dashed'}}/>

        <Stack direction="row" alignItems="center" spacing={3}>
          <Field.Switch name="saleLabel.enabled" label={null} sx={{m: 0}}/>
          <Field.Text
            name="saleLabel.content"
            label="销售标签"
            fullWidth
            disabled={!values.saleLabel.enabled}
          />
        </Stack>

        <Stack direction="row" alignItems="center" spacing={3}>
          <Field.Switch name="newLabel.enabled" label={null} sx={{m: 0}}/>
          <Field.Text
            name="newLabel.content"
            label="新标签"
            fullWidth
            disabled={!values.newLabel.enabled}
          />
        </Stack>
      </Stack>
    </Card>
  );

  const renderPricing = (
    <Card>
      <CardHeader title="定价" sx={{mb: 3}}/>

      <Divider/>

      <Stack spacing={3} sx={{p: 3}}>
        <Field.Text
          name="price"
          label="正常价格"
          placeholder="0.00"
          type="number"
          InputLabelProps={{shrink: true}}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Box component="span" sx={{color: 'text.disabled'}}>
                  ￥
                </Box>
              </InputAdornment>
            ),
          }}
        />

        <Field.Text
          name="priceSale"
          label="销售价格"
          placeholder="0.00"
          type="number"
          InputLabelProps={{shrink: true}}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Box component="span" sx={{color: 'text.disabled'}}>
                  ￥
                </Box>
              </InputAdornment>
            ),
          }}
        />

        {/* <FormControlLabel */}
        {/*   control={ */}
        {/*     <Switch id="toggle-taxes" checked={includeTaxes} onChange={handleChangeIncludeTaxes} /> */}
        {/*   } */}
        {/*   label="价格含税" */}
        {/* /> */}

        {/* {!includeTaxes && ( */}
        {/*   <Field.Text */}
        {/*     name="taxes" */}
        {/*     label="Tax (%)" */}
        {/*     placeholder="0.00" */}
        {/*     type="number" */}
        {/*     InputLabelProps={{ shrink: true }} */}
        {/*     InputProps={{ */}
        {/*       startAdornment: ( */}
        {/*         <InputAdornment position="start"> */}
        {/*           <Box component="span" sx={{ color: 'text.disabled' }}> */}
        {/*             % */}
        {/*           </Box> */}
        {/*         </InputAdornment> */}
        {/*       ), */}
        {/*     }} */}
        {/*   /> */}
        {/* )} */}
      </Stack>
    </Card>
  );

  const renderActions = (
    <Stack spacing={3} direction="row" alignItems="center" flexWrap="wrap">
      <FormControlLabel
        control={<Switch defaultChecked inputProps={{id: 'publish-switch'}}/>}
        label="发布"
        sx={{pl: 3, flexGrow: 1}}
      />

      <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
        {!currentProduct ? '创建产品' : '保存更改'}
      </LoadingButton>
    </Stack>
  );

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Stack spacing={{xs: 3, md: 5}} sx={{mx: 'auto', maxWidth: {xs: 720, xl: 880}}}>
        {renderDetails}

        {renderProperties}

        {renderPricing}

        {renderActions}
      </Stack>
    </Form>
  );
}
