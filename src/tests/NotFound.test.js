import React from 'react';
import NotFound from '../components/NotFound';
import renderWithRouter from '../helper/renderWithRouter';

describe('4- Test the component <NotFound />', () => {
  it('Should render h2 with `Page request not found`', () => {
    const { getByRole } = renderWithRouter(<NotFound />);
    const textNotFound = getByRole('heading', {
      level: 2,
    });

    expect(textNotFound.textContent).toBe('Page requested not found 😭');
  });

  it('Should be render a img `Pikachu crying`', () => {
    const { getByAltText } = renderWithRouter(<NotFound />);
    const altText = /Pikachu crying because the page requested was not found/;
    const tagImg = getByAltText(altText);
    const srcOfImg = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

    expect(tagImg.src).toBe(srcOfImg);
  });
});
