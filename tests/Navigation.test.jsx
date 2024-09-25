import { describe, expect, it, vi } from 'vitest';
import Navigation from '../src/components/Navigation';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { v1 as uuid } from 'uuid';
import { ShoppingCart } from '../src/App';

// eslint-disable-next-line react/prop-types
const TestNavigation = ({links}) => {
  return (
    <MemoryRouter>
      <ShoppingCart.Provider value={{ cart: [], setCart: () => {} }}>
        <Navigation links={links} />
      </ShoppingCart.Provider>
    </MemoryRouter>
  );
}

describe('Navigation', () => {
  it('matches snapshot', () => {
    const { container } = render(
      <TestNavigation links={[{ id: '123', to: '/', name: 'test' }]}/>
    );

    expect(container).toMatchSnapshot();
  });
  it('has a button with shopping card label text for carts', () => {
    render(
        <TestNavigation
          links={[]}
        />
    );

    expect(screen.queryByLabelText('shopping card')).not.toEqual(null);
  });

  it('adds link', () => {
    const testName = uuid();
    render(
      <TestNavigation
        links={[{ id: '123', to: '/', name: 'test' }]}
      />
    );

    const link = screen.findByText(testName);
    expect(link).not.equal(null);
  })
});