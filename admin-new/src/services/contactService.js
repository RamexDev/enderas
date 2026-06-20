/**
 * @fileoverview Contact inquiry submission (POST only).
 * Contact page display (address, map, hours) uses static defaults — not this module.
 */

import { contactApi } from './publicApi'

/**
 * Submits a contact form inquiry to the backend.
 * @param {object} data - Form fields (`name`, `email`, `phone`, `subject`, `message`)
 * @returns {Promise<object>}
 */
export async function submitInquiry(data) {
  return contactApi.submit(data)
}
