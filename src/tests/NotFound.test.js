import React from 'react';
import renderWithRouter from './renderWithRoute';
import { NotFound } from '../components';

describe('Teste o componente Not Found', () => {
  it('Aparece titulo e imagem quando não encontrada pagina', () => {
    const { getByAltText, getByText } = renderWithRouter(<NotFound />);

    const title = getByText('Page requested not found');
    const img = getByAltText(/Pikachu crying/i);

    expect(title).toBeInTheDocument();
    expect(img).toBeInTheDocument();
    expect(img.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
