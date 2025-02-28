import axios, { endpoints } from 'src/utils/axios';

import { CONFIG } from 'src/config-global';

import { ProductEditView } from 'src/sections/product/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Product edit | Dashboard - ${CONFIG.site.name}` };

type Props = {
  params: { id: string };
};

export default async function Page({ params }: Props) {
  const { id } = params;

  const { product } = await getProduct(id);

  return <ProductEditView product={product} />;
}

// ----------------------------------------------------------------------

async function getProduct(id: string) {
  if (!id) {
    console.error("Invalid product ID");
    return { product: null }; // 返回默认值或抛出错误
  }

  const URL = `${endpoints.product.details}?productId=${id}`;
  try {
    const res = await axios.get(URL, { timeout: 10000 }); // 设置超时时间为 10 秒
    return res.data;
  } catch (error) {
    console.error("Failed to fetch product:", error);
    return { product: null }; // 或抛出自定义错误
  }
}

/**
 * [1] Default
 * Remove [1] and [2] if not using [2]
 */
const dynamic = CONFIG.isStaticExport ? 'auto' : 'force-dynamic';

export { dynamic };

/**
 * [2] Static exports
 * https://nextjs.org/docs/app/building-your-application/deploying/static-exports
 */
export async function generateStaticParams() {
  if (CONFIG.isStaticExport) {
    const res = await axios.get(endpoints.product.list);

    return res.data.products.map((product: { id: string }) => ({ id: product.id }));
  }
  return [];
}
