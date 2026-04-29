type LogLevel = 'debug' | 'info' | 'warn' | 'error';

const sensitiveKeyPattern =
  /token|authorization|sender|identity|payment|checkout|location|latitude|longitude|moderation/i;

export function redactSensitiveData<T>(value: T): T | string {
  if (Array.isArray(value)) {
    return value.map((item) => redactSensitiveData(item)) as T;
  }

  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([key, entry]) => [
        key,
        sensitiveKeyPattern.test(key) ? '[REDACTED]' : redactSensitiveData(entry),
      ]),
    ) as T;
  }

  if (typeof value === 'string' && value.toLowerCase().includes('bearer ')) {
    return '[REDACTED]';
  }

  return value;
}

export function privacyLog(level: LogLevel, message: string, metadata?: unknown) {
  const redactedMetadata = metadata === undefined ? undefined : redactSensitiveData(metadata);

  console[level](message, redactedMetadata ?? '');
}
