/**
 * Form Validation Utilities
 * Reusable validation functions for form inputs
 */

/**
 * Validate URL format
 * @param {string} url - URL to validate
 * @returns {boolean}
 */
export function isValidUrl(url) {
  if (!url || typeof url !== 'string') return false;
  
  try {
    const urlObj = new URL(url);
    return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
  } catch {
    return false;
  }
}

/**
 * Validate GitHub repository URL
 * @param {string} url - Repository URL
 * @returns {boolean}
 */
export function isValidGitHubUrl(url) {
  if (!isValidUrl(url)) return false;
  
  const githubPattern = /^https?:\/\/(www\.)?github\.com\/[\w-]+\/[\w.-]+/i;
  return githubPattern.test(url);
}

/**
 * Validate GitHub PR URL
 * @param {string} url - PR URL
 * @returns {boolean}
 */
export function isValidPRUrl(url) {
  if (!isValidUrl(url)) return false;
  
  const prPattern = /^https?:\/\/(www\.)?github\.com\/[\w-]+\/[\w.-]+\/pull\/\d+/i;
  return prPattern.test(url);
}

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean}
 */
export function isValidEmail(email) {
  if (!email || typeof email !== 'string') return false;
  
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

/**
 * Validate non-empty string
 * @param {string} value - Value to validate
 * @param {number} [minLength=1] - Minimum length
 * @returns {boolean}
 */
export function isNonEmpty(value, minLength = 1) {
  return typeof value === 'string' && value.trim().length >= minLength;
}

/**
 * Validate array has items
 * @param {Array} arr - Array to validate
 * @param {number} [minLength=1] - Minimum length
 * @returns {boolean}
 */
export function hasItems(arr, minLength = 1) {
  return Array.isArray(arr) && arr.length >= minLength;
}

/**
 * Parse comma-separated string into array
 * @param {string} str - Comma-separated string
 * @returns {string[]}
 */
export function parseCommaSeparated(str) {
  if (!str || typeof str !== 'string') return [];
  
  return str
    .split(',')
    .map(item => item.trim())
    .filter(item => item.length > 0);
}

/**
 * Validate file pattern (glob pattern)
 * @param {string} pattern - File pattern
 * @returns {boolean}
 */
export function isValidFilePattern(pattern) {
  if (!pattern || typeof pattern !== 'string') return false;
  
  // Basic validation - check for common glob characters
  const validPattern = /^[\w\-.*\/]+$/;
  return validPattern.test(pattern);
}

/**
 * Validate ticket ID format
 * @param {string} ticketId - Ticket ID
 * @returns {boolean}
 */
export function isValidTicketId(ticketId) {
  if (!ticketId || typeof ticketId !== 'string') return false;
  
  // Common ticket ID patterns: TICKET-123, JIRA-456, etc.
  const ticketPattern = /^[A-Z]+-\d+$/i;
  return ticketPattern.test(ticketId);
}

/**
 * Sanitize string input
 * @param {string} str - String to sanitize
 * @returns {string}
 */
export function sanitizeString(str) {
  if (!str || typeof str !== 'string') return '';
  
  return str
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .substring(0, 10000); // Limit length
}

/**
 * Validate branch name
 * @param {string} branch - Branch name
 * @returns {boolean}
 */
export function isValidBranchName(branch) {
  if (!branch || typeof branch !== 'string') return false;
  
  // Git branch name rules
  const branchPattern = /^[a-zA-Z0-9._\-\/]+$/;
  return branchPattern.test(branch) && !branch.includes('..');
}

/**
 * Get validation error message
 * @param {string} field - Field name
 * @param {string} type - Validation type
 * @returns {string}
 */
export function getValidationError(field, type) {
  const errors = {
    required: `${field} is required`,
    url: `${field} must be a valid URL`,
    github: `${field} must be a valid GitHub URL`,
    pr: `${field} must be a valid GitHub PR URL`,
    email: `${field} must be a valid email address`,
    minLength: `${field} is too short`,
    maxLength: `${field} is too long`,
    pattern: `${field} format is invalid`,
    array: `${field} must contain at least one item`,
  };
  
  return errors[type] || `${field} is invalid`;
}

/**
 * Validate form data
 * @param {Object} data - Form data
 * @param {Object} rules - Validation rules
 * @returns {{ valid: boolean, errors: Object }}
 */
export function validateForm(data, rules) {
  const errors = {};
  
  for (const [field, fieldRules] of Object.entries(rules)) {
    const value = data[field];
    
    if (fieldRules.required && !isNonEmpty(value)) {
      errors[field] = getValidationError(field, 'required');
      continue;
    }
    
    if (fieldRules.url && value && !isValidUrl(value)) {
      errors[field] = getValidationError(field, 'url');
    }
    
    if (fieldRules.github && value && !isValidGitHubUrl(value)) {
      errors[field] = getValidationError(field, 'github');
    }
    
    if (fieldRules.pr && value && !isValidPRUrl(value)) {
      errors[field] = getValidationError(field, 'pr');
    }
    
    if (fieldRules.email && value && !isValidEmail(value)) {
      errors[field] = getValidationError(field, 'email');
    }
    
    if (fieldRules.minLength && value && value.length < fieldRules.minLength) {
      errors[field] = getValidationError(field, 'minLength');
    }
    
    if (fieldRules.maxLength && value && value.length > fieldRules.maxLength) {
      errors[field] = getValidationError(field, 'maxLength');
    }
  }
  
  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

// Made with Bob
