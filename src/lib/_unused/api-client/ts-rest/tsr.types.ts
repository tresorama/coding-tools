import { type ClientInferResponseBody } from "@ts-rest/core";
import type { rootContract } from "./tsr.root-contract";

// The type of the API contract and and utils type to infer types
export type { ClientInferResponseBody };
export type RootContract = typeof rootContract;
