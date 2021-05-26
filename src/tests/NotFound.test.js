import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../components/NotFound';

const url = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

describe('Test "Not Found" functionality', () => {
  test('Renders message with h2 tag', () => {
    render(<NotFound />);
    const message = screen.getByText(/Page requested not found/);
    expect(message).toBeInTheDocument();
  });
  test('Checks image url', () => {
    render(<NotFound />);
    const image = screen.getByAltText(/pikachu crying/i);
    expect(image.src).toBe(url);
  });
});
