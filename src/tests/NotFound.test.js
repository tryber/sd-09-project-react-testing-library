import React from 'react';
import NotFound from '../components/NotFound';
import renderWithRouter from '../helper/renderWithRouter';

describe('Requirement 04, tests the NotFound.js component', () => {
  it('has a heading, level 2, with text `Page requested not found 😭`', () => {
    const { getByRole } = renderWithRouter(<NotFound />);
    const notFoundHeading = getByRole(
      'heading',
      { level: 2, name: 'Page requested not found Crying emoji' },
    );
    expect(notFoundHeading).toBeInTheDocument();
  });
  it('has a Pikachu image', () => {
    const { getAllByRole } = renderWithRouter(<NotFound />);
    const pikachuImage = getAllByRole('img')[1];
    expect(pikachuImage).toHaveAttribute(
      'src',
      'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif',
    );
  });
});
