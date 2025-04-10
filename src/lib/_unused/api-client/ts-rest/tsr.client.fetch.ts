// This is an API client that can be used by:
// - frontend YES
// - backend YES

import { initClient, tsRestFetchApi } from "@ts-rest/core";
import { rootContract } from "@/lib/_unused/api-client/ts-rest/tsr.root-contract";
import { VITE_API_SERVER_URL } from "@/constants";

// `contract` is the AppRouter returned by `c.router`
export const tsr = initClient(rootContract, {
  baseUrl: `${VITE_API_SERVER_URL}`,
  // baseHeaders: {},
  // throwOnUnknownStatus: true,
  api: async (args) => {
    // log every fetch request on the browser console
    console.log({
      what: "apiClient fetch",
      args,
    });
    return tsRestFetchApi(args);
  },
});

/*
- infer types of response

import {ClientInferResponseBody, RootContract} from "./tsr.types";
type CustomerResponseBody = ClientInferResponseBody<RootContract['sales']['customer'], 200>;


- fetch example

const { body, status } = await client.createPost({
  body: {
    title: 'Post Title',
    body: 'Post Body',
  },
});

if (status === 201) {
  // body is Post
  console.log(body);
} else {
  // body is unknown
  console.log(body);
}

*/