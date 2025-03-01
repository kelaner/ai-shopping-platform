import type {NextRequest} from 'next/server';

import {ChatOpenAI} from "@langchain/openai";
import {CopilotRuntime, LangChainAdapter, copilotRuntimeNextJSAppRouterEndpoint,} from '@copilotkit/runtime';

const model = new ChatOpenAI({
  model: "deepseek-chat",
  apiKey: process.env.DEEPSEEK_API_KEY,
  configuration: {
    baseURL: "https://api.deepseek.com/v1"
  }
});

const serviceAdapter = new LangChainAdapter({
  chainFn: async ({messages, tools}) => model.stream(messages)
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


