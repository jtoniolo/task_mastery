# Logging Configuration and Usage

## Overview

This document provides information on how to interpret log entries and utilize logging tools in the NestJS API. It also includes details on log rotation and archival policies, as well as how to filter logs by severity level.

## Logging Library

We use the `winston` logging library for implementing logging in the NestJS API. `winston` is a versatile and widely-used logging library that supports various transports (e.g., console, file) and log formats.

## Log Configuration

The logging configuration is set up in the `main.ts` file using the `WinstonModule` from `nest-winston`. The configuration includes logging to both the console and a file named `application.log`.

See <https://www.npmjs.com/package/nest-winston> for more details

## Log Entries

Log entries include timestamps, log levels, and relevant context information (e.g., request IDs, user IDs). This information helps in monitoring and analyzing the application's behavior and performance, troubleshooting issues, and maintaining an audit trail.

### Example Log Entry

```json
{
  "timestamp": "2023-05-01T12:34:56.789Z",
  "level": "info",
  "message": "getData method called",
  "context": "AppController"
}
```

## Log Rotation and Archival Policies

To manage log file sizes and retention periods, we configure log rotation and archival policies. This ensures that log files do not grow indefinitely and consume excessive disk space.

### Example Configuration

```typescript
new winston.transports.File({
  filename: "application.log",
  maxsize: 5242880, // 5MB
  maxFiles: 5,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
  ),
});
```

In this example, log files are rotated when they reach 5MB in size, and up to 5 rotated log files are retained.

## Filtering Logs by Severity Level

Logs can be filtered by severity level (e.g., info, warning, error) to focus on specific types of events. This is useful for identifying and addressing issues based on their severity.

### Example Usage

To filter logs by severity level, you can use the `level` property in the logging configuration. For example, to log only warnings and errors to the console:

```typescript
new winston.transports.Console({
  level: "warn",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.simple(),
  ),
});
```

In this example, only log entries with a severity level of `warn` or higher (e.g., `error`) will be logged to the console.

## Conclusion

By following the guidelines and examples provided in this document, you can effectively interpret log entries, utilize logging tools, and manage log files in the NestJS API. This will help you monitor and analyze the application's behavior and performance, troubleshoot issues, and maintain an audit trail.
