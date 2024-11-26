import { defineBackend } from "@aws-amplify/backend";
import { auth } from "./auth/resource.js";
import { data } from "./data/resource.js";
import { storage } from "./storage/resource.js";

const backend = defineBackend({
  auth,
  data,
  storage,
});

// create a domain
const userPool = backend.auth.resources.userPool


userPool.addClient('my-app-client', {
  oAuth: {
    flows: {
      authorizationCodeGrant: true,
      implicitCodeGrant: true,
    },
    callbackUrls: ['http://localhost:3001/callback','http://localhost:3001/landing'],
    logoutUrls:  ['http://localhost:3001/callback','http://localhost:3001/landing']
  }
})

// const userPoolClient = backend.auth.resources.userPoolClient
// get backend name
// const backendName = backend.auth.resources.userPool.node.tryGetContext("amplify-backend-name")

const branchName = process.env.BranchName
const domainPrefix = `test-app-domain-9eiif8`
const domain = userPool.addDomain("myAppDomain", {
  cognitoDomain: {
    domainPrefix: domainPrefix
  }
})

console.log("domain name = ", domain)
