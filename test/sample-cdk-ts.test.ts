import * as cdk from 'aws-cdk-lib';
import { Template, Match } from 'aws-cdk-lib/assertions';
import * as SampleCdkTs from '../lib/sample-cdk-ts-stack';
import { Construct } from 'constructs';

// test('SQS Queue and SNS Topic Created', () => {
//   const app = new cdk.App();
//   // WHEN
//   const stack = new SampleCdkTs.SampleCdkTsStack(app, 'MyTestStack');
//   // THEN
//
//   const template = Template.fromStack(stack);
//
//   template.hasResourceProperties('AWS::SQS::Queue', {
//     VisibilityTimeout: 300
//   });
//   template.resourceCountIs('AWS::SNS::Topic', 1);
// });

describe('SampleCdkTsStack', () => {
    const app = new cdk.App();

    const stack = new SampleCdkTs.SampleCdkTsStack(app, 'MyTestStack');

    const template = Template.fromStack(stack);
    test('Lambda Created', () => {
        template.hasResourceProperties('AWS::Lambda::Function', {
            // validate lambda properties
            // Handler: 'app.handler',
            Handler: 'app.lambdaHandler',
        });
        template.resourceCountIs('AWS::Lambda::Function', 1);
    });

    //   test('Api Gateway Created', () => {

    //     // template.hasResourceProperties('AWS::ApiGateway::RestApi', {
    //     //     // validate lambda properties
    //     //     Name: 'test-api'
    //     // });
    //     template.resourceCountIs('AWS::ApiGateway::RestApi', 1);
    // });
});
