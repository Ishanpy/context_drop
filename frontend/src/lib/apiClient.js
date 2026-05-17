/**
 * Production-Grade API Client
 * Handles all backend API communication with proper error handling,
 * timeouts, retries, and request cancellation
 */

import { API_CONFIG, API_ENDPOINTS, API_TIMEOUTS } from '../config/api';
import { APIError, parseErrorResponse, withRetry } from './errorHandler';

/**
 * @typedef {import('../types/api').CapsuleResponse} CapsuleResponse
 * @typedef {import('../types/api').TicketResponse} TicketResponse
 * @typedef {import('../types/api').BusFactorResponse} BusFactorResponse
 * @typedef {import('../types/api').DepartureBriefResponse} DepartureBriefResponse
 * @typedef {import('../types/api').PRBriefResponse} PRBriefResponse
 * @typedef {import('../types/api').IngestResponse} IngestResponse
 * @typedef {import('../types/api').HealthResponse} HealthResponse
 */

class APIClient {
  constructor() {
    this.baseURL = API_CONFIG.baseURL;
    this.defaultTimeout = API_CONFIG.timeout;
    this.headers = API_CONFIG.headers;
  }

  /**
   * Make an HTTP request with timeout and error handling
   * @template T
   * @param {string} endpoint - API endpoint
   * @param {RequestInit} [options={}] - Fetch options
   * @param {number} [timeout] - Custom timeout in ms
   * @returns {Promise<T>}
   */
  async request(endpoint, options = {}, timeout = this.defaultTimeout) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        ...options,
        headers: {
          ...this.headers,
          ...options.headers,
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw await parseErrorResponse(response);
      }

      return await response.json();
    } catch (error) {
      clearTimeout(timeoutId);

      if (error.name === 'AbortError') {
        throw new APIError('Request timeout', 408);
      }

      throw error;
    }
  }

  /**
   * GET request
   * @template T
   * @param {string} endpoint - API endpoint
   * @param {number} [timeout] - Custom timeout
   * @returns {Promise<T>}
   */
  async get(endpoint, timeout) {
    return this.request(endpoint, { method: 'GET' }, timeout);
  }

  /**
   * POST request
   * @template T
   * @param {string} endpoint - API endpoint
   * @param {*} data - Request body
   * @param {number} [timeout] - Custom timeout
   * @returns {Promise<T>}
   */
  async post(endpoint, data, timeout) {
    return this.request(
      endpoint,
      {
        method: 'POST',
        body: JSON.stringify(data),
      },
      timeout
    );
  }

  // ============================================
  // CAPSULE API
  // ============================================

  /**
   * Get capsule response for a repository query
   * @param {string} query - Question about the repository
   * @returns {Promise<CapsuleResponse>}
   */
  async getCapsule(query) {
    return withRetry(
      () => this.post(API_ENDPOINTS.capsule, { query }, API_TIMEOUTS.longRunning),
      2 // Retry once for AI operations
    );
  }

  // ============================================
  // TICKET API
  // ============================================

  /**
   * Analyze a ticket/issue
   * @param {string} ticket_description - Ticket description
   * @param {string} ticket_id - Ticket ID
   * @returns {Promise<TicketResponse>}
   */
  async analyzeTicket(ticket_description, ticket_id) {
    return withRetry(
      () =>
        this.post(
          API_ENDPOINTS.ticket,
          { ticket_description, ticket_id },
          API_TIMEOUTS.longRunning
        ),
      2
    );
  }

  // ============================================
  // BUS FACTOR API
  // ============================================

  /**
   * Get bus factor analysis
   * @returns {Promise<BusFactorResponse>}
   */
  async getBusFactor() {
    return withRetry(
      () => this.get(API_ENDPOINTS.busFactor, API_TIMEOUTS.longRunning),
      2
    );
  }

  // ============================================
  // DEPARTURE BRIEF API
  // ============================================

  /**
   * Generate departure brief for a developer
   * @param {string} developer_name - Developer name
   * @param {string[]} areas_of_responsibility - Areas of responsibility
   * @returns {Promise<DepartureBriefResponse>}
   */
  async getDepartureBrief(developer_name, areas_of_responsibility) {
    return withRetry(
      () =>
        this.post(
          API_ENDPOINTS.departureBrief,
          { developer_name, areas_of_responsibility },
          API_TIMEOUTS.longRunning
        ),
      2
    );
  }

  // ============================================
  // PR BRIEF API
  // ============================================

  /**
   * Analyze a pull request
   * @param {string} pr_url - PR URL
   * @param {string} pr_description - PR description
   * @param {string[]} changed_files - Changed files
   * @returns {Promise<PRBriefResponse>}
   */
  async getPRBrief(pr_url, pr_description, changed_files) {
    return withRetry(
      () =>
        this.post(
          API_ENDPOINTS.prBrief,
          { pr_url, pr_description, changed_files },
          API_TIMEOUTS.longRunning
        ),
      2
    );
  }

  // ============================================
  // INGEST API
  // ============================================

  /**
   * Ingest a repository
   * @param {Object} data - Ingest request data
   * @param {string} data.repo_url - Repository URL
   * @param {string} data.branch - Branch name
   * @param {string[]} [data.include_patterns] - Include patterns
   * @param {string[]} [data.exclude_patterns] - Exclude patterns
   * @returns {Promise<IngestResponse>}
   */
  async ingestRepo(data) {
    return withRetry(
      () => this.post(API_ENDPOINTS.ingest, data, API_TIMEOUTS.ingest),
      1 // Only retry once for long operations
    );
  }

  // ============================================
  // HEALTH CHECK
  // ============================================

  /**
   * Check backend health
   * @returns {Promise<HealthResponse>}
   */
  async healthCheck() {
    return this.get(API_ENDPOINTS.health, 5000); // 5 second timeout for health checks
  }
}

// Export singleton instance
export const apiClient = new APIClient();

// Export class for testing
export { APIClient };

// Made with Bob
