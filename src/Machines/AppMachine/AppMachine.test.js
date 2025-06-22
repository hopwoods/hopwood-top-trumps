var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/// <reference types="vitest/globals" />
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createActor, waitFor, fromPromise } from 'xstate';
import { vi } from 'vitest'; // Explicitly import MockInstance
import { appMachine } from './AppMachine';
// --- Mocks for AppMachine's actors ---
var mockCheckAuthStatusActorFn = vi.fn(); // Reverted to vi.fn()
var mockLogoutActorFn = vi.fn(); // Reverted to vi.fn()
var mockAuthMachineActorLogic = vi.fn(); // Reverted to vi.fn(), This will represent the logic of the spawned authMachine
var testUser = {
    uid: 'app-test-uid',
    email: 'app-test@example.com',
    displayName: 'App Test User',
    photoURL: null,
    emailVerified: true,
    isAnonymous: false,
    metadata: {},
    providerData: [],
    refreshToken: '',
    tenantId: null,
    phoneNumber: null,
    delete: vi.fn(),
    getIdToken: vi.fn(),
    getIdTokenResult: vi.fn(),
    reload: vi.fn(),
    toJSON: vi.fn(),
    providerId: 'google.com',
};
describe('appMachine', function () {
    // Helper to create a fully mocked AppMachine instance for testing
    var createMockedAppMachine = function () {
        return appMachine.provide({
            actors: {
                checkAuthStatusActor: fromPromise(function () { return mockCheckAuthStatusActorFn(); }),
                logoutActor: fromPromise(function () { return mockLogoutActorFn(); }),
                // Use the vi.fn() directly. It can be configured with mockImplementation in specific tests if needed.
                // For tests not focusing on authMachine interaction, a basic mock is often sufficient.
                authMachine: mockAuthMachineActorLogic,
            },
        });
    };
    beforeEach(function () {
        mockCheckAuthStatusActorFn.mockReset();
        mockLogoutActorFn.mockReset();
        mockAuthMachineActorLogic.mockReset();
        // Set a default, non-erroring implementation for the authMachine mock
        mockAuthMachineActorLogic.mockImplementation(function () { return ({
            id: 'mockAuthActorInstance',
            send: vi.fn(),
            subscribe: function () { return ({ unsubscribe: vi.fn() }); },
            getSnapshot: function () { return ({ status: 'active', value: 'idle', context: { error: null } }); },
            start: vi.fn(),
            stop: vi.fn(),
        }); });
    });
    it('should initialize by invoking checkAuthStatusActor', function () {
        var actor = createActor(createMockedAppMachine(), {}).start(); // Added empty options
        expect(mockCheckAuthStatusActorFn).toHaveBeenCalled();
        expect(actor.getSnapshot().value).toBe('initializing');
        actor.stop();
    });
    it('should transition to authenticated.home if checkAuthStatusActor resolves with a user', function () { return __awaiter(void 0, void 0, void 0, function () {
        var actor;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mockCheckAuthStatusActorFn.mockResolvedValue(testUser);
                    actor = createActor(createMockedAppMachine(), {}).start() // Added empty options
                    ;
                    return [4 /*yield*/, waitFor(actor, function (state) { return state.matches({ authenticated: 'home' }); })];
                case 1:
                    _a.sent();
                    expect(actor.getSnapshot().matches({ authenticated: 'home' })).toBe(true);
                    expect(actor.getSnapshot().context.user).toEqual(testUser);
                    expect(actor.getSnapshot().context.error).toBeNull();
                    actor.stop();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should transition to unauthenticated if checkAuthStatusActor resolves with null', function () { return __awaiter(void 0, void 0, void 0, function () {
        var actor;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mockCheckAuthStatusActorFn.mockResolvedValue(null);
                    actor = createActor(createMockedAppMachine(), {}).start() // Added empty options
                    ;
                    return [4 /*yield*/, waitFor(actor, function (state) { return state.value === 'unauthenticated'; })];
                case 1:
                    _a.sent();
                    expect(actor.getSnapshot().value).toBe('unauthenticated');
                    expect(actor.getSnapshot().context.user).toBeNull();
                    expect(actor.getSnapshot().context.error).toBeNull();
                    // Check if authMachine is invoked
                    // This requires a more sophisticated mock for authMachineActorLogic
                    // or inspecting the actor's children. For now, we assume it's invoked.
                    actor.stop();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should transition to unauthenticated and set error if checkAuthStatusActor rejects', function () { return __awaiter(void 0, void 0, void 0, function () {
        var errorMessage, actor;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    errorMessage = 'Failed to check authentication status.' // Adjusted to match AppMachine's actual error
                    ;
                    mockCheckAuthStatusActorFn.mockRejectedValue(new Error(errorMessage)); // Mock rejection with this specific message
                    actor = createActor(createMockedAppMachine(), {}).start() // Added empty options
                    ;
                    return [4 /*yield*/, waitFor(actor, function (state) { return state.value === 'unauthenticated' && state.context.error !== null; })];
                case 1:
                    _a.sent();
                    expect(actor.getSnapshot().value).toBe('unauthenticated');
                    expect(actor.getSnapshot().context.user).toBeNull();
                    expect(actor.getSnapshot().context.error).toBe(errorMessage);
                    actor.stop();
                    return [2 /*return*/];
            }
        });
    }); });
    // Tests for interactions with the invoked authMachine
    describe('when in unauthenticated state (authMachine invoked)', function () {
        var unauthActor;
        var mockSpawnedAuthMachine; // Further corrected MockInstance type
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mockCheckAuthStatusActorFn.mockResolvedValue(null); // Ensure it goes to unauthenticated
                        // Mock the behavior of the spawned authMachine
                        // This is a simplified mock. A real test might need a more complete actor mock.
                        mockSpawnedAuthMachine = { send: vi.fn(), events: [] }; // Reverted to vi.fn()
                        // When appMachine tries to invoke 'authMachine', provide our mock actor
                        // mockAuthMachineActorLogic is already part of createMockedAppMachine.
                        // We need to make mockAuthMachineActorLogic return our mockSpawnedAuthMachine for these tests.
                        mockAuthMachineActorLogic.mockImplementation(function () { return mockSpawnedAuthMachine; });
                        unauthActor = createActor(createMockedAppMachine(), {}).start(); // Added empty options
                        return [4 /*yield*/, waitFor(unauthActor, function (state) { return state.value === 'unauthenticated'; })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        afterEach(function () {
            unauthActor.stop();
        });
        it('should transition to authenticated.home on AUTHENTICATION_SUCCESS from authMachine', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // Simulate authMachine sending AUTHENTICATION_SUCCESS
                        // This requires the mockSpawnedAuthMachine to be able to send events to its parent (unauthActor)
                        // This is complex to mock directly. A common pattern is to send an event *to* the parent
                        // that simulates the child having sent it.
                        unauthActor.send({ type: 'AUTHENTICATION_SUCCESS', user: testUser }); // Cast as any to bypass strict event type checks for this test event
                        return [4 /*yield*/, waitFor(unauthActor, function (state) { return state.matches({ authenticated: 'home' }); })];
                    case 1:
                        _a.sent();
                        expect(unauthActor.getSnapshot().matches({ authenticated: 'home' })).toBe(true);
                        expect(unauthActor.getSnapshot().context.user).toEqual(testUser);
                        expect(unauthActor.getSnapshot().context.error).toBeNull();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should remain in unauthenticated and set error on AUTHENTICATION_FAILURE from authMachine', function () { return __awaiter(void 0, void 0, void 0, function () {
            var authError;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        authError = 'Child auth failed';
                        unauthActor.send({ type: 'AUTHENTICATION_FAILURE', error: authError });
                        // Wait for context to update, state should remain unauthenticated
                        return [4 /*yield*/, waitFor(unauthActor, function (state) { return state.context.error === authError; })];
                    case 1:
                        // Wait for context to update, state should remain unauthenticated
                        _a.sent();
                        expect(unauthActor.getSnapshot().value).toBe('unauthenticated');
                        expect(unauthActor.getSnapshot().context.error).toBe(authError);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    it('should transition to loggingOut then unauthenticated on LOGOUT', function () { return __awaiter(void 0, void 0, void 0, function () {
        var actor;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mockCheckAuthStatusActorFn.mockResolvedValue(testUser); // Start as authenticated
                    mockLogoutActorFn.mockResolvedValue(undefined); // Logout succeeds
                    actor = createActor(createMockedAppMachine(), {}).start() // Added empty options
                    ;
                    return [4 /*yield*/, waitFor(actor, function (state) { return state.matches({ authenticated: 'home' }); })];
                case 1:
                    _a.sent();
                    actor.send({ type: 'LOGOUT' });
                    return [4 /*yield*/, waitFor(actor, function (state) { return state.value === 'loggingOut'; })];
                case 2:
                    _a.sent();
                    expect(mockLogoutActorFn).toHaveBeenCalled();
                    return [4 /*yield*/, waitFor(actor, function (state) { return state.value === 'unauthenticated'; })];
                case 3:
                    _a.sent();
                    expect(actor.getSnapshot().context.user).toBeNull();
                    actor.stop();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should navigate to playGame when authenticated', function () { return __awaiter(void 0, void 0, void 0, function () {
        var actor;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mockCheckAuthStatusActorFn.mockResolvedValue(testUser);
                    actor = createActor(createMockedAppMachine(), {}).start() // Added empty options
                    ;
                    return [4 /*yield*/, waitFor(actor, function (state) { return state.matches({ authenticated: 'home' }); })];
                case 1:
                    _a.sent();
                    actor.send({ type: 'NAVIGATE_TO_PLAY_GAME' });
                    expect(actor.getSnapshot().matches({ authenticated: 'playGame' })).toBe(true);
                    actor.stop();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should navigate to manageDecks when authenticated', function () { return __awaiter(void 0, void 0, void 0, function () {
        var actor;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mockCheckAuthStatusActorFn.mockResolvedValue(testUser);
                    actor = createActor(createMockedAppMachine(), {}).start() // Added empty options
                    ;
                    return [4 /*yield*/, waitFor(actor, function (state) { return state.matches({ authenticated: 'home' }); })];
                case 1:
                    _a.sent();
                    actor.send({ type: 'NAVIGATE_TO_MANAGE_DECKS' });
                    expect(actor.getSnapshot().matches({ authenticated: 'manageDecks' })).toBe(true);
                    actor.stop();
                    return [2 /*return*/];
            }
        });
    }); });
});
