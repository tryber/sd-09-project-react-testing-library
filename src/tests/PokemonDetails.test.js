import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

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
  summary: 'This intelligent Pokémon roasts hard berries with electricity to '
  + 'make them tender enough to eat.',
};

const MORE_DETAILS = 'More details';

describe('Testando o componente <PokemonDetails.js />', () => {
  it('Verifica se as informações detalhadas do Pokémon selecionado são mostradas'
  + ' na tela', () => {
    const { queryByText, getByTestId, getAllByRole } = renderWithRouter(<App />);

    const namePokemon = getByTestId('pokemon-name');
    const linkPokemon = queryByText(MORE_DETAILS);
    userEvent.click(linkPokemon);

    const textHeading = getAllByRole('heading', { level: 2 });
    expect(textHeading[0]).toBeInTheDocument();
    expect(textHeading[0].textContent)
      .toStrictEqual(`${namePokemon.textContent} Details`);

    const linkMore = queryByText(MORE_DETAILS);
    expect(linkMore).not.toBeInTheDocument();

    expect(textHeading[1].textContent).toStrictEqual('Summary');

    const paragraphSummary = queryByText(/intelligent/i).textContent;
    expect(paragraphSummary).toStrictEqual(pokemon.summary);
  });

  it('Verifica se existe na página uma seção com os mapas contendo as localizações do '
  + 'pokémon', () => {
    const { getByText, getAllByRole, getAllByText } = renderWithRouter(<App />);
    const { name, foundAt } = pokemon;

    const namePokemon = getByText(/pikachu/i);
    const linkPokemon = getByText(MORE_DETAILS);
    userEvent.click(linkPokemon);

    const textHeading = getAllByRole('heading', { level: 2 });
    expect(textHeading[2]).toBeInTheDocument();
    expect(textHeading[2].textContent)
      .toStrictEqual(`Game Locations of ${namePokemon.textContent}`);

    const nameLocation = getAllByText(/kanto/i);
    const imagesDetails = getAllByRole('img');

    expect(nameLocation[0].textContent).toBe(foundAt[0].location);
    expect(nameLocation[1].textContent).toBe(foundAt[1].location);

    expect(imagesDetails[1].src).toMatch(foundAt[0].map);
    expect(imagesDetails[1].alt).toMatch(`${name} location`);

    expect(imagesDetails[2].src).toMatch(foundAt[1].map);
    expect(imagesDetails[2].alt).toMatch(`${name} location`);
  });

  it('Verifica se o usuário pode favoritar um pokémon através da página de detalhes',
    () => {
      const { getByText, getByRole, getByLabelText } = renderWithRouter(<App />);

      const linkPokemon = getByText(MORE_DETAILS);
      userEvent.click(linkPokemon);

      const checkFavorite = getByRole('checkbox');
      expect(checkFavorite).toBeInTheDocument();

      userEvent.click(checkFavorite);
      expect(checkFavorite.checked).toBe(true);

      userEvent.click(checkFavorite);
      expect(checkFavorite.checked).toBe(false);

      const labelFavorite = getByLabelText('Pokémon favoritado?');
      expect(labelFavorite).toBeInTheDocument();
    });
});
