// This file can be replaced during build by using the `fileReplacements` array.
// When building for production, this file is replaced with `environment.prod.ts`.

import { firebaseConfig } from '@prepa-sn/shared/config';

export const environment = {
  production: false,
  apiUrl: 'http://localhost:1148/api/v1',
  firebase: {
    ...firebaseConfig,
  },
};
