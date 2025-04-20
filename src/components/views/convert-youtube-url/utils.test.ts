import { expect, it } from 'vitest';
import { convertYoutubeUrl } from './utils';

// const logJson = (a: unknown) => console.dir(a, { depth: null });


it('convertYoutubeUrl - expected ok', { timeout: 30 * 1000 }, async () => {
  let INPUT_OK = `https://youtu.be/MhfyvQihMa8?si=VVJJ8hM2yoGK64FK`;
  let EXPECTED_OUTPUT = `https://www.youtube.com/watch?v=MhfyvQihMa8`;
  let result = convertYoutubeUrl(INPUT_OK);

  expect(result.status).toBe('success');
  if (result.status === 'success') {
    expect(result.data).toBeDefined();
    expect(result.data.youtube_url).toBeDefined();
    expect(result.data.youtube_url).toBeTypeOf('string');
    expect(result.data.youtube_url).toBe(EXPECTED_OUTPUT);
  }

  // 
  INPUT_OK = `https://www.youtube.com/watch?v=IYC5l5iTiDo&t=29s`;
  EXPECTED_OUTPUT = `https://www.youtube.com/watch?v=IYC5l5iTiDo`;
  result = convertYoutubeUrl(INPUT_OK);

  expect(result.status).toBe('success');
  if (result.status === 'success') {
    expect(result.data).toBeDefined();
    expect(result.data.youtube_url).toBeDefined();
    expect(result.data.youtube_url).toBeTypeOf('string');
    expect(result.data.youtube_url).toBe(EXPECTED_OUTPUT);
  }
});

it('convertYoutubeUrl - expected error', { timeout: 30 * 1000 }, async () => {
  const INPUT_ERR = `invalid_url`;
  const result = convertYoutubeUrl(INPUT_ERR);

  expect(result.status).toBe('error');
  if (result.status === 'error') {
    expect(result.message).toBeDefined();
    expect(result.message).toBeTypeOf('string');
  }

});

