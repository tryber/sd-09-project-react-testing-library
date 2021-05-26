import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import Pokemon from '../components/Pokemon';
import renderWithRouter from './renderWithRouter';

describe('Teste se é renderizado um card com informações de determinado pokémon', () => {
  const pokemon = {
    id: 25,
    name: 'Pikachu',
    type: 'Electric',
    averageWeight: {
      value: '6.0',
      measurementUnit: 'kg',
    },
    image: 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
    foundAt: [
      {
        location: 'Kanto Viridian Forest',
        map: 'https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
      },
      {
        location: 'Kanto Power Plant',
        map: 'https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
      },
    ],
    summary: 'This intelligent Pokémon electricity to make them tender enough to eat.',
  };

  test('O nome, tipo, peso e imagem devem estar corretos ao ser exibido na tela;', () => {
    renderWithRouter(<Pokemon pokemon={ pokemon } isFavorite={ false } />);
    const name = screen.getByText('Pikachu');
    expect(name).toBeInTheDocument();
    const type = screen.getByText('Electric');
    expect(type).toBeInTheDocument();
    const averageWeight = screen.getByText(/Average weight: 6.0 kg/i);
    expect(averageWeight).toBeInTheDocument();
    const containsImg = screen.getByAltText('Pikachu sprite');
    expect(containsImg.src).toContain(
      'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
    );
  });

  test('Teste se o card do Pok. ind. na Pokédex contém um link de nav.', () => {
    renderWithRouter(<Pokemon pokemon={ pokemon } isFavorite={ false } />);
    const verifyLink = screen.getByRole('link');
    fireEvent.click(verifyLink);
    expect(verifyLink).toBeInTheDocument();
    const moreDetails = screen.getByText(/More Details/i);
    expect(moreDetails).toBeInTheDocument();
  });
  test('Teste também se a URL exibida no navegador muda para /pokemon/<id>', () => {
    const { history } = renderWithRouter(
      <Pokemon
        pokemon={ pokemon }
        isFavorite
      />,
    );
    const linkDet = screen.getByRole('link');
    fireEvent.click(linkDet);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/pokemons/25');
  });

  test('Deve ser uma img com o atrib. src. A imagem deve ter o atributo alt', () => {
    renderWithRouter(<Pokemon pokemon={ pokemon } isFavorite />);
    const starIcon = screen.getByAltText(/Pikachu is marked as favorite/i);
    expect(starIcon.src).toContain('/star-icon.svg');
  });
});
