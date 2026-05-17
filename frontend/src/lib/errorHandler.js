/**
 * Error Handling System
 * Centralized error handling for API requests
 */

/**
 * Custom API Error class
 */
export class APIError extends Error {
  /**
   * @param {string} message - Error message
   * @param {number} [statusCode] - HTTP status code
   * @param {*} [details] - Additional error details
   */
  constructor(message, statusCode, details) {
    super(message);
    this.name = 'APIError';
    this.statusCode = statusCode;
    this.details = details;
  }
}

/**
 * Parse and handle API errors
 * @param {Error | APIError | unknown} error - Error object
 * @returns {string} User-friendly error message
 */
export function handleAPIError(error) {
  // Handle APIError instances
  if (error instanceof APIError) {
    switch (error.statusCode) {
      case 400:
        return 'Invalid request. Please check your input and try again.';
      case 404:
        return 'Resource not found. Please verify the request.';
      case 422:
        return 'Validation error. Please check your data format.';
      case 500:
        return 'Server error. Please try again in a moment.';
      case 503:
        return 'Service temporarily unavailable. Please try again later.';
      default:
        return error.message || 'An unexpected error occurred.';
    }
  }

  // Handle standard Error instances
  if (error instanceof Error) {
    // Timeout errors
    if (error.message.includes('timeout') || error.name === 'AbortError') {
      return 'Request timed out. The AI is taking longer than expected. Please try again.';
    }

    // Network errors
    if (error.message.includes('network') || error.message.includes('fetch')) {
      return 'Network error. Please check your internet connection.';
    }

    // CORS errors
    if (error.message.includes('CORS')) {
      return 'Connection error. Please contact support if this persists.';
    }

    return error.message;
  }

  // Handle unknown errors
  return 'An unknown error occurred. Please try again.';
}

/**
 * Retry logic for failed requests
 * @template T
 * @param {() => Promise<T>} fn - Function to retry
 * @param {number} [maxRetries=3] - Maximum number of retries
 * @param {number} [delay=1000] - Delay between retries in ms
 * @returns {Promise<T>}
 */
export async function withRetry(fn, maxRetries = 3, delay = 1000) {
  let lastError;

  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;

      // Don't retry on client errors (4xx)
      if (error instanceof APIError && error.statusCode && error.statusCode < 500) {
        throw error;
      }

      // Wait before retrying (exponential backoff)
      if (i < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, delay * (i + 1)));
      }
    }
  }

  throw lastError;
}

/**
 * Parse error response from API
 * @param {Response} response - Fetch response object
 * @returns {Promise<APIError>}
 */
export async function parseErrorResponse(response) {
  try {
    const data = await response.json();
    return new APIError(
      data.detail || `HTTP ${response.status}`,
      response.status,
      data
    );
  } catch {
    return new APIError(
      `HTTP ${response.status}: ${response.statusText}`,
      response.status
    );
  }
}

/**
 * Check if error is retryable
 * @param {Error | APIError} error - Error to check
 * @returns {boolean}
 */
export function isRetryableError(error) {
  if (error instanceof APIError) {
    // Retry on 5xx errors and timeouts
    return error.statusCode >= 500 || error.name === 'AbortError';
  }

  if (error instanceof Error) {
    // Retry on network errors and timeouts
    return (
      error.message.includes('network') ||
      error.message.includes('timeout') ||
      error.name === 'AbortError'
    );
  }

  return false;
}

/**
 * Get user-friendly error title
 * @param {Error | APIError} error - Error object
 * @returns {string}
 */
export function getErrorTitle(error) {
  if (error instanceof APIError) {
    switch (error.statusCode) {
      case 400:
        return 'Invalid Request';
      case 404:
        return 'Not Found';
      case 422:
        return 'Validation Error';
      case 500:
        return 'Server Error';
      case 503:
        return 'Service Unavailable';
      default:
        return 'Error';
    }
  }

  if (error instanceof Error) {
    if (error.message.includes('timeout') || error.name === 'AbortError') {
      return 'Request Timeout';
    }
    if (error.message.includes('network')) {
      return 'Network Error';
    }
  }

  return 'Error';
}

// Made with Bob
