import React from 'react';
import { render } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Testing <NotFound />', () => {
  it('shold contain a heading h2 with the text "Page requested not found 😭"', () => {
    const { getByText } = render(<NotFound />);
    const headingH2 = getByText(/Page requested not found/);
    expect(headingH2).toBeInTheDocument();
  });

  it('shold contain a specific image', () => {
    const { getByAltText } = render(<NotFound />);
    const expectedUrl = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const image = getByAltText(/Pikachu crying because the page requested was not found/);
    expect(image.src).toBe(expectedUrl);
  });
});
