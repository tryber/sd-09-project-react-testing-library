import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../components/RenderWithRouter';
import About from '../components/About';

describe('Testes para o componente <About />', () => {
  it('Verifica se existem informações sobre a Pokédex', () => {
    renderWithRouter(<About />);

    const heading = screen.getByRole('heading', {
      level: 2,
      name: /About Pokédex/i,
    });

    expect(heading).toBeInTheDocument();
  });

  it('Verifica se existe a imagem de uma pokédex', () => {
    renderWithRouter(<About />);

    const path = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

    const image = screen.getByRole('img', {
      name: 'Pokédex',
    });

    expect(image).toHaveProperty('src', path);
  });
});
