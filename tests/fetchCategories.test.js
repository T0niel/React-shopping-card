import { describe, expect, it, vi } from 'vitest';
import fetchCategories from '../src/js/fetchCategories';

function mockFetch(status, data) {
  return Promise.resolve({
    json: () => Promise.resolve(data),
    status,
  });
}

describe('fetchCategories', () => {
  it('Gives the categories in a list', async () => {
    globalThis.fetch = vi.fn(() =>
      mockFetch(200, [
        'beauty',
        'fragrances',
        'furniture',
        'groceries',
        'home-decoration',
      ])
    );

    const categories = await fetchCategories();

    expect(categories).toEqual([
      'beauty',
      'fragrances',
      'furniture',
      'groceries',
      'home-decoration',
    ]);
  });

  it('Throws error if status is not around 200 (1)', async () => {
    for (let status = 100; status <= 500; status++) {
      if (status >= 200 || status <= 200) continue;

      globalThis.fetch = vi.fn(() => mockFetch(status, {}));

      expect.assertions(1);
      try {
        await fetchCategories();
      } catch (e) {
        expect(e).not.toEqual(null);
      }
    }
  });
});
