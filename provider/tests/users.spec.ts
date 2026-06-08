import { Verifier } from '@pact-foundation/pact';
import { describe, it } from 'vitest';
import { createApp } from '../src/index';

describe('Provider tests', () => {
    it('should validade the pact contract', async () => {
        const app = createApp();
        const server = app.listen(4000)
        try {
        await new Verifier({
            providerBaseUrl: 'http://localhost:4000',
            pactUrls: [
            './pacts/Frontend-UsersAPI.json'
            ],
            stateHandlers: {
                'user 1 exists': async () => {},
                'users exist': async () => {}
            }
        }).verifyProvider();
        } finally {
        server.close();
        }
    });
});