import { lerp, clamp } from './math';

export const getRandomInteger = (min: number, max: number) => {
  const value = lerp(min, max, Math.random());
  return clamp(min, max, Math.round(value));
};

export const getRandomArrayItem = <T>(array: T[]): T => {
  const index = getRandomInteger(0, array.length - 1);
  return array[index];
};


export const getRandomColor = ({
  h,
  s,
  l,
}: {
  h?: number,
  s?: number,
  l?: number,
} = {}) => {
  const _h = h ?? getRandomInteger(0, 360);
  const _s = s ?? getRandomInteger(0, 100);
  const _l = l ?? getRandomInteger(0, 100);
  return {
    h: _h,
    s: _s,
    l: _l,
    hsl: `hsl(${_h} ${_s}% ${_l}%)`,
  };
};

export const getRandomString = () => {
  return `${new Date().valueOf()}-${Number(Math.random() * 100000).toFixed(0)}`;
};

export const getRandomString2 = () => Math.random().toString(36).substring(3, 8);


export const getRandomUnsplashImage = ({
  // tags = ['fun'],
  w = 900,
  h = 700,
}: {
  // tags?: string[],
  w?: number,
  h?: number,
}) => {
  // `https://picsum.photos/200/300?grayscale`

  const url = new URL(`https://picsum.photos/${w}/${h}`);
  url.searchParams.set("last-mod", getRandomString());
  // url.searchParams.set(tags.join(","), '');

  return url.toString();
};

export const getRandomDateInRange = (start: Date, end: Date) => {
  const DAY_IN_MS = 1000 * 60 * 60 * 24;
  const differenceBetweenStartAndEnd_inMs = end.getTime() - start.getTime();
  const differenceBetweenStartAndEnd_inDays = differenceBetweenStartAndEnd_inMs / DAY_IN_MS;
  const randomNumberOfDays = getRandomInteger(0, differenceBetweenStartAndEnd_inDays);
  const randomNumberOfDays_inMs = randomNumberOfDays * DAY_IN_MS;
  const randomDate = new Date(start.getTime() + randomNumberOfDays_inMs);
  return randomDate;
};