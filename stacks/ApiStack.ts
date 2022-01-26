import * as sst from "@serverless-stack/resources";
import { Construct } from "constructs";

export default class ApiStack extends sst.Stack {
  // Public reference to the API
  api;

  constructor(scope: Construct, id: string, props: any) {
    super(scope, id, props);

    const { table } = props;

    // Create the API
    this.api = new sst.Api(this, "Api", {
      defaultFunctionProps: {
        environment: {
          TABLE_NAME: table.tableName,
        },
      },
      routes: {
				"GET    /notes/{id}": "src/get.main",
				"PUT    /notes/{id}": "src/update.main",
				"DELETE /notes/{id}": "src/delete.main",
				"GET    /notes": "src/list.main",
        "POST   /notes": "src/create.main",
      },
    });

    // Allow the API to access the table
    this.api.attachPermissions([table]);

    // Show the API endpoint in the output
    this.addOutputs({
      ApiEndpoint: this.api.url,
    });
  }
}