# Welcome to your CDK TypeScript project

You should explore the contents of this project. It demonstrates a CDK app with an instance of a stack (`SampleCdkTsStack`)
which contains an Amazon SQS queue that is subscribed to an Amazon SNS topic.

The `cdk.json` file tells the CDK Toolkit how to execute your app.



## Useful commands

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
* `cdk synth --no-staging` 
* `sam validate -t ./cdk.out/SampleCdkTsStack.template.json` validate the template
* `sam local invoke SampleCdkTsLambda --no-event -t ./cdk.out/SampleCdkTsStack.template.json -d 5858` invoke lambda and keep container running for debugging
* `sam local start-api -t ./cdk.out/SampleCdkTsStack.template.json` run api locally
* `http://127.0.0.1:3000/invoke` invoke running api gateway here

### In case a docker not connected error is thrown

* `docker context ls`   copy the DOCKER_ENDPOINT (unix:///Users/{myuser}/.docker/run/docker.sock)
* `export DOCKER_HOST=unix:///Users/{myuser}/.colima/default/docker.sock`
* `export DOCKER_HOST=$(docker context inspect | jq -r '.[0].Endpoints.docker.Host')`
* `DOCKER_HOST=DOCKER_ENDPOINT sam local invoke SampleCdkTsLambda --no-event -t ./cdk.out/SampleCdkTsStack.template.json`

### Alternatively create a symlink

* `sudo ln -sf "$HOME/.docker/run/docker.sock" /var/run/docker.sock`
* `sam local invoke SampleCdkTsLambda --no-event -t ./cdk.out/SampleCdkTsStack.template.json`
