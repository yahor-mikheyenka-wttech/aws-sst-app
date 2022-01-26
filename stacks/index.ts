import StorageStack from "./StorageStack";
import ApiStack from "./ApiStack";
import { Construct } from "constructs";

export default function main(app: Construct) {
  const storageStack = new StorageStack(app, "storage-ym");

  new ApiStack(app, "api-ym", {
    table: storageStack.table,
  });
}