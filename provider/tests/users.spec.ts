import { Verifier } from '@pact-foundation/pact';
import { describe, it } from 'vitest';
import { createApp } from '../src/index';
import { userRepository } from '../src/repository/UserRepository';

const defaultUsers = [
    { id: 1, name: "Lucas", email: "lucas.thomaz@example.com" },
    { id: 2, name: "John", email: "john.doe@example.com" }
];

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
                'user exists': async () => {
                    userRepository.seed([{ id: 1, name: "Lucas", email: "lucas.thomaz@example.com" }]);
                },

                'contains users': async () => {
                    userRepository.seed(defaultUsers);
                },

                'repository is empty': async () => {
                    userRepository.clear();
                }
            }
        }).verifyProvider();
        } finally {
        server.close();
        }
    });
});