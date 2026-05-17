/**
 * API Type Definitions
 * Complete type definitions for all backend API endpoints
 */

// ============================================
// CAPSULE API TYPES
// ============================================

/**
 * @typedef {Object} CapsuleRequest
 * @property {string} query - The question to ask about the repository
 */

/**
 * @typedef {Object} ContextFile
 * @property {string} path - File path in the repository
 * @property {string} content - File content
 * @property {number} relevance_score - Relevance score (0-1)
 */

/**
 * @typedef {Object} ArchitectureInsights
 * @property {string[]} key_components - List of key architectural components
 * @property {string} data_flow - Description of data flow
 * @property {string[]} dependencies - List of dependencies
 */

/**
 * @typedef {Object} CapsuleResponse
 * @property {string} query - Original query
 * @property {string} answer - AI-generated answer
 * @property {ContextFile[]} context_files - Relevant context files
 * @property {ArchitectureInsights} architecture_insights - Architecture insights
 * @property {number} processing_time - Processing time in seconds
 */

// ============================================
// TICKET API TYPES
// ============================================

/**
 * @typedef {Object} TicketRequest
 * @property {string} ticket_description - Description of the ticket/issue
 * @property {string} ticket_id - Unique ticket identifier
 */

/**
 * @typedef {Object} RelevantFile
 * @property {string} path - File path
 * @property {number[]} line_numbers - Relevant line numbers
 * @property {string} snippet - Code snippet
 */

/**
 * @typedef {'low' | 'medium' | 'high' | 'critical'} Priority
 */

/**
 * @typedef {Object} TicketResponse
 * @property {string} ticket_id - Ticket identifier
 * @property {string} analysis - Analysis of the ticket
 * @property {string} root_cause - Identified root cause
 * @property {string} suggested_fix - Suggested fix
 * @property {RelevantFile[]} relevant_files - Relevant files
 * @property {Priority} priority - Priority level
 * @property {string} estimated_fix_time - Estimated time to fix
 */

// ============================================
// BUS FACTOR API TYPES
// ============================================

/**
 * @typedef {'service' | 'infrastructure' | 'library'} ComponentType
 */

/**
 * @typedef {'low' | 'medium' | 'high' | 'critical'} RiskLevel
 */

/**
 * @typedef {Object} Component
 * @property {string} name - Component name
 * @property {ComponentType} type - Component type
 * @property {string[]} dependencies - List of dependencies
 * @property {RiskLevel} risk_level - Risk level
 * @property {number} maintainers - Number of maintainers
 */

/**
 * @typedef {Object} Connection
 * @property {string} from - Source component
 * @property {string} to - Target component
 * @property {string} type - Connection type
 */

/**
 * @typedef {Object} ArchitectureMap
 * @property {Component[]} components - List of components
 * @property {Connection[]} connections - List of connections
 */

/**
 * @typedef {Object} BusFactorResponse
 * @property {ArchitectureMap} architecture_map - Architecture map
 * @property {number} bus_factor_score - Bus factor score
 * @property {string[]} high_risk_components - High risk components
 * @property {string[]} recommendations - Recommendations
 */

// ============================================
// DEPARTURE BRIEF API TYPES
// ============================================

/**
 * @typedef {Object} DepartureBriefRequest
 * @property {string} developer_name - Name of departing developer
 * @property {string[]} areas_of_responsibility - Areas of responsibility
 */

/**
 * @typedef {'not_started' | 'in_progress' | 'completed'} TaskStatus
 */

/**
 * @typedef {Object} OngoingTask
 * @property {string} task - Task description
 * @property {TaskStatus} status - Task status
 * @property {string[]} files - Related files
 */

/**
 * @typedef {Object} DepartureBrief
 * @property {string[]} key_responsibilities - Key responsibilities
 * @property {string[]} critical_knowledge - Critical knowledge
 * @property {OngoingTask[]} ongoing_tasks - Ongoing tasks
 * @property {string[]} handoff_recommendations - Handoff recommendations
 */

/**
 * @typedef {Object} DepartureBriefResponse
 * @property {string} developer_name - Developer name
 * @property {DepartureBrief} departure_brief - Departure brief details
 * @property {string} generated_at - ISO timestamp
 */

// ============================================
// PR BRIEF API TYPES
// ============================================

/**
 * @typedef {Object} PRBriefRequest
 * @property {string} pr_url - Pull request URL
 * @property {string} pr_description - PR description
 * @property {string[]} changed_files - List of changed files
 */

/**
 * @typedef {'positive' | 'negative' | 'neutral'} PerformanceImpact
 */

/**
 * @typedef {Object} ImpactAnalysis
 * @property {string[]} affected_components - Affected components
 * @property {boolean} breaking_changes - Whether there are breaking changes
 * @property {PerformanceImpact} performance_impact - Performance impact
 */

/**
 * @typedef {Object} CodeQuality
 * @property {number} score - Quality score (0-10)
 * @property {string[]} issues - List of issues
 * @property {string[]} suggestions - List of suggestions
 */

/**
 * @typedef {Object} PRBriefResponse
 * @property {string} pr_url - PR URL
 * @property {string} summary - Summary of changes
 * @property {ImpactAnalysis} impact_analysis - Impact analysis
 * @property {CodeQuality} code_quality - Code quality assessment
 * @property {string[]} security_concerns - Security concerns
 * @property {Priority} review_priority - Review priority
 */

// ============================================
// INGEST API TYPES
// ============================================

/**
 * @typedef {Object} IngestRequest
 * @property {string} repo_url - Repository URL
 * @property {string} branch - Branch name
 * @property {string[]} [include_patterns] - Include patterns
 * @property {string[]} [exclude_patterns] - Exclude patterns
 */

/**
 * @typedef {Object.<string, number>} LanguageStats
 */

/**
 * @typedef {Object} IngestSummary
 * @property {number} total_lines - Total lines of code
 * @property {LanguageStats} languages - Language statistics
 */

/**
 * @typedef {'success' | 'failed'} IngestStatus
 */

/**
 * @typedef {Object} IngestResponse
 * @property {IngestStatus} status - Ingestion status
 * @property {string} ingestion_id - Ingestion ID
 * @property {number} files_processed - Number of files processed
 * @property {number} chunks_created - Number of chunks created
 * @property {number} processing_time - Processing time in seconds
 * @property {IngestSummary} summary - Summary statistics
 */

// ============================================
// ERROR TYPES
// ============================================

/**
 * @typedef {Object} APIError
 * @property {string} detail - Error detail message
 * @property {number} status_code - HTTP status code
 * @property {string} timestamp - ISO timestamp
 */

/**
 * @typedef {Object} HealthResponse
 * @property {string} status - Health status
 * @property {string} timestamp - ISO timestamp
 */

export {};

// Made with Bob
