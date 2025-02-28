export const PRODUCT_GENDER_OPTIONS = [
  { label: '男装', value: 'Men' },
  { label: '女装', value: 'Women' },
  { label: '童装', value: 'Kids' },
];

export const PRODUCT_CATEGORY_OPTIONS = ['Shose', 'Apparel', 'Accessories'];

export const PRODUCT_RATING_OPTIONS = ['up4Star', 'up3Star', 'up2Star', 'up1Star'];

export const PRODUCT_COLOR_OPTIONS = [
  '#FF4842',
  '#1890FF',
  '#FFC0CB',
  '#00AB55',
  '#FFC107',
  '#7F00FF',
  '#000000',
  '#FFFFFF',
];

export const PRODUCT_COLOR_NAME_OPTIONS = [
  { value: '#FF4842', label: 'Red' },
  { value: '#1890FF', label: 'Blue' },
  { value: '#FFC0CB', label: 'Pink' },
  { value: '#00AB55', label: 'Green' },
  { value: '#FFC107', label: 'Yellow' },
  { value: '#7F00FF', label: 'Violet' },
  { value: '#000000', label: 'Black' },
  { value: '#FFFFFF', label: 'White' },
];

export const PRODUCT_SIZE_OPTIONS = [
  { value: '7', label: '7' },
  { value: '8', label: '8' },
  { value: '8.5', label: '8.5' },
  { value: '9', label: '9' },
  { value: '9.5', label: '9.5' },
  { value: '10', label: '10' },
  { value: '10.5', label: '10.5' },
  { value: '11', label: '11' },
  { value: '11.5', label: '11.5' },
  { value: '12', label: '12' },
  { value: '13', label: '13' },
];

export const PRODUCT_STOCK_OPTIONS = [
  { value: 'in stock', label: '有货' },
  { value: 'low stock', label: '库存少' },
  { value: 'out of stock', label: '缺货' },
];

export const PRODUCT_PUBLISH_OPTIONS = [
  { value: 'published', label: '发布' },
  { value: 'draft', label: '草稿' },
];

export const PRODUCT_SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'priceDesc', label: 'Price: High - Low' },
  { value: 'priceAsc', label: 'Price: Low - High' },
];

export const PRODUCT_CATEGORY_GROUP_OPTIONS = [
  { "group": "服装", "classify": ["衬衫", "T恤", "牛仔裤", "皮革", "配饰"] },
  { "group": "定制", "classify": ["西装", "夹克", "长裤", "背心", "服装"] },
  { "group": "配饰", "classify": ["鞋子", "背包和包", "手链", "口罩"] }
];

export const PRODUCT_CHECKOUT_STEPS = ['Cart', 'Billing & address', 'Payment'];
