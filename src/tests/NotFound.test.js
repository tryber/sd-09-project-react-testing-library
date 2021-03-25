import React from 'react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Tests the not found page', () => {
  test('the notfound page renderizes properly', () => {
    const { history, getByText, getByRole, getByAltText } = renderWithRouter(<App />);
    history.push('/fake/page');
    const notFound = getByText(/Page requested not found/i);
    const notFoundEmoji = getByRole('img', { name: 'Crying emoji' });
    const notFoundImg = getByAltText(/Pikachu crying because/i);
    expect(notFound).toBeInTheDocument();
    expect(notFoundEmoji).toBeInTheDocument();
    expect(notFoundImg.src).toEqual('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
