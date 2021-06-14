import React from 'react';
import { render } from '@testing-library/react';
import About from '../components/About';

describe('testes para requito 2', () => {
  test('Verificar se contem dois paragrefo', () => {
    const { getAllByText } = render(<About />);
    const informacao = getAllByText(/Pokémons/);
    expect(informacao[0]).toBeInTheDocument();
    expect(informacao[1]).toBeInTheDocument();
  });

  test('Verifica se contem H2 com com texto About Pokédex', () => {
    const { getByText } = render(<About />);
    const h2 = getByText(/^About Pokédex$/);
    expect(h2).toBeInTheDocument();
  });

  test('Verifica se contem imagem ', () => {
    const { getByRole } = render(<About />);
    const imagem = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const img = getByRole('img');
    expect(img).toBeInTheDocument();
    expect(img.src).toBe(imagem);
  });
});
