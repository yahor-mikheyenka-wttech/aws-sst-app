import StorageStack from "./StorageStack";
import ApiStack from "./ApiStack";
import AuthStack from "./AuthStack"
import { Construct } from "constructs";

export default function main(app: Construct) {
  const storageStack = new StorageStack(app, "storage-ym");

  const apiStack = new ApiStack(app, "api-ym", {
    table: storageStack.table,
  });

	new AuthStack(app, "auth-ym", {
    api: apiStack.api,
    bucket: storageStack.bucket,
  });
}