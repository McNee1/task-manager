import type { Options, ResponsePromise } from 'ky';

import ky from 'ky';

const url = 'http://localhost:3000';

type Endpoint = 'workspaces';

interface ApiMethods {
  get: <T>(url: Endpoint, options?: Options) => ResponsePromise<T>;
  post: <T>(url: Endpoint, options?: Options) => ResponsePromise<T>;
}
const api = ky.create({ prefixUrl: url });

export const apiInstance: ApiMethods = {
  get: api.get,
  post: api.post,
};
