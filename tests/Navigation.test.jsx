import { describe, expect, it, vi } from 'vitest';
import Navigation from '../src/components/Navigation';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { v1 as uuid } from 'uuid';
import { ShoppingCart } from '../src/App';

// eslint-disable-next-line react/prop-types
const TestNavigation = ({links, shoppingOnClick}) => {
  return (
    <MemoryRouter>
      <ShoppingCart.Provider value={{ cart: [], setCart: () => {} }}>
        <Navigation shoppingOnClick={shoppingOnClick} links={links} />
      </ShoppingCart.Provider>
    </MemoryRouter>
  );
}

describe('Navigation', () => {
  it('matches snapshot', () => {
    const { container } = render(
      <TestNavigation links={[{ id: '123', to: '/', name: 'test' }]} shoppingOnClick={() => {}} />
    );

    expect(container).toMatchSnapshot();
  });
  it('has a button with shopping card label text for carts', () => {
    render(
        <TestNavigation
          links={[]}
          shoppingOnClick={() => {}}
        />
    );

    expect(screen.queryByLabelText('shopping card')).not.toEqual(null);
  });

  it('calls shopping onclick prop when shopping cart clicked', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(<TestNavigation links={[]} shoppingOnClick={onClick} />);
    const btn = screen.getByLabelText('shopping card');

    await user.click(btn);
    expect(onClick.mock.calls.length).toEqual(1);

    await user.click(btn);
    expect(onClick.mock.calls.length).toEqual(2);

    await user.click(btn);
    expect(onClick.mock.calls.length).toEqual(3);
  });

  it('does not call shopping onclick prop when shopping cart is not clicked', () => {
    const onClick = vi.fn();
    render(<TestNavigation links={[]} shoppingOnClick={onClick} />);

    expect(onClick.mock.calls.length).toEqual(0);
  });

  it('adds link', () => {
    const testName = uuid();
    render(
      <TestNavigation
        links={[{ id: '123', to: '/', name: 'test' }]}
        shoppingOnClick={() => {}}
      />
    );

    const link = screen.findByText(testName);
    expect(link).not.equal(null);
  })
});