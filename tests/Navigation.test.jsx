import { describe, expect, it, vi } from 'vitest';
import Navigation from '../src/components/Navigation';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { v1 as uuid } from 'uuid';

describe('Navigation', () => {
  it('matches snapshot', () => {
    const { container } = render(
      <BrowserRouter>
        <Navigation
          cartAmount={0}
          shoppingOnClick={() => {}}
          links={[{ id: 123, to: '/', name: 'test' }]}
        />
      </BrowserRouter>
    );

    expect(container).toMatchSnapshot();
  });
  it('has a button with shopping card label text for carts', () => {
    render(<Navigation cartAmount={0} shoppingOnClick={() => {}} links={[]} />);

    expect(screen.queryByLabelText('shopping card')).not.toEqual(null);
  });

  it('calls shopping onclick prop when shopping cart clicked', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(<Navigation cartAmount={0} shoppingOnClick={onClick} links={[]} />);
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
    render(<Navigation cartAmount={0} shoppingOnClick={onClick} links={[]} />);

    expect(onClick.mock.calls.length).toEqual(0);
  });

  it('adds link', () => {
    const testName = uuid();
    render(
      <BrowserRouter>
        <Navigation
          cartAmount={0}
          shoppingOnClick={() => {}}
          links={[{ id: 123, to: '/', name: testName }]}
        />
      </BrowserRouter>
    );

    const link = screen.findByText(testName);
    expect(link).not.equal(null);
  })
});
