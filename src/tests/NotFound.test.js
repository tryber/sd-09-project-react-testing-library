import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Testa o comportamento do Component NotFound', () => {
  test('Se contem um elemento h2 com o texto `Page requested not found`', () => {
    render(<NotFound />);
    const header = screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found/,
    });

    expect(header).toBeInTheDocument();
  });

  test('Se a URL da imagem renderizada está correta', () => {
    render(<NotFound />);
    const image = screen.getAllByRole('img');

    expect(image[1].src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
