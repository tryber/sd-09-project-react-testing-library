import React from 'react';
import renderWithRouter from './help-test/renderWithRouter';
import NotFound from '../components/NotFound';

describe('NotFound', () => {
  it('should contain an heading h2 with the text Page requested not found', () => {
    const { getByText } = renderWithRouter(<NotFound />);
    expect(getByText('Page requested not found')).toBeInTheDocument();
  });

  it('should show the image', () => {
    const { getAllByRole } = renderWithRouter(<NotFound />);
    const imgSrc = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const listRoles = getAllByRole('img');
    expect(listRoles[1]).toHaveAttribute('src', imgSrc);
  });
});
