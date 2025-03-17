export const environment = {
  production: false,
  msalConfig: {
    auth: {
      clientId: 'f91862e1-1cd5-403b-ae22-b1570a6da1cc',
      authority: 'https://login.microsoftonline.com/6d84d1ee-85b2-4d44-ae75-f00043b17ddd',
    },
  },
  authConfig: {
    apiScope: 'api://f91862e1-1cd5-403b-ae22-b1570a6da1cc/access_as_user',
  }
}
