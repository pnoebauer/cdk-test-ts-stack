#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { SampleCdkTsStack } from '../lib/sample-cdk-ts-stack';

const app = new cdk.App();
new SampleCdkTsStack(app, 'SampleCdkTsStack');
