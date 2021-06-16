import React from 'react';
import renderWithRouter from './renderWithRoute';
import { About } from '../components';

describe('Testa funcionalidades do About', () => {
  it('A página tem um titulo About Pokédex', () => {
    const { getByRole } = renderWithRouter(<About />);
    const h2 = getByRole('heading', { level: 2 });
    expect(h2).toBeInTheDocument();
    expect(h2).toHaveTextContent(/About Pokédex/i);
  });

  it('A página contém dois parágrafos com texto sobre a Pokédex', () => {
    const { getByText } = renderWithRouter(<About />);

    const renderP1 = getByText(/This application simulates a Pokédex/i);
    const renderP2 = getByText(/One can filter Pokémons by type/i);

    expect(renderP1).toBeInTheDocument();
    expect(renderP2).toBeInTheDocument();
  });

  it('A pagina contem uma imagem da pokédex', () => {
    const { getByAltText } = renderWithRouter(<About />);

    const img = getByAltText('Pokédex');

    expect(img.src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
