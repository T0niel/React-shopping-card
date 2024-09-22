import { describe, expect, it, vi } from 'vitest';
import ProductPage from '../src/routes/ProductPage';
import mockFetch from './utils/mockFetch';
import mockProduct from './utils/mockProduct';
import { render, screen } from '@testing-library/react';
import { act } from 'react';

//Mocks the product with the params passed in and gets the index to check if those fields exists after
async function testField(indexes, ...params) {
  globalThis.fetch = vi.fn(() =>
    mockFetch(200, {
      ...mockProduct(...params),
    })
  );

  await act(async () => {
    render(<ProductPage />);
  });

  indexes.forEach((index) => {
    const val = params[index];
    console.log('value');
    console.log(val);
    const element = screen.queryByText(val.toString());
    expect(element).toBeInTheDocument();
  });
}

vi.mock('../src/components/ImageCarousel', () => ({
  __esModule: true,
  default: () => <div data-testid="mock-imageCarousel"></div>,
}));


vi.mock('../src/components/Navigation', () => ({
  __esModule: true,
  default: () => <nav data-testid="mock-navigation"></nav>,
}));

vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useParams: vi.fn(() => ({ productId: 1 })),
}));

describe('ProductPage', () => {
  it('displays the product name', async () => {
    await testField([0], 'display', 0, 'Test');
  });

  it('displays price', async () => {
    await testField([1], 'display', 200, 'Test');
  });

  it('displays stock', async () => {
    await testField([3], 'display', 200, 'Test', 2);
  });

  /*
  warrantyInformation = 'No warranty',
  shippingInformation = 'Ships tomorrow',
  returnPolicy = '30 days return policy'
  */

  it('displays warrantyInformation', async () => {
    await testField([5], 'display', 200, 'Test', 2, {}, 'warranty info');
  });

  it('displays shippingInformation', async () => {
    await testField(
      [6],
      'display',
      200,
      'Test',
      2,
      {},
      'warranty info',
      'shipping info'
    );
  });

  it('displays returnPolicy', async () => {
    await testField(
      [7],
      'display',
      200,
      'Test',
      2,
      {},
      'warranty info',
      'shipping info',
      'return policy'
    );
  });

  it('displays dimensions', async () => {
    const width = 23.23;
    const height = 10.2;
    const depth = 29.01;
    const dimensions = { width, height, depth };
    globalThis.fetch = vi.fn(() =>
      mockFetch(200, {
        ...mockProduct('product', 0, 'Test', 1, dimensions),
      })
    );

    await act(async () => {
      render(<ProductPage />);
    });

    const widthElement = screen.getByText(width);
    expect(widthElement.textContent).toEqual(`${width}`);

    const heightElement = screen.getByText(height);
    expect(heightElement.textContent).toEqual(`${height}`);

    const depthElement = screen.getByText(depth);
    expect(depthElement.textContent).toEqual(`${depth}`);
  });

  it('displays button "Add to cart"', async () => {
    globalThis.fetch = vi.fn(() =>
      mockFetch(200, {
        ...mockProduct('title', 0, 'test'),
      })
    );

    
    await act(async () => {
      render(<ProductPage />);
    });

    const btn = screen.getByRole('button');
    expect(btn.textContent).toEqual('Add to cart');
  })
});
