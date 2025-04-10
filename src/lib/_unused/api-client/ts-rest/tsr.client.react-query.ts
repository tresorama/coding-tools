// This is an API client that can be used by:
// - frontend YES
// - backend NO

import { initTsrReactQuery, isFetchError, isUnknownErrorResponse, isNotKnownResponseError } from "@ts-rest/react-query/v5";
import { rootContract } from "@/lib/_unused/api-client/ts-rest/tsr.root-contract";
import { VITE_API_SERVER_URL } from "@/constants";

// api client that wrap react query
export const tsr = initTsrReactQuery(rootContract, {
  baseUrl: `${VITE_API_SERVER_URL}`,
  // baseHeaders: {
  //   "x-ts-rest--static": "hello",
  //   "x-ts-rest--dynamic": () => Math.random().toString(),
  //   "x-supabase-access-token": () => {
  //     const accessToken = AUTH_ACCESS_TOKEN_IN_LOCAL_STORAGE_REPLICA.value;
  //     return accessToken ?? '';
  //   }
  // },
  // throwOnUnknownStatus: true,
  // 
  // jsonQuery 
  // NOTE: if jsonQuery is true, ensure that also the server set jsonQuery to true
  // true means that the query params will be converted to JSON
  // before creating the request query string
  // i.e. jsonQuery true
  // input => type: ["track","album"]
  // querystring => ?type=["track","album"]
  // i.e. jsonQuery false
  // input => type: ["track","album"]
  // querystring => ?type[0]=track&type[1]=album
  jsonQuery: true,
});

// utils functions that you need to use to handle react query "error" prop
// @see https://ts-rest.com/docs/react-query/error-handling
export const tsrErrorUtils = {
  isFetchError,
  isUnknownErrorResponse,
  isNotKnownResponseError
};


/*
- infer types of response

import {ClientInferResponseBody, RootContract} from "./tsr.types";
type CustomerResponseBody = ClientInferResponseBody<RootContract['sales']['customer'], 200>;


- fetch example

export const Index = () => {
  const { data, isLoading, error } = client.getPost.useQuery(["posts/1"], {
    params: { id: '1' },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (data.status !== 200 || error) {
    return <div>Error</div>;
  }

  return <div>{data.body.title}</div>;
};

*/