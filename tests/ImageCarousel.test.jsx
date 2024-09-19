import { describe, expect, it } from 'vitest';
import ImageCarousel from '../src/components/ImageCarousel';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('ImageCarousel', () => {
  it('Matches snapshot', () => {
    const {container} = render(<ImageCarousel imgs={[]}/>);

    expect(container).toMatchSnapshot()
  })

  it('Displays the first image', () => {
    const imgs = [
      { src: 'https://example.com/imgA', alt: 'imageA' },
      { src: 'https://example.com/imgB', alt: 'imageB' },
      { src: 'https://example.com/imgB', alt: 'imageC' },
    ];
    render(<ImageCarousel imgs={imgs} />);

    const img = screen.getByRole('img');
    expect(img.src).toEqual('https://example.com/imgA');
  })

  it('Adds alt to the first image', () => {
    const imgs = [
      { src: 'https://example.com/imgA', alt: 'imageA' },
      { src: 'https://example.com/imgB', alt: 'imageB' },
      { src: 'https://example.com/imgB', alt: 'imageC' },
    ];
    render(<ImageCarousel imgs={imgs} />);

    const img = screen.getByRole('img');
    expect(img.alt).toEqual('imageA');
  });

  it('Has a button with the text ">" that spins to the images on the right when clicked', async () => {
    const user = userEvent.setup();

    const imgs = [
      { src: 'https://example.com/imgA', alt: 'imageA' },
      { src: 'https://example.com/imgB', alt: 'imageB' },
      { src: 'https://example.com/imgC', alt: 'imageC' },
    ];
    render(<ImageCarousel imgs={imgs} />);

    const img = screen.getByRole('img');
    const btn = screen.getByText('>');

    expect(img.src).toEqual('https://example.com/imgA');
    expect(img.alt).toEqual('imageA');
    await user.click(btn);
    expect(img.src).toEqual('https://example.com/imgB');
    expect(img.alt).toEqual('imageB');
    await user.click(btn);
    expect(img.src).toEqual('https://example.com/imgC');
    expect(img.alt).toEqual('imageC');

    //When clicked again it wraps around
    await user.click(btn);
    expect(img.src).toEqual('https://example.com/imgA');
    expect(img.alt).toEqual('imageA');
  });

  it('Has a button with the text "<" that spins to the images on the left when clicked', async () => {
    const user = userEvent.setup();

    const imgs = [
      { src: 'https://example.com/imgA', alt: 'imageA' },
      { src: 'https://example.com/imgB', alt: 'imageB' },
      { src: 'https://example.com/imgC', alt: 'imageC' },
    ];
    render(<ImageCarousel imgs={imgs} />);

    const img = screen.getByRole('img');
    const btn = screen.getByText('<');

    //When clicked again it wraps around
    await user.click(btn);
    expect(img.src).toEqual('https://example.com/imgC');
    expect(img.alt).toEqual('imageC');
    await user.click(btn);
    expect(img.src).toEqual('https://example.com/imgB');
    expect(img.alt).toEqual('imageB');
    await user.click(btn);
    expect(img.src).toEqual('https://example.com/imgA');
    expect(img.alt).toEqual('imageA');

  });
});
