import React from 'react';
import renderWithRouter from './renderWithRouter';
import NotFound from '../components/NotFound';

describe('Requirement 4: Test the component <NotFound.js />', () => {
  test('Tests if there is a "h2" with the correct text', () => {
    const { getByRole, getByText } = renderWithRouter(<NotFound />);

    const notFoundHeading = getByRole('heading', {
      level: 2,
    });
    expect(notFoundHeading).toBeInTheDocument();

    const notFoundHeadingText = getByText('Page requested not found');
    expect(notFoundHeadingText).toBeInTheDocument();
  });

  test('Tests if the page load the correct image', () => {
    const { getByAltText } = renderWithRouter(<NotFound />);

    const img = getByAltText('Pikachu crying because the page requested was not found');
    expect(img.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
