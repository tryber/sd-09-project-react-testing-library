import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Requisito 07 - PokemonDetails.js', () => {
  it('Testa se as informações do Pokémon são mostradas na tela.', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);

    const detailsLink = getByText(/More details/i);
    expect(detailsLink).toBeInTheDocument();

    userEvent.click(detailsLink);
    const pokemonTitle = getByRole('heading', {
      level: 2,
      name: /Pikachu Details/i,
    });
    expect(pokemonTitle).toBeInTheDocument();

    const summaryTitle = getByRole('heading', {
      level: 2,
      name: /Summary/i,
    });
    expect(summaryTitle).toBeInTheDocument();

    const paragraph = getByText(/Pokémon roasts hard berries with electricity/i);
    expect(paragraph).toBeInTheDocument();
  });

  it('Testa se existe seção com mapas contendo localizações do pokémon', () => {
    const {
      getByText,
      getByRole,
      getAllByAltText,
      getAllByRole,
    } = renderWithRouter(<App />);

    const detailsLink = getByText(/More details/i);
    expect(detailsLink).toBeInTheDocument();

    userEvent.click(detailsLink);
    const location = getAllByAltText(/Pikachu location/i);
    expect(location.length).toEqual(2);

    const locationTitle = getByRole('heading', {
      level: 2,
      name: /Game Locations of Pikachu/i,
    });
    expect(locationTitle).toBeInTheDocument();

    const location1 = getByText(/Kanto Viridian Forest/i);
    expect(location1).toBeInTheDocument();

    const location2 = getByText(/Kanto Power Plant/i);
    expect(location2).toBeInTheDocument();

    const imgLocation1 = getAllByRole('img', {
      alt: 'Pikachu location',
      key: /Kanto Viridian Forest/i,
    });
    expect(imgLocation1[1].src).toBe('https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');

    const imgLocation2 = getAllByRole('img', {
      alt: 'Pikachu location',
      key: /Kanto Power Plant/i,
    });
    expect(imgLocation2[2].src).toBe('https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });

  it('Testa se o usuário pode favoritar pokémon na página de detalhes.', () => {
    const { getByText, getByRole, getByAltText, history } = renderWithRouter(<App />);

    const cardPikachu = getByText(/Pikachu/i);
    expect(cardPikachu).toBeInTheDocument();

    const detailsLink = getByText(/More details/i);
    expect(detailsLink).toBeInTheDocument();

    userEvent.click(detailsLink);
    const { pathname: detailsPath } = history.location;
    expect(detailsPath).toBe('/pokemons/25');

    userEvent.click(getByRole('checkbox'));

    const starPikachu = getByAltText(/pikachu is marked as favorite/i);
    expect(starPikachu).toBeInTheDocument();

    const textFavorite = getByText(/Pokémon favoritado?/i);
    expect(textFavorite).toBeInTheDocument();
  });
});
