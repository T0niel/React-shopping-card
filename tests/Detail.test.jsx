import { describe, expect, it } from 'vitest';
import Detail from '../src/components/Detail';
import { render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Detail', () => {
  it('Match snapshot', () => {
    const { container } = render(<Detail text={''} ></Detail>);
    expect(container).toMatchSnapshot();
  });

  it('Displays the text', () => {
    render(<Detail text={'hello'} ></Detail>);

    const text = screen.queryByText('hello');

    expect(text).not.toEqual(null);
  });

  it('Displays children onclick', async () => {
    const user = userEvent.setup();

    render(
      <Detail text={'test'} >
        <h1>some description</h1>
      </Detail>
    );

    const container = screen.getByText('test').closest('div');
    await user.click(container);
    expect(screen.queryByText('some description')).not.toEqual(null);
  });

  it('Hides children when clicked twice', async () => {
    const user = userEvent.setup();

    render(
      <Detail text={'test'}>
        <h1>some description</h1>
      </Detail>
    );

    const container = screen.getByText('test').closest('div');
    await user.click(container);
    expect(screen.queryByText('some description')).not.toEqual(null);
    await user.click();
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
