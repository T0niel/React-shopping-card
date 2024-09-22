import { describe, expect, it, vi } from 'vitest';
import fetchProductData from '../src/js/fetchProductData';
import mockFetch from './utils/mockFetch';
import mockProduct from './utils/mockProduct';

function mockProducts(amount, category = 'test') {
  const products = [];

  for (let i = 0; i < amount; i++) {
    products.push(mockProduct(`${i}`, i, category));
  }

  return products;
}

describe('fetchProductData', () => {
  it('Can paginate the data from 0 to 50', async () => {
    const mockedProducts = mockProducts(70);
    const expectedProducts = mockedProducts.slice(0, 50);
    globalThis.fetch = vi.fn(() =>
      mockFetch(200, { products: mockedProducts })
    );

    const fetchedProducts = await fetchProductData(0, 50);

    expect(fetchedProducts.products).toEqual(expect.arrayContaining(expectedProducts));
  });

  it('Can search for products', async () => {
    const mockedProducts = [
      mockProduct('test1', 123, 'test'),
      mockProduct('test1', 123, 'test'),
      mockProduct('test2', 123, 'test'),
    ];

    globalThis.fetch = vi.fn(() =>
      mockFetch(200, { products: mockedProducts })
    );

    let fetchedProducts = await fetchProductData(0, 30, 'test1');

    expect(fetchedProducts).toEqual({
      products: [
        mockProduct('test1', 123, 'test'),
        mockProduct('test1', 123, 'test'),
      ],
    });

    fetchedProducts = await fetchProductData(0, 30, 'test2');

    expect(fetchedProducts.products).toEqual([mockProduct('test2', 123, 'test')]);
  });

  it('Can fetch by category (selected categories)', async () => {
    const firstTestProducts = mockProducts(5, 'testA');
    const secondTestProducts = mockProducts(5, 'testB');

    const mockedProducts = [...firstTestProducts, ...secondTestProducts];
    globalThis.fetch = vi.fn(() =>
      mockFetch(200, { products: mockedProducts })
    );

    let fetchedProducts = await fetchProductData(0, 30, '', 0, Infinity, [
      { category: 'testA', selected: true },
    ]);

    expect(fetchedProducts.products).toEqual(expect.arrayContaining(firstTestProducts));

    fetchedProducts = await fetchProductData(0, 30, '', 0, Infinity, [
      { category: 'testB', selected: true },
    ]);

    expect(fetchedProducts.products).toEqual(expect.arrayContaining(secondTestProducts));
  });

  it('Can filter by the selected categories', async () => {
    const firstTestProducts = mockProducts(5, 'testA');
    const secondTestProducts = mockProducts(5, 'testB');

    const mockedProducts = [...firstTestProducts, ...secondTestProducts];
    globalThis.fetch = vi.fn(() =>
      mockFetch(200, { products: mockedProducts })
    );

    const fetchedProducts = await fetchProductData(0, 30, '', 0, Infinity, [
      { category: 'testA', selected: false },
      { category: 'testB', selected: true },
    ]);

    expect(fetchedProducts.products).toEqual(expect.arrayContaining(secondTestProducts));
  });

  it('Can select by min and max in price (inclusive min and max)', async () => {
    const mockedProducts = [
      mockProduct('test', 50, 'test'),
      mockProduct('test', 500, 'test'),
      mockProduct('test', 200, 'test'),
      mockProduct('test', 150, 'test'),
      mockProduct('test', 20, 'test'),
    ];

    globalThis.fetch = vi.fn(() =>
      mockFetch(200, { products: mockedProducts })
    );

    let fetchedProducts = await fetchProductData(0, 30, '', 0, Infinity);
    expect(fetchedProducts).toEqual({
      products: expect.arrayContaining(mockedProducts),
    });

    fetchedProducts = await fetchProductData(0, 30, '', 0, 200);
    expect(fetchedProducts).toEqual({
      products: expect.arrayContaining([
        mockProduct('test', 20, 'test'),
        mockProduct('test', 150, 'test'),
        mockProduct('test', 50, 'test'),
      ]),
    });

    fetchedProducts = await fetchProductData(0, 30, '', 200, 500);
    expect(fetchedProducts).toEqual({
      products: expect.arrayContaining([
        mockProduct('test', 500, 'test'),
        mockProduct('test', 200, 'test'),
      ]),
    });
  });
});
