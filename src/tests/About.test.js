import React from 'react';
import renderWithRouter from './renderWithRouter';
import About from '../components/About';

describe('Teste component About', () => {
  it('testa se a página contém as informações sobre a Pokédex.', () => {
    const { getByText } = renderWithRouter(<About />);
    expect(getByText('About Pokédex')).toBeInTheDocument();
  });

  it('testa se a página contém um heading h2 com o texto About Pokédex.', () => {
    const { getByRole } = renderWithRouter(<About />);
    expect(getByRole('heading', { level: 2 })).toBeInTheDocument();
  });

  it('testa se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    const { getByRole } = renderWithRouter(<About />);
    const srcImg = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(getByRole('img')).toHaveAttribute('src', srcImg);
  });
});

/*
Teste se a página contém dois parágrafos com texto sobre a Pokédex.

Teste se a página contém a seguinte imagem de uma Pokédex: https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png.

O que será verificado:

Será avaliado se o arquivo teste About.test.js contemplam 100% dos casos de uso criados pelo Stryker. */
