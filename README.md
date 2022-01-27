# Getting Started with Serverless Stack (SST)

This project was bootstrapped with [Create Serverless Stack](https://docs.serverless-stack.com/packages/create-serverless-stack).

Start by installing the dependencies.

```bash
$ npm install
```

## Commands

### `npm run start`

Starts the local Lambda development environment.

### `npm run build`

Build your app and synthesize your stacks.

Generates a `.build/` directory with the compiled files and a `.build/cdk.out/` directory with the synthesized CloudFormation stacks.

### `npm run deploy [stack]`

Deploy all your stacks to AWS. Or optionally deploy a specific stack.

### `npm run remove [stack]`

Remove all your stacks and all of their resources from AWS. Or optionally remove a specific stack.

### `npm run test`

Runs your tests using Jest. Takes all the [Jest CLI options](https://jestjs.io/docs/en/cli).

## Documentation

Learn more about the Serverless Stack.

- [Docs](https://docs.serverless-stack.com)
- [@serverless-stack/cli](https://docs.serverless-stack.com/packages/cli)
- [@serverless-stack/resources](https://docs.serverless-stack.com/packages/resources)

## Codebase with PRs

### Init branch - main
### Main branch - master

1. Create crud API - branch `sst-dynamo-db-table` [https://github.com/yahor-mikheyenka-wttech/aws-sst-app/tree/sst-dynamo-db-table]

2. Create User Authorization `ftr/user-auth` [https://github.com/yahor-mikheyenka-wttech/aws-sst-app/tree/ftr/user-auth]

3. Connect with third party API `ftr/secrets-stripe` [https://github.com/yahor-mikheyenka-wttech/aws-sst-app/tree/ftr/secrets-stripe]

4. Adding unit tests `ftr/unit-tests` [https://github.com/yahor-mikheyenka-wttech/aws-sst-app/tree/ftr/unit-tests]

5. CORS for S3 `ftr/cors-s3` [https://github.com/yahor-mikheyenka-wttech/aws-sst-app/tree/ftr/cors-s3]

6. Setting up React app `ftr/setup-react` [https://github.com/yahor-mikheyenka-wttech/aws-sst-app/tree/ftr/setup-react]