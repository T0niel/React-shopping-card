import { describe, expect, it } from 'vitest';
import Detail from '../src/components/Detail';
import { render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Detail', () => {
  it('Match snapshot', () => {
    const { container } = render(<Detail text={''} ></Detail>);
    expect(container).toMatchSnapshot();
  });

  it('Displays the text', () => {
    render(<Detail text={'Hello'} ></Detail>);

    const text = screen.queryByText('hello');

    expect(text).not.toEqual(null);
  });

  it('Displays children onclick', () => {
    const user = userEvent.setup();

    const { container } = render(
      <Detail text={'test'} >
        <h1>some description</h1>
      </Detail>
    );

    user.click(container);
    expect(screen.queryByText('some description')).not.toEqual(null);
  });

  it('Hides children when clicked twice', () => {
    const user = userEvent.setup();

    const { container } = render(
      <Detail text={'test'}>
        <h1>some description</h1>
      </Detail>
    );

    user.click(container);
    expect(screen.queryByText('some description')).not.toEqual(null);
    user.click();
    expect(screen.queryByText('some description')).toEqual(null);
  });

  it('Does not display children when not clicked', () => {
    render(
      <Detail text={'test'}>
        <h1>some description</h1>
      </Detail>
    );

    expect(screen.queryByText('some description')).toEqual(null);
  });
});
