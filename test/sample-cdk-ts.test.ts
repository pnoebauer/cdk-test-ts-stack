import * as cdk from 'aws-cdk-lib';
import { Template, Match } from 'aws-cdk-lib/assertions';
import * as SampleCdkTs from '../lib/sample-cdk-ts-stack';
import { Construct } from 'constructs';
import { expect, describe, it } from '@jest/globals';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

import { lambdaHandler } from '../lambdaFunction/app';

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

describe('Tests index', function () {
    it('verifies successful response', async () => {
        const event: APIGatewayProxyEvent = {
            httpMethod: 'get',
            body: '',
            headers: {},
            isBase64Encoded: false,
            multiValueHeaders: {},
            multiValueQueryStringParameters: {},
            path: '/hello',
            pathParameters: {},
            queryStringParameters: {},
            requestContext: {
                accountId: '123456789012',
                apiId: '1234',
                authorizer: {},
                httpMethod: 'get',
                identity: {
                    accessKey: '',
                    accountId: '',
                    apiKey: '',
                    apiKeyId: '',
                    caller: '',
                    clientCert: {
                        clientCertPem: '',
                        issuerDN: '',
                        serialNumber: '',
                        subjectDN: '',
                        validity: { notAfter: '', notBefore: '' },
                    },
                    cognitoAuthenticationProvider: '',
                    cognitoAuthenticationType: '',
                    cognitoIdentityId: '',
                    cognitoIdentityPoolId: '',
                    principalOrgId: '',
                    sourceIp: '',
                    user: '',
                    userAgent: '',
                    userArn: '',
                },
                path: '/hello',
                protocol: 'HTTP/1.1',
                requestId: 'c6af9ac6-7b61-11e6-9a41-93e8deadbeef',
                requestTimeEpoch: 1428582896000,
                resourceId: '123456',
                resourcePath: '/hello',
                stage: 'dev',
            },
            resource: '',
            stageVariables: {},
        };
        const context = {
            awsRequestId: 'id',
            callbackWaitsForEmptyEventLoop: false,
            functionName: 'functionName',
            memoryLimitInMB: '1024',
            invokedFunctionArn: 'arn:aws:lambda:us-east-1:123456789012:function:functionName'
        };

        const result: APIGatewayProxyResult = await lambdaHandler(event);

        expect(result.statusCode).toEqual(200);
        expect(result.body).toEqual(
            JSON.stringify({
                message: 'hello world',
            })
        );
    });
});
