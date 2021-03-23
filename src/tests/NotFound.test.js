import React from 'react';
import { cleanup, screen, render } from '@testing-library/react';
import NotFound from '../components/NotFound';

afterEach(cleanup);

describe('NotFound.js tests', () => {
  it('should contain an h2 with the text "Page requested not found"', () => {
    render(<NotFound />);
    const heading = screen
      .getByRole('heading', { level: 2, name: /Page requested not found/ });
    expect(heading).toBeInTheDocument();
  });
  it('should contain an image with the given URL', () => {
    render(<NotFound />);
    const srcToMatch = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const imagesSrc = screen.getAllByRole('img').map(({ src }) => src);
    expect(imagesSrc).toContain(srcToMatch);
  });
});
