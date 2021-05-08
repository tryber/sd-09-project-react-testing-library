import React from 'react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Requisito 04 - NotFound.js', () => {
  it('Testa se pág contém um heading h2 "Page requested not found 😭"', () => {
    const { history, getByRole, getByLabelText } = renderWithRouter(<App />);

    const route = '/xablau';
    history.push(route);

    const h2Text = getByRole('heading', {
      level: 2,
      name: /Page requested not found/i,
    });
    expect(h2Text).toBeInTheDocument();

    const emoji = getByLabelText(/Crying emoji/i, {
      children: /😭/,
    });
    expect(emoji).toBeInTheDocument();
  });

  it('Testa se há a img "https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif".', () => {
    const { history, getByAltText } = renderWithRouter(<App />);

    const route = '/xablau';
    history.push(route);

    const image = getByAltText(/Pikachu crying because the page requested was not found/);

    expect(image.src).toContain('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
