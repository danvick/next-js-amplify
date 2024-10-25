import { defineStorage, secret } from '@aws-amplify/backend';

export const storage = defineStorage({
  name: 'amplifyTeamDrive'
});