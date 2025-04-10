import prettyMs from 'pretty-ms';

export const formatMillisecondsToHumanReadable = (milliseconds: number) => {
  return prettyMs(milliseconds, { compact: true });
};