import StorageStack from "./StorageStack";

export default function main(app: any) {
  new StorageStack(app, "storage", undefined);
}