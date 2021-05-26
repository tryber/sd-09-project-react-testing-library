import React from 'react';
import { render } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Testing <NotFound.js />', () => {
  it('Should render a h2 heading with the text `Page requested not found`', () => {
    const { getByRole } = render(<NotFound />);
    const h2 = getByRole('heading', { name: /Page requested not found/i });
    expect(h2).toBeInTheDocument();
  });

  it('Should contain an image', () => {
    const { getByAltText } = render(<NotFound />);
    const url = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const img = getByAltText(/Pikachu crying because the page requested was not found/i);
    expect(img.src).toBe(url);
  });
});
