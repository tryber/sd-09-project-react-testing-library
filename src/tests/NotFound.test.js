import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('About.js', () => {
  test('Verify Heading h2 and text Page requested not found', () => {
    render(<NotFound />);

    const title = screen.getByRole('heading', { level: 2 });
    const emojiTitle = '<span role="img" aria-label="Crying emoji"> 😭</span>';
    expect(title).toBeInTheDocument();
    expect(title.innerHTML).toBe(`Page requested not found${emojiTitle}`);
  });

  test('Test image', () => {
    render(<NotFound />);

    const pathImage = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const image = screen.getAllByRole('img');
    expect(image[1].src).toBe(pathImage);
  });
});
