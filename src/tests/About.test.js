import React from 'react';
import About from '../components/About';
import renderWithRouter from './renderWithRouter';

describe('testes do componente FavoritePokemons.js',
  () => {
    test('A página deve conter as informações sobre a Pokédex.', () => {
      const { getByText } = renderWithRouter(<About />);
      const info = getByText(/containing all Pokémons/i);
      const info2 = getByText(/each one of them/i);
      expect(info).toBeInTheDocument();
      expect(info2).toBeInTheDocument();
    });

    test('A página deve conter um heading h2 com o texto About Pokédex', () => {
      const { getByRole } = renderWithRouter(<About />);
      const h2 = getByRole('heading', {
        level: 2, name: 'About Pokédex' });
      expect(h2).toBeInTheDocument();
    });

    test('A página deve conter dois parágrafos com texto sobre a Pokédex', () => {
      const { getAllByText } = renderWithRouter(<About />);
      const p = getAllByText(/pokémons/i);
      expect(p.length).toBe(2);
    });

    test('Teste se a página contém a imagem de uma Pokédex com src correta', () => {
      const { getByRole } = renderWithRouter(<About />);
      const img = getByRole('img');
      expect(img).toHaveAttribute(
        'src',
        'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
      );
    });
  });
