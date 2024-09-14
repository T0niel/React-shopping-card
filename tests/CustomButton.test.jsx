import { describe, expect, it, vi } from 'vitest';
import CustomButton from '../src/components/CustomButton';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('CustomButton', () => {
    it('Matches snapshot', () => {
        const { container } = render(
          <CustomButton onClick={() => {}} text="Hello" />
        );

        expect(container).toMatchSnapshot();
    })

    it('Renders the text', () => {
        render(<CustomButton onClick={() => {}} text='Hello'/>);

        const button = screen.queryByText('Hello');
        expect(button).not.toEqual(null);
    })

    it('Calls onClick when button clicked', async () => {
        const user = userEvent.setup();
        const onClick = vi.fn();
        render(<CustomButton onClick={onClick} text="Hello" />);
        
        const button = screen.queryByText('Hello');
        await user.click(button);

        expect(onClick.mock.calls.length).toEqual(1)
    })
    
    it('it does not call onClick when button not clicked', () => {
      const onClick = vi.fn();
      render(<CustomButton onClick={onClick} text="Hello" />);

      expect(onClick.mock.calls.length).toEqual(0);
    });
})