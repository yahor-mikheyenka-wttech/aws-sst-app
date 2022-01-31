import { Storage } from "aws-amplify";

 const s3Upload = async (file: any) => {
  const filename = `${Date.now()}-${file.name}`;

  const stored = await Storage.vault.put(filename, file, {
    contentType: file.type,
  });

  return stored.key;
}

export default s3Upload;