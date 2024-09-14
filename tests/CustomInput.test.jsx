import { describe, expect, it, vi } from 'vitest';
import CustomInput from '../src/components/CustomInput';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Custom input', () => {
  it('Matches snapshot', () => {
    const { container } = render(
      <CustomInput placeholder="" onChange={() => {}} type="text" />
    );
    expect(container).toMatchSnapshot();
  });

  it('Calls onChange when changing the input', async () => {
    const user = userEvent.setup();

    const onChange = vi.fn();
    render(<CustomInput placeholder="" onChange={onChange} type="text" />);

    const input = screen.getByRole('textbox');

    await user.type(input, 'Hello');

    expect(onChange.mock.calls.length).toEqual(5);
  });

  it('Does not call onChange when input does not change', () => {
    const onChange = vi.fn();
    render(<CustomInput placeholder="" onChange={onChange} type="text" />);
    expect(onChange.mock.calls.length).toEqual(0);
  });

  it('Changes the value of input when typing', async () => {
    const user = userEvent.setup();
    render(<CustomInput placeholder="" onChange={() => {}} type="text" />);

    const input = screen.getByRole('textbox');

    await user.type(input, 'Hello');

    expect(input.value).toEqual('Hello');
  });

  it('Displays placeholder', () => {
    render(
      <CustomInput placeholder="search" onChange={() => {}} type="text" />
    );

    const input = screen.queryByPlaceholderText('search');
    expect(input).not.toEqual(null);
  });

  it('Has the type passed (1)', () => {
    render(
      <CustomInput placeholder="search" onChange={() => {}} type="text" />
    );

    const input = screen.queryByRole('textbox');
    expect(input).toHaveAttribute('type', 'text');
  });

  it('Has the type passed (2)', () => {
    render(
      <CustomInput placeholder="search" onChange={() => {}} type="email" />
    );

    const input = screen.queryByRole('textbox');
    expect(input).toHaveAttribute('type', 'email');
  });
});
