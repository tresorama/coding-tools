type Severity = 'debug' | 'warn' | 'info' | 'log' | 'error';
type JsonValue = string | number | boolean | null | { [key: string]: JsonValue; } | JsonValue[];

export const createLogger = (name: string) => {
  return {
    log: (severity: Severity = 'log', message: JsonValue) => {
      const finalMessage = `[${name}] ${JSON.stringify(message)}`;
      try {
        console[severity](finalMessage);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        console.log(finalMessage);
      }
    }
  };
};