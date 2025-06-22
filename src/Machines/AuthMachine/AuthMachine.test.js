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
import { createActor, waitFor, fromPromise, createMachine, sendTo, assign as assignParent } from 'xstate';
import { authMachine } from './AuthMachine';
// Mock the loginWithGoogleActor
var mockLoginWithGoogleActorFn = vi.fn();
var testUser = {
    uid: 'test-uid',
    email: 'test@example.com',
    displayName: 'Test User',
    photoURL: null,
    emailVerified: true,
    isAnonymous: false,
    metadata: {},
    providerData: [],
    refreshToken: '',
    tenantId: null,
    phoneNumber: null, // Added missing property
    delete: vi.fn(),
    getIdToken: vi.fn(),
    getIdTokenResult: vi.fn(),
    reload: vi.fn(),
    toJSON: vi.fn(),
    providerId: 'google.com',
};
describe('authMachine', function () {
    // Provide the mock actor correctly
    var mockAuthMachine = authMachine.provide({
        actors: {
            loginWithGoogleActor: fromPromise(function () { return mockLoginWithGoogleActorFn(); }),
        },
    });
    beforeEach(function () {
        // Reset the mock before each test
        mockLoginWithGoogleActorFn.mockReset();
        // Re-provide the machine with the reset mock
        mockAuthMachine = authMachine.provide({
            actors: {
                loginWithGoogleActor: fromPromise(function () { return mockLoginWithGoogleActorFn(); }),
            },
        });
    });
    it('should initialize in the idle state', function () {
        var actor = createActor(mockAuthMachine).start();
        expect(actor.getSnapshot().value).toBe('idle');
        expect(actor.getSnapshot().context.error).toBeNull();
        actor.stop();
    });
    it('should transition to submittingGoogle on SUBMIT_LOGIN_WITH_GOOGLE', function () {
        var actor = createActor(mockAuthMachine).start();
        actor.send({ type: 'SUBMIT_LOGIN_WITH_GOOGLE' });
        expect(actor.getSnapshot().value).toBe('submittingGoogle');
        actor.stop();
    });
    it('should transition to authenticated and send AUTHENTICATION_SUCCESS on successful Google login', function () { return __awaiter(void 0, void 0, void 0, function () {
        var parentMachine, parentActor, receivedEvent;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mockLoginWithGoogleActorFn.mockResolvedValue(testUser); // Ensure mock is set up before parent actor starts
                    parentMachine = createMachine({
                        id: 'testParent',
                        initial: 'runningChild',
                        context: {
                            receivedEvent: undefined,
                        },
                        states: {
                            runningChild: {
                                invoke: {
                                    id: 'authChild',
                                    src: mockAuthMachine, // Use the machine with mocked actors
                                },
                                on: {
                                    TRIGGER_CHILD_LOGIN: {
                                        actions: sendTo('authChild', { type: 'SUBMIT_LOGIN_WITH_GOOGLE' }),
                                    },
                                    AUTHENTICATION_SUCCESS: {
                                        target: 'done',
                                        actions: assignParent({
                                            receivedEvent: function (_a) {
                                                var event = _a.event;
                                                return event;
                                            },
                                        }),
                                    },
                                    AUTHENTICATION_FAILURE: {
                                        target: 'done',
                                        actions: assignParent({
                                            receivedEvent: function (_a) {
                                                var event = _a.event;
                                                return event;
                                            },
                                        }),
                                    },
                                },
                            },
                            done: {
                                type: 'final',
                            },
                        },
                    });
                    parentActor = createActor(parentMachine).start();
                    // Send an event to the parent machine, which will then forward to the child
                    parentActor.send({ type: 'TRIGGER_CHILD_LOGIN' });
                    // Wait for the parent machine to reach its 'done' state,
                    // which signifies it has received an event from the child.
                    return [4 /*yield*/, waitFor(parentActor, function (state) { return state.value === 'done'; })
                        // Assertions on the event received by the parent
                        // Verifying the child's internal state here can be tricky if it stops immediately.
                        // The main goal is to ensure the parent received the correct event.
                    ];
                case 1:
                    // Wait for the parent machine to reach its 'done' state,
                    // which signifies it has received an event from the child.
                    _a.sent();
                    receivedEvent = parentActor.getSnapshot().context.receivedEvent;
                    expect(receivedEvent === null || receivedEvent === void 0 ? void 0 : receivedEvent.type).toBe('AUTHENTICATION_SUCCESS');
                    if ((receivedEvent === null || receivedEvent === void 0 ? void 0 : receivedEvent.type) === 'AUTHENTICATION_SUCCESS') {
                        expect(receivedEvent.user).toEqual(testUser);
                    }
                    parentActor.stop();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should transition to idle and set error on failed Google login', function () { return __awaiter(void 0, void 0, void 0, function () {
        var errorMessageInMachine, actor;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    errorMessageInMachine = 'Google login failed.';
                    mockLoginWithGoogleActorFn.mockRejectedValue(new Error(errorMessageInMachine));
                    actor = createActor(mockAuthMachine).start();
                    actor.send({ type: 'SUBMIT_LOGIN_WITH_GOOGLE' });
                    return [4 /*yield*/, waitFor(actor, function (state) { return state.value === 'idle' && state.context.error !== null; })];
                case 1:
                    _a.sent();
                    expect(actor.getSnapshot().value).toBe('idle');
                    expect(actor.getSnapshot().context.error).toBe(errorMessageInMachine);
                    actor.stop();
                    return [2 /*return*/];
            }
        });
    }); });
});
