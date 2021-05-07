import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helper/renderWithRouter';
import { pokemonMock, isFavoritePokemonMock } from './__mocks__/pokemonMock';
import Pokemon from '../components/Pokemon';

const INITIAL_POKEMON = pokemonMock[0];

function setupCard(pokemonSetup = INITIAL_POKEMON, props = undefined) {
  const ALL = 'All';
  const utils = renderWithRouter(
    <Pokemon pokemon={ pokemonSetup } isFavorite showDetailsLink { ...props } />,
  );

  function testPokemonCard({
    id,
    name,
    type,
    image,
    averageWeight: { value, measurementUnit },
  }) {
    const pokemonName = screen.queryByTestId('pokemon-name');
    const pokemonType = screen.queryByTestId('pokemonType');
    const pokemonWeight = screen.queryByTestId('pokemon-weight');
    const pokemonImg = (aria) => screen.queryByRole('img', { name: `${aria} sprite` });

    expect(pokemonName).toHaveTextContent(name);
    expect(pokemonType).toHaveTextContent(type);
    expect(pokemonImg(name).src).toBe(image);
    expect(pokemonImg(name).alt).toBe(`${name} sprite`);
    expect(pokemonWeight).toHaveTextContent(
      `Average weight: ${value} ${measurementUnit}`,
    );
    const pokemonNameResolved = pokemonName.textContent;
    return {
      dbPokemonID: id,
      dbName: name,
      pokemonDisplayName: pokemonNameResolved,
    };
  }

  return {
    ...utils,
    testPokemonCard: (pokemonTest = pokemonSetup) => testPokemonCard(pokemonTest),
    dbPokemonFetchByField: (field) => pokemonMock.map((pokemonMap) => pokemonMap[field]),
    dbPokemonFetchByType: (type) => pokemonMock.filter((pokemonFilt) => {
      if (type === ALL) return true;
      return pokemonFilt.type === type;
    }),
    nowPathname: () => utils.history.location.pathname,
  };
}

test('if the default test pokemon card is rendered and test each field', () => {
  setupCard().testPokemonCard();
});

test('if setup test card by pokemon is rendered ok and test each field', () => {
  const CHARMANDER = pokemonMock[1];
  setupCard(CHARMANDER).testPokemonCard(CHARMANDER);
});

pokemonMock.forEach((pokemon) => {
  test(`if tested card ${pokemon.name} has either navigation link`, () => {
    const { getByRole, testPokemonCard } = setupCard(pokemon);
    const navLink = getByRole('link', { name: 'More details' });
    const pokemonID = testPokemonCard(pokemon);
    expect(navLink).toHaveAttribute(
      'href',
      `/pokemons/${pokemonID.dbPokemonID}`,
    );
  });
});

pokemonMock.forEach((pokemon) => {
  test(`when click at More details in ${pokemon.name}`
    + ' card link redirects to add its details', () => {
    const { testPokemonCard, nowPathname } = setupCard(pokemon);
    const pokemonID = testPokemonCard(pokemon);
    userEvent.click(screen.getByRole('link', { name: 'More details' }));
    expect(nowPathname()).toBe(`/pokemons/${pokemonID.dbPokemonID}`);
    testPokemonCard(pokemon);
  });
});

pokemonMock.forEach((pokemon) => {
  const isDbFav = isFavoritePokemonMock[pokemon.id];
  test(`check if ${pokemon.name} card has star icon favorite: ${isDbFav}`, () => {
    const { testPokemonCard } = setupCard(pokemon, { isFavorite: isDbFav });
    testPokemonCard(pokemon);
    const starIcon = screen.queryByRole('img', { name: /favorite/i });
    if (isDbFav) {
      expect(starIcon).toBeInTheDocument();
      expect(starIcon).toHaveAttribute('src', '/star-icon.svg');
      expect(starIcon).toHaveAttribute('alt', `${pokemon.name} is marked as favorite`);
    } else { expect(starIcon).toBeNull(); }
  });
});
