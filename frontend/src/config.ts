const config = {
	MAX_ATTACHMENT_SIZE: 5000000,
	STRIPE_KEY: "pk_test_51KMSJCHNYCMDFkAF4zrmSD5h8Cv4g3hIvyuIxmHPKkA0hvOB5mA47wqpCv7BM2c4XzJXb7OxAQW9XiYkWctRE8jr00rHnIHFGZ",
  // Backend config
  s3: {
    REGION: process.env.REACT_APP_REGION,
    BUCKET: process.env.REACT_APP_BUCKET,
  },
  apiGateway: {
    REGION: process.env.REACT_APP_REGION,
    URL: process.env.REACT_APP_API_URL,
  },
  cognito: {
    REGION: process.env.REACT_APP_REGION,
    USER_POOL_ID: process.env.REACT_APP_USER_POOL_ID,
    APP_CLIENT_ID: process.env.REACT_APP_USER_POOL_CLIENT_ID,
    IDENTITY_POOL_ID: process.env.REACT_APP_IDENTITY_POOL_ID,
  },
};

export default config;