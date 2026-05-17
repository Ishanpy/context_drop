/**
 * API Configuration
 * Centralized configuration for backend API integration
 */

export const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://web-production-5105.up.railway.app',
  timeout: parseInt(import.meta.env.VITE_API_TIMEOUT) || 30000,
  headers: {
    'Content-Type': 'application/json',
  },
};

export const API_ENDPOINTS = {
  // Main features
  capsule: '/api/capsule/',
  ticket: '/api/ticket/',
  busFactor: '/api/bus-factor/',
  departureBrief: '/api/departure-brief/',
  prBrief: '/api/pr-brief/',
  ingest: '/api/ingest/',
  
  // System
  health: '/health',
};

export const API_TIMEOUTS = {
  default: 30000,      // 30 seconds
  longRunning: 60000,  // 60 seconds for AI operations
  ingest: 120000,      // 2 minutes for repository ingestion
};

// Made with Bob
