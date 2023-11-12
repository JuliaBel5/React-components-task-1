/* eslint-disable @typescript-eslint/ban-ts-comment */
import { fetch, Request, Response } from '@remix-run/web-fetch'
import * as matchers from '@testing-library/jest-dom/matchers'
import { cleanup } from '@testing-library/react'
import { AbortController as NodeAbortController } from 'abort-controller'
import { afterEach, expect } from 'vitest'

// @ts-expect-error
globalThis.fetch = fetch
// @ts-expect-error
globalThis.Request = Request
// @ts-expect-error
globalThis.Response = Response

// @ts-expect-error
globalThis.AbortController = NodeAbortController

// extends Vitest's expect method with methods from react-testing-library
expect.extend(matchers)

// runs a cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup()
})
