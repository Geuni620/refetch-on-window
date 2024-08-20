// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/vitest';

// https://www.npmjs.com/package/@testing-library/jest-dom#with-another-jest-compatible-expect
import * as matchers from '@testing-library/jest-dom/matchers';
// for msw
import { server } from 'src/mocks/node';
import { expect } from 'vitest';
import { afterAll, afterEach, beforeAll } from 'vitest';

// add jest-dom matchers
expect.extend(matchers);

// msw setup and teardown below
// Establish API mocking before all tests.
beforeAll(() => server.listen());

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());

// Clean up after the tests are finished.
afterAll(() => server.close());
