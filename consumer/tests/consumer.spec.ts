import { PactV3, MatchersV3 } from '@pact-foundation/pact'
import { describe, it, expect } from 'vitest'
import { UserClient } from '../src/index'

const {like, regex} = MatchersV3;

const mockProvider = new PactV3({
    consumer: 'Frontend',
    provider: 'UsersAPI'
});

describe('UserClient Test', () => {
    it('should search a user', async () => {
        mockProvider
        .given('user 1 exists')
        .uponReceiving('a request to get user 1')
        .withRequest({
            method: 'GET',
            path: '/users/1'
        })
        .willRespondWith({
            status: 200,
            body: {
                id: like(1),
                name: like('Lucas'),
                email: regex('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$', 'lucas.thomaz@example.com')
            }
        });

        await mockProvider.executeTest(async (mockServer) => {
            const client = new UserClient(mockServer.url);
            const user = await client.getUserById(1);
            expect(user).toEqual({
                id: 1,
                name: 'Lucas',
                email: 'lucas.thomaz@example.com'
            });
        });
    });

    it('should search all users', async () => {
        mockProvider
        .given('users exist')
        .uponReceiving('a request to get all users')
        .withRequest({
            method: 'GET',
            path: '/users'
        })
        .willRespondWith({
            status: 200,
            body: like([
                {
                    id: like(1),
                    name: like('Lucas'),
                    email: regex('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$', 'lucas.thomaz@example.com')
                },
                {
                    id: like(2),
                    name: like('John'),
                    email: regex('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$', 'john.doe@example.com')
                }
            ])
        });

        await mockProvider.executeTest(async (mockServer) => {
            const client = new UserClient(mockServer.url);
            const users = await client.getAllUsers();
            expect(users).toEqual([
                {
                    id: 1,
                    name: 'Lucas',
                    email: 'lucas.thomaz@example.com'
                },
                {
                    id: 2,
                    name: 'John',
                    email: 'john.doe@example.com'
                }
            ]);
        });
    });
});