/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class ApiJavascriptContract extends Contract {

    async apiJavascriptExists(ctx, apiJavascriptId) {
        const buffer = await ctx.stub.getState(apiJavascriptId);
        return (!!buffer && buffer.length > 0);
    }

    async createApiJavascript(ctx, apiJavascriptId, value) {
        const exists = await this.apiJavascriptExists(ctx, apiJavascriptId);
        if (exists) {
            throw new Error(`The api javascript ${apiJavascriptId} already exists`);
        }
        const asset = { value };
        const buffer = Buffer.from(JSON.stringify(asset));
        await ctx.stub.putState(apiJavascriptId, buffer);
    }

    async readApiJavascript(ctx, apiJavascriptId) {
        const exists = await this.apiJavascriptExists(ctx, apiJavascriptId);
        if (!exists) {
            throw new Error(`The api javascript ${apiJavascriptId} does not exist`);
        }
        const buffer = await ctx.stub.getState(apiJavascriptId);
        const asset = JSON.parse(buffer.toString());
        return asset;
    }

    async updateApiJavascript(ctx, apiJavascriptId, newValue) {
        const exists = await this.apiJavascriptExists(ctx, apiJavascriptId);
        if (!exists) {
            throw new Error(`The api javascript ${apiJavascriptId} does not exist`);
        }
        const asset = { value: newValue };
        const buffer = Buffer.from(JSON.stringify(asset));
        await ctx.stub.putState(apiJavascriptId, buffer);
    }

    async deleteApiJavascript(ctx, apiJavascriptId) {
        const exists = await this.apiJavascriptExists(ctx, apiJavascriptId);
        if (!exists) {
            throw new Error(`The api javascript ${apiJavascriptId} does not exist`);
        }
        await ctx.stub.deleteState(apiJavascriptId);
    }

}

module.exports = ApiJavascriptContract;
