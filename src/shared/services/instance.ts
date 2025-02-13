import type { Options, ResponsePromise } from 'ky';

import ky from 'ky';

const url = 'http://localhost:3000';

type Endpoint =
  | 'workspaces'
  | `workspaces/${string}`
  | 'groups'
  | `groups/${string}`
  | 'projects'
  | `projects/${string}`
  | 'projectColumns'
  | `projectColumns/${string}`;

interface ApiMethods {
  delete: <T>(url: Endpoint, options?: Options) => ResponsePromise<T>;
  get: <T>(url: Endpoint, options?: Options) => ResponsePromise<T>;
  patch: <T>(url: Endpoint, options?: Options) => ResponsePromise<T>;
  post: <T>(url: Endpoint, options?: Options) => ResponsePromise<T>;
}
const api = ky.create({
  prefixUrl: url,
  hooks: {
    beforeRequest: [
      async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log('delay in ky');
      },
    ],
  },
});

export const apiInstance: ApiMethods = {
  get: api.get,
  post: api.post,
  delete: api.delete,
  patch: api.patch,
};
