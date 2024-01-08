// import { APIGatewayProxyEvent, Context } from 'aws-lambda';

// export default async function lambdaHandler(event: APIGatewayProxyEvent, context: Context): Promise<string> {
//     console.log(event, context);
//     return 'Hello from SAM and the CDK!';
// }

import { Handler } from 'aws-lambda';

export const handler: Handler = async (event, context) => {
    console.log('EVENT: \n' + JSON.stringify(event, null, 2));
    return context.logStreamName;
};





// import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
// const url = 'https://aws.amazon.com/';
// export const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
//     try {
//         // fetch is available with Node.js 18
//         const res = await fetch(url);
//         return {
//             statusCode: res.status,
//             body: JSON.stringify({
//                 message: await res.text(),
//             }),
//         };
//     } catch (err) {
//         console.log(err);
//         return {
//             statusCode: 500,
//             body: JSON.stringify({
//                 message: 'some error happened',
//             }),
//         };
//     }
// };