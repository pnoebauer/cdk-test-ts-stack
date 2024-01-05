#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { CdkSamTsExampleStack } from '../lib/cdk-sam-ts-example-stack';

const app = new cdk.App();
new CdkSamTsExampleStack(app, 'CdkSamTsExampleStack');
