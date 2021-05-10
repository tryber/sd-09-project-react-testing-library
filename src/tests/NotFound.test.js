import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('Teste do componente NotFound', () => {
  it('Teste se página contém um heading h2 com o texto Page requested not found', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pagina-nao-existente/aqui');
    expect(screen.getByText(/Page requested not found/i)).toBeInTheDocument();
  });

  it('Teste se página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif',
    () => {
      const { history } = renderWithRouter(<App />);
      history.push('/pagina-nao-existente/aqui');
      const imgPikachu = screen.getAllByRole('img');
      expect(imgPikachu[1].src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
    });
});
