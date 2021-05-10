import React from 'react';
import { render } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Test <NotFound /> component', () => {
  it('should render a h2 tag with text "Page requested not found"', () => {
    const { getByRole } = render(<NotFound />);
    const h2 = getByRole('heading', { level: 2, name: /Page requested not found/ });
    expect(h2).toBeInTheDocument();
  });

  it('should display an image', () => {
    const { getByAltText } = render(<NotFound />);
    const img = getByAltText('Pikachu crying because the page requested was not found');
    const imgPath = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(img.src).toBe(imgPath);
    expect(img).toBeInTheDocument();
  });
});
