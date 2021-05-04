import React from 'react';
import { render } from '@testing-library/react';
import { NotFound } from '../components';

describe('Teste o componente <NotFound.js />', () => {
  it('Teste se página contém a mensagem not found', () => {
    const { getByText } = render(<NotFound />);

    const heading = getByText('Page requested not found');

    expect(heading).toBeInTheDocument();
  });

  it('teste se a página mostra a imagem', () => {
    const { getByAltText } = render(<NotFound />);

    const imgAlt = getByAltText(/Pikachu crying because the page requested was/i);

    expect(imgAlt.getAttribute('src')).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
