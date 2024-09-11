import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import Card from '../src/components/Card';

describe('Card', () => {
  beforeEach(() => {
    render(
      <Card
        name="test"
        imgUrl="https://example.com"
        price={100}
        category="electronic"
      />
    );
  });

  it('Displays name', () => {
    expect(screen.queryByText('test')).not.toEqual(null);
  });

  it('Displays a img with a url (should have alt of [category]-[product])', () => {
    const img = screen.getByAltText('electronic test');
    expect(img.src).toEqual('https://example.com');
  });

  it('Displays price', () => {
    expect(screen.queryByText('100')).not.toEqual(null);
  });

  it('Displays category', () => {
    expect(screen.queryByText('electronic')).not.toEqual(null);
  });
});