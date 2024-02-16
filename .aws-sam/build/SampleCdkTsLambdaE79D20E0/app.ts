import { Handler } from 'aws-lambda';

// export const handler: Handler = async (event, context) => {
//     console.log('EVENT: \n' + JSON.stringify(event, null, 2));
//     return context.logStreamName;
// };

import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
const url = 'https://aws.amazon.com/';

export const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    console.log('lambdaHandler invoked');
    const response: APIGatewayProxyResult = {
        statusCode: 200,
        body: JSON.stringify({ message: `hello world` }),
        headers: {
            'Content-Type': 'application/json',
        },
    };

    return response;

    // try {
    //     // fetch is available with Node.js 18
    //     const res = await fetch(url);
    //     return {
    //         statusCode: res.status,
    //         body: JSON.stringify({
    //             message: await res.text(),
    //         }),
    //     };
    // } catch (err) {
    //     console.log(err);
    //     return {
    //         statusCode: 500,
    //         body: JSON.stringify({
    //             message: 'some error happened',
    //         }),
    //     };
    // }
};

// async function handler(event: APIGatewayProxyEvent, context: Context) {

//     const response: APIGatewayProxyResult = {
//       statusCode: 200,
//       body: JSON.stringify(`Hello from lambda`),
//     };

//     return response;
//   }
