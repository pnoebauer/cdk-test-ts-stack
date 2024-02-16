# Welcome to your CDK TypeScript project

You should explore the contents of this project. It demonstrates a CDK app with an instance of a stack (`SampleCdkTsStack`)
which contains an Amazon SQS queue that is subscribed to an Amazon SNS topic.

The `cdk.json` file tells the CDK Toolkit how to execute your app.


## Useful commands
<!-- https://cdkworkshop.com/ -->
* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template
* `cdk bootstrap --show-template > tpl.yaml`       bootstrap cfn template that creates resources required by cdk to deploy a cfn stack

## Local testing
emits the synthesized CloudFormation template excluding resources such as the S3 buckets containing lambda function code and cfn templates
* `npm run watch` in separate terminal
* `cdk synth --no-staging` builds the cfn template
* `sam validate -t ./cdk.out/SampleCdkTsStack.template.json` validate the template
* `sam local invoke SampleCdkTsLambda --no-event -t ./cdk.out/SampleCdkTsStack.template.json -d 5858` invoke lambda and keep container running for debugging
* `sam local start-api -t ./cdk.out/SampleCdkTsStack.template.json --port 3000` run api locally (code changes detected automatically; only needs to be restarted on cfn infra updates)
* `curl http://127.0.0.1:3000/invoke` invoke running api gateway here
* `sam local start-lambda -t ./cdk.out/SampleCdkTsStack.template.json` start a local endpoint that emulates AWS Lambda


### In case a docker not connected error is thrown

* `docker context ls`   copy the DOCKER_ENDPOINT (unix:///Users/{myuser}/.docker/run/docker.sock)
* `export DOCKER_HOST=unix:///Users/{myuser}/.colima/default/docker.sock`
* `export DOCKER_HOST=$(docker context inspect | jq -r '.[0].Endpoints.docker.Host')`
* `DOCKER_HOST=DOCKER_ENDPOINT sam local invoke SampleCdkTsLambda --no-event -t ./cdk.out/SampleCdkTsStack.template.json`

### Alternatively create a symlink

* `sudo ln -sf "$HOME/.docker/run/docker.sock" /var/run/docker.sock`
* `sam local invoke SampleCdkTsLambda --no-event -t ./cdk.out/SampleCdkTsStack.template.json`



# SAM
## Deploy the sample application

The Serverless Application Model Command Line Interface (SAM CLI) is an extension of the AWS CLI that adds functionality for building and testing Lambda applications. It uses Docker to run your functions in an Amazon Linux environment that matches Lambda. It can also emulate your application's build environment and API.

To build and deploy your application for the first time, run the following in your shell:

```bash
sam build -t ./cdk.out/SampleCdkTsStack.template.json
sam deploy --guided
```

The first command will build the source of your application. The second command will package and deploy your application to AWS, with a series of prompts:

* **Stack Name**: The name of the stack to deploy to CloudFormation. This should be unique to your account and region, and a good starting point would be something matching your project name.
* **AWS Region**: The AWS region you want to deploy your app to.
* **Confirm changes before deploy**: If set to yes, any change sets will be shown to you before execution for manual review. If set to no, the AWS SAM CLI will automatically deploy application changes.
* **Allow SAM CLI IAM role creation**: Many AWS SAM templates, including this example, create AWS IAM roles required for the AWS Lambda function(s) included to access AWS services. By default, these are scoped down to minimum required permissions. To deploy an AWS CloudFormation stack which creates or modifies IAM roles, the `CAPABILITY_IAM` value for `capabilities` must be provided. If permission isn't provided through this prompt, to deploy this example you must explicitly pass `--capabilities CAPABILITY_IAM` to the `sam deploy` command.
* **Save arguments to samconfig.toml**: If set to yes, your choices will be saved to a configuration file inside the project, so that in the future you can just re-run `sam deploy` without parameters to deploy changes to your application.

You can find your API Gateway Endpoint URL in the output values displayed after deployment.

## Use the SAM CLI to build and test locally

Build your application with the `sam build` command.

```bash
sam build
```

The SAM CLI installs dependencies defined in `hello-world/package.json`, compiles TypeScript with esbuild, creates a deployment package, and saves it in the `.aws-sam/build` folder.

Test a single function by invoking it directly with a test event. An event is a JSON document that represents the input that the function receives from the event source. Test events are included in the `events` folder in this project.

Run functions locally and invoke them with the `sam local invoke` command.

```bash
sam local invoke HelloWorldFunction --event events/event.json
```

The SAM CLI can also emulate your application's API. Use the `sam local start-api` to run the API locally on port 3000.

```bash
sam local start-api
curl http://localhost:3000/
```

The SAM CLI reads the application template to determine the API's routes and the functions that they invoke. The `Events` property on each function's definition includes the route and method for each path.

```yaml
      Events:
        HelloWorld:
          Type: Api
          Properties:
            Path: /hello
            Method: get
```

## Add a resource to your application
The application template uses AWS Serverless Application Model (AWS SAM) to define application resources. AWS SAM is an extension of AWS CloudFormation with a simpler syntax for configuring common serverless application resources such as functions, triggers, and APIs. For resources not included in [the SAM specification](https://github.com/awslabs/serverless-application-model/blob/master/versions/2016-10-31.md), you can use standard [AWS CloudFormation](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-template-resource-type-ref.html) resource types.

## Fetch, tail, and filter Lambda function logs

To simplify troubleshooting, SAM CLI has a command called `sam logs`. `sam logs` lets you fetch logs generated by your deployed Lambda function from the command line. In addition to printing the logs on the terminal, this command has several nifty features to help you quickly find the bug.

`NOTE`: This command works for all AWS Lambda functions; not just the ones you deploy using SAM.

```bash
sam logs -n HelloWorldFunction --stack-name sam-app --tail
```

You can find more information and examples about filtering Lambda function logs in the [SAM CLI Documentation](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-logging.html).

```

## Cleanup

To delete the sample application that you created, use the AWS CLI. Assuming you used your project name for the stack name, you can run the following:

```bash
sam delete --stack-name sam-app
```
