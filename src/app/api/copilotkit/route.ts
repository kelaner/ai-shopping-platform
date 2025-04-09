import type {NextRequest} from 'next/server';

import {ChatOpenAI} from "@langchain/openai";
import {CopilotRuntime, LangChainAdapter, copilotRuntimeNextJSAppRouterEndpoint,} from '@copilotkit/runtime';

const model = new ChatOpenAI({
  model: "glm-4-flash",
  apiKey: process.env.ZHIPUAI_API_KEY,
  // temperature: 0.01,
  configuration: {
    baseURL: "https://open.bigmodel.cn/api/paas/v4/"
  }
});

const serviceAdapter = new LangChainAdapter({
  chainFn: async ({ messages, tools }) => {
    return model.bindTools(tools).stream(messages);
    // or optionally enable strict mode
    // return model.bindTools(tools, { strict: true }).stream(messages);
  }
});

const runtime = new CopilotRuntime();

export const POST = async (req: NextRequest) => {
  const {handleRequest} = copilotRuntimeNextJSAppRouterEndpoint({
    runtime,
    serviceAdapter,
    endpoint: '/api/copilotkit',
  });
  return handleRequest(req);
};


