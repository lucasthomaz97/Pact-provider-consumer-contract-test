import { PactV3, MatchersV3 } from '@pact-foundation/pact'
import { describe, it, expect } from 'vitest'
import { UserClient } from '../src/index'

const {like, eachLike, regex} = MatchersV3;

const mockProvider = new PactV3({
    consumer: 'Frontend',
    provider: 'UsersAPI'
});

describe('UserClient Test', () => {
    it('should search a user', async () => {
        mockProvider
        .given('user exists')
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
        .given('contains users')
        .uponReceiving('a request to get all users')
        .withRequest({
            method: 'GET',
            path: '/users'
        })
        .willRespondWith({
            status: 200,
            body: eachLike({
                id: like(1),
                name: like('Lucas'),
                email: regex('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$', 'lucas.thomaz@example.com')
            })
        });

        await mockProvider.executeTest(async (mockServer) => {
            const client = new UserClient(mockServer.url);
            const users = await client.getAllUsers();
            expect(users).toEqual([
                {
                    id: 1,
                    name: 'Lucas',
                    email: 'lucas.thomaz@example.com'
                }
            ]);
        });
    });

    it('should return 404 when user is not found', async () => {
        mockProvider
        .given('user exists')
        .uponReceiving('a request for a missing user')
        .withRequest({
            method: 'GET',
            path: '/users/777'
        })
        .willRespondWith({
            status: 404,
            body: {
                error: like('User not found')
            }
        });

        await mockProvider
        .executeTest(async (mockServer) => {
            const client = new UserClient(mockServer.url);
            await expect(client.getUserById(777)).rejects.toMatchObject({
                response: {
                    status: 404,
                    data: {
                        error: 'User not found'
                    }
                }
            });
        })
    });

    it('should create a new user', async () => {
        const newUser = {
            name: 'Duquesa',
            email: 'duquesa.dog@example.com'
        };

        mockProvider
        .given('contains users')
        .uponReceiving('a request to create a new user')
        .withRequest({
            method: 'POST',
            path: '/users',
            headers: {
                'Content-Type': 'application/json'
            },
            body: newUser
        })
        .willRespondWith({
            status: 201,
            body: {
                id: like(3),
                name: like('Duquesa'),
                email: regex('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$', 'duquesa.dog@example.com')
            }
        });

        await mockProvider.executeTest(async (mockServer) => {
            const client = new UserClient(mockServer.url);
            const createdUser = await client.createUser(newUser);
            expect(createdUser).toEqual({
                id: 3,
                name: 'Duquesa',
                email: 'duquesa.dog@example.com'
            });

        });

    });

    it('should return 400 when creating a user with invalid email', async () => {
        const invalidUser = {
            name: 'Mr Invalid',
            email: 'invalid-email'
        };

        mockProvider
        .given('contains users')
        .uponReceiving('a request to create a user with invalid data')
        .withRequest({
            method: 'POST',
            path: '/users',
            headers: {
                'Content-Type': 'application/json'
            },
            body: invalidUser
        })
        .willRespondWith({
            status: 400,
            body: {
                error: like('Invalid email format')
            }
        });

        await mockProvider.executeTest(async (mockServer) => {
            const client = new UserClient(mockServer.url);
            await expect(client.createUser(invalidUser)).rejects.toMatchObject({
                response: {
                    status: 400
                }
            });
        });
    });

    it('should return 409 when creating a user with an existing email', async () => {
        const existingUser = {
            name: 'Existing User',
            email: 'john.doe@example.com'
        };

        mockProvider
        .given('contains users')
        .uponReceiving('a request to create a user with an existing email')
        .withRequest({
            method: 'POST',
            path: '/users',
            headers: {
                'Content-Type': 'application/json'
            },
            body: existingUser
        })
        .willRespondWith({
            status: 409,
            body: {
                error: like('User with this email already exists')
            }
        });

        await mockProvider.executeTest(async (mockServer) => {
            const client = new UserClient(mockServer.url);
            await expect(client.createUser(existingUser)).rejects.toMatchObject({
                response: {
                    status: 409
                }
            });
        });
    });

    it('should return error 400 when creating an user with empty name', async () => {
        const invalidUser = {
            name: '',
            email: 'test@example.com'
        };

        mockProvider
        .given('contains users')
        .uponReceiving('a request to create a user with empty name')
        .withRequest({
            method: 'POST',
            path: '/users',
            headers: {
                'Content-Type': 'application/json'
            },
            body: invalidUser
        })
        .willRespondWith({
            status: 400,
            body: {
                error: like('Name and email are required')
            }
        });

        await mockProvider.executeTest(async (mockServer) => {
            const client = new UserClient(mockServer.url);
            await expect(client.createUser(invalidUser)).rejects.toMatchObject({
                response: {
                    status: 400
                }
            });
        });
    });

    it('should return error 400 when creating an user with empty email', async () => {
        const invalidUser = {
            name: 'Test User',
            email: ''
        };

        mockProvider
        .given('contains users')
        .uponReceiving('a request to create a user with empty email')
        .withRequest({
            method: 'POST',
            path: '/users',
            headers: {
                'Content-Type': 'application/json'
            },
            body: invalidUser
        })
        .willRespondWith({
            status: 400,
            body: {
                error: like('Name and email are required')
            }
        });

        await mockProvider.executeTest(async (mockServer) => {
            const client = new UserClient(mockServer.url);
            await expect(client.createUser(invalidUser)).rejects.toMatchObject({
                response: {
                    status: 400
                }
            });
        });
    });

});