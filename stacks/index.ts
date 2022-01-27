import StorageStack from "./StorageStack";
import ApiStack from "./ApiStack";
import AuthStack from "./AuthStack"
import FrontendStack from "./FrontendStack";
import { Construct } from "constructs";

export default function main(app: Construct) {
  const storageStack = new StorageStack(app, "storage-ym");

  const apiStack = new ApiStack(app, "api-ym", {
    table: storageStack.table,
  });

	const authStack = new AuthStack(app, "auth-ym", {
    api: apiStack.api,
    bucket: storageStack.bucket,
  });

	new FrontendStack(app, "frontend-ym", {
    api: apiStack.api,
    auth: authStack.auth,
    bucket: storageStack.bucket,
  });
}