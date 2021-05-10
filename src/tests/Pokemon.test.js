import React from 'react';
import { fireEvent } from '@testing-library/dom';
import renderWithRouter from '../services/renderWithRouter';
import Pokemon from '../components/Pokemon';
import App from '../App';

describe('Teste o componente <Pokemon.js />', () => {
  const pokemonTest = {
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
    summary: 'This intelligent Pokémon roasts hard berries'
      + ' with electricity to make them tender enough to eat.',
  };
  const { averageWeight, id, image, name, type } = pokemonTest;
  const { measurementUnit, value } = averageWeight;
  const moreDeatils = 'More details';

  it('É renderizado um card com as informações de determinado pokémon', () => {
    const { getByTestId, getByRole } = renderWithRouter(
      <Pokemon pokemon={ pokemonTest } />,
    );

    expect(getByTestId('pokemon-name').textContent).toBe(name);
    expect(getByTestId('pokemonType').textContent).toBe(type);
    expect(getByTestId('pokemon-weight')
      .textContent).toBe(`Average weight: ${value} ${measurementUnit}`);
    expect(getByRole('img').src).toEqual(image);
    expect(getByRole('img').alt).toEqual(`${name} sprite`);
  });

  it('O card do Pokémon contém um link de navegação para exibir detalhes', () => {
    const { getByRole } = renderWithRouter(<Pokemon pokemon={ pokemonTest } />);

    expect(getByRole('link').textContent).toBe(moreDeatils);
    expect(getByRole('link').href).toContain(`/pokemons/${id}`);
  });

  it('Clicar no link é feito o redirecionamento para a página de detalhes', () => {
    const { getByText } = renderWithRouter(<App />);

    expect(getByText(moreDeatils)).toBeInTheDocument();
    fireEvent.click(getByText(moreDeatils));
    expect(getByText(`${name} Details`)).toBeInTheDocument();
  });

  it('URL exibida no navegador muda para /pokemon/<id>', () => {
    const { getByRole, history } = renderWithRouter(<Pokemon pokemon={ pokemonTest } />);

    fireEvent.click(getByRole('link'));
    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemons/${id}`);
  });

  it('Existe um ícone de estrela nos Pokémons favoritados', () => {
    const { getAllByRole } = renderWithRouter(
      <Pokemon pokemon={ pokemonTest } isFavorite="true" />,
    );

    expect(getAllByRole('img')[1].src).toContain('/star-icon.svg');
    expect(getAllByRole('img')[1].alt).toEqual(`${name} is marked as favorite`);
  });
});
