// import { ChatOpenAI } from "@langchain/openai";
// // eslint-disable-next-line import/no-extraneous-dependencies
// import { createReactAgent } from "@langchain/langgraph/prebuilt";
// // eslint-disable-next-line import/no-extraneous-dependencies
// import { tool } from "@langchain/core/tools";
// import { z } from "zod";
//
//
//
//
// const inventoryTool = tool(
//   async (input) => {
//     const mockData = {
//       "outdoor-backpack-001": {
//         product_id: "outdoor-backpack-001",
//         product_name: "专业户外登山背包",
//         price: 599.00,
//         promotion: "满500减50"
//       }
//     };
//     // @ts-ignore
//     return mockData[input.product_id];
//   },
//   {
//     name: "query_inventory",
//     description: "查询产品库存信息",
//     schema: z.object({
//       product_id: z.string().describe("需要查询的产品ID")
//     })
//   }
// );
//
// const ProductRecommendationSchema = z.object({
//   product_id: z.string().describe("唯一产品标识符"),
//   product_name: z.string().describe("产品全称"),
//   price: z.number().describe("当前售价（单位：元）"),
//   promotion: z.string().optional().describe("促销信息")
// });
//
// // export const agent = createReactAgent({
// //   llm: new ChatOpenAI({
// //     model: "deepseek-chat",
// //     temperature: 0.2
// //   }),
// //   tools: [inventoryTool],
// //   responseFormat: ProductRecommendationSchema,
// //   stateModifier: "你是专注户外装备的智能导购，仅返回JSON格式的产品信息"
// // });
//
