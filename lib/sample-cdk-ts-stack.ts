import { Duration, Stack, StackProps, CfnOutput } from 'aws-cdk-lib';
// import * as sns from 'aws-cdk-lib/aws-sns';
// import * as subs from 'aws-cdk-lib/aws-sns-subscriptions';
// import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';

import { HttpLambdaIntegration } from 'aws-cdk-lib/aws-apigatewayv2-integrations';
import { HttpApi, CorsHttpMethod, HttpMethod } from 'aws-cdk-lib/aws-apigatewayv2';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';

import { Construct } from 'constructs';

import { Function, FunctionProps } from 'aws-cdk-lib/aws-lambda';

export class SampleLambda extends Function {
    constructor(scope: Construct, id: string, prop?: FunctionProps) {
        super(scope, id, {
            runtime: lambda.Runtime.NODEJS_20_X,
            code: lambda.Code.fromAsset('./testFunction'),
            // handler: 'app.handler',
            handler: 'app.lambdaHandler',
        });
    }
}

export class SampleCdkTsStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        // const queue = new sqs.Queue(this, 'SampleCdkTsQueue', {
        //   visibilityTimeout: Duration.seconds(300)
        // });

        // const topic = new sns.Topic(this, 'SampleCdkTsTopic');

        // topic.addSubscription(new subs.SqsSubscription(queue));

        // const lambdaFct = new lambda.Function(this, 'SampleCdkTsLambda', {
        //     code: lambda.InlineCode.fromInline(`
        //         exports.handler = async (event) => {
        //             console.log('Hello from Lambda!');
        //             return {
        //                 statusCode: 200,
        //                 body: JSON.stringify({
        //                 message: 'Hello!'
        //                 })
        //             };
        //         }
        //     `),
        //     runtime: lambda.Runtime.NODEJS_20_X,
        //     handler: 'index.handler',
        // });

        const lambdaFct = new lambda.Function(this, 'SampleCdkTsLambda', {
            code: lambda.Code.fromAsset('./testFunction'),
            runtime: lambda.Runtime.NODEJS_20_X,
            handler: 'app.lambdaHandler',
            // handler: 'app.handler'
            // code: lambda.Code.fromAsset(path.join(__dirname, 'new-aws-lambda-handler')),
        });

        // const lambdaFct = new SampleLambda(this, 'SampleCdkTsLambda', {
        //     code: lambda.Code.fromAsset('./testFunction'),
        //     runtime: lambda.Runtime.NODEJS_20_X,
        //     handler: 'app.lambdaHandler',
        //     // handler: 'app.handler',
        //     // code: lambda.Code.fromAsset(path.join(__dirname, 'new-aws-lambda-handler')),
        // });

        // const api = new apigateway.RestApi(this, 'test-api', {
        //     restApiName: 'Test Service',
        //     description: 'This service tests lambda integration.',
        // });

        // const LambdaIntegration = new apigateway.LambdaIntegration(lambdaFct, {
        //     requestTemplates: { 'application/json': '{ "statusCode": "200" }' },
        // });

        // api.root.addMethod('GET', LambdaIntegration);

        //------------------------
        // const api = new apigw.RestApi(this, `GhastApiGateway`, {
        //     restApiName: `ghast-api`,
        //     deployOptions: {
        //       metricsEnabled: true,
        //       loggingLevel: apigw.MethodLoggingLevel.INFO,
        //       dataTraceEnabled: true,
        //     },
        //     cloudWatchRole: true,
        //   });
        //------------------------
        // Create an API Gateway
        const httpApi = new HttpApi(this, 'MyApi', {
            apiName: 'My API',
            corsPreflight: {
                allowMethods: [CorsHttpMethod.GET, CorsHttpMethod.DELETE, CorsHttpMethod.PUT, CorsHttpMethod.POST],
                allowOrigins: ['*'],
            },
        });

        const templateLambdaIntegration = new HttpLambdaIntegration('TemplateIntegration', lambdaFct);

        // Create a resource and method for the API
        httpApi.addRoutes({
            path: '/invoke',
            methods: [HttpMethod.GET],
            integration: templateLambdaIntegration,
        });

        // Output the API endpoint URL
        new CfnOutput(this, 'ApiEndpoint', {
            value: httpApi.apiEndpoint,
        });
    }
}
