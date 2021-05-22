import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import NotFound from '../components/NotFound';

describe('Teste component NotFound', () => {
  it('Texto exibindo não encontrado', () => {
    renderWithRouter(<NotFound />);
    const notFound = screen.getByRole(
      'heading',
      { name: 'Page requested not found Crying emoji', level: 2 },
    );

    expect(notFound).toBeInTheDocument();
  });

  it('Existe uma imagem', () => {
    renderWithRouter(<NotFound />);
    const notFoundImage = screen.getByAltText(
      'Pikachu crying because the page requested was not found',
    );

    expect(notFoundImage).toHaveAttribute(
      'src',
      'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif',
    );
  });
});
