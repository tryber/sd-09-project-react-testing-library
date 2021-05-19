import React from 'react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../components/NotFound';

describe('Testing the NotFound component', () => {
  it('Should contain a heading', () => {
    const { getByText } = renderWithRouter(<NotFound />);
    const h2 = getByText(/Page requested not found/i);

    expect(h2).toBeInTheDocument();
    expect(h2.tagName).toBe('H2');
  });
  it('Should contains a image', () => {
    const { getAllByRole } = renderWithRouter(<NotFound />);
    const images = getAllByRole('img');
    const url = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

    images.forEach((image) => {
      if (image.tagName === 'IMG') {
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute('src', url);
      }
    });
  });
});
