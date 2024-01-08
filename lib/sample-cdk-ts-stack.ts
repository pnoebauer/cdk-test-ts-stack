import { Duration, Stack, StackProps } from 'aws-cdk-lib';
// import * as sns from 'aws-cdk-lib/aws-sns';
// import * as subs from 'aws-cdk-lib/aws-sns-subscriptions';
// import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as lambda from 'aws-cdk-lib/aws-lambda';


import { Construct } from 'constructs';

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

        new lambda.Function(this, 'SampleCdkTsLambda', {
            code: lambda.Code.fromAsset('./testFunction'),
            runtime: lambda.Runtime.NODEJS_20_X,
            handler: 'app.handler'

            // code: lambda.Code.fromAsset(path.join(__dirname, 'new-aws-lambda-handler')),
        });
    }
}
