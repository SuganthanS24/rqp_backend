const formatMessage = (level, message) => {
  const timestamp = new Date().toISOString();
  return `[${timestamp}] [${level.toUpperCase()}]: ${message}`;
};

export const logger = {
  info: (message, ...args) => {
    console.log(formatMessage("INFO", message), ...args);
  },
  warn: (message, ...args) => {
    console.warn(formatMessage("WARN", message), ...args);
  },
  error: (message, ...args) => {
    console.error(formatMessage("ERROR", message), ...args);
  },
  debug: (message, ...args) => {
    if (process.env.NODE_ENV !== "production") {
      console.debug(formatMessage("DEBUG", message), ...args);
    }
  }
};

export default logger;
