import React from 'react';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';

describe('testa o component NotFound.js', () => {
  test('testa se a página contém um heading h2 com determinado texto', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    history.push('/anything');
    const errorMessage = getByRole(
      'heading',
      { level: 2, name: /Page requested not found/ },
    );
    expect(errorMessage).toBeInTheDocument();
  });

  test('testa se a página mostra determinada imagem', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    history.push('/anything');
    const imgError = getByRole(
      'img',
      { name: 'Pikachu crying because the page requested was not found' },
    );
    expect(imgError.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
