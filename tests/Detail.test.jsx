import { describe, expect, it } from 'vitest';
import Detail from '../src/components/Detail';
import { render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Detail', () => {
  it('Match snapshot', () => {
    const { container } = render(<Detail text={''} description={''} />);
    expect(container).toMatchSnapshot();
  });

  it('Displays the text', () => {
    render(<Detail text={'Hello'} description={''} />);

    const text = screen.queryByText('hello');

    expect(text).not.toEqual(null);
  });

  it('Displays description onclick', () => {
    const user = userEvent.setup();

    const { container } = render(
      <Detail text={'test'} description={'some description'} />
    );

    user.click(container);
    expect(screen.queryByText('some description')).not.toEqual(null);
  });

  it('Hides description when clicked twice', () => {
    const user = userEvent.setup();

    const { container } = render(
      <Detail text={'test'} description={'some description'} />
    );

    user.click(container);
    expect(screen.queryByText('some description')).not.toEqual(null);
    user.click();
    expect(screen.queryByText('some description')).toEqual(null);
  });

  it('Does not display description when not clicked', () => {
    render(<Detail text={'test'} description={'some description'} />);

    expect(screen.queryByText('some description')).toEqual(null);
  });
});
