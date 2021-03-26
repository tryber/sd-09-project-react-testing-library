import React from 'react';
import { render } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('testing App component paths of the webpage', () => {
  it('Testing NotFound page', () => {
    const { getByRole } = render(<NotFound />);
    const notFound = getByRole('heading', { name: /Page requested not found/i });
    expect(notFound).toBeInTheDocument();
  });

  it('testing if it has an especific image gif', () => {
    const { getByAltText } = render(<NotFound />);
    const imagePath = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const img = getByAltText(/Pikachu crying because the page requested was not found/i);
    expect(img).toBeInTheDocument();
    expect(img.src).toBe(imagePath);
  });
});
