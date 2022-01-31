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
		// npx sst deploy --stage prod - see here how to configure custom domain (https://serverless-stack.com/chapters/purchase-a-domain-with-route-53.html)
			customDomain:				
				scope.stage === "prod" ? "api.my-serverless-app.com" : undefined,
			defaultAuthorizationType: "AWS_IAM",
      defaultFunctionProps: {
        environment: {
          TABLE_NAME: table.tableName,
					STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
        },
      },
      routes: {
				// CRUD
				"GET    /notes/{id}": "src/get.main",
				"GET    /notes": "src/list.main",
				"PUT    /notes/{id}": "src/update.main",
        "POST   /notes": "src/create.main",
				"DELETE /notes/{id}": "src/delete.main",
				// stripe api
				"POST   /billing": "src/billing.main",
      },
    });

    // Allow the API to access the table
    this.api.attachPermissions([table]);

    // Show the API endpoint in the output
    this.addOutputs({
			ApiEndpoint: this.api.customDomainUrl || this.api.url,
		});
  }
}