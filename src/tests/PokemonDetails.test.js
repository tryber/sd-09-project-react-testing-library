import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Detailed info about the pokemon is shown on the screen', () => {
  let randomIndex;
  let randomPokemon;

  beforeEach(() => {
    randomIndex = Math.floor(Math.random() * pokemons.length);
    randomPokemon = pokemons[randomIndex];
  });

  it('renders a heading with the name of the pokemon', () => {
    const { name } = randomPokemon;
    const { getByRole } = renderWithRouter(<App />);

    const nextButton = getByRole('button', { name: /próximo pokémon/i });
    for (let count = randomIndex; count > 0; count -= 1) userEvent.click(nextButton);
    const moreDetailsButton = getByRole('link', { name: /more details/i });
    userEvent.click(moreDetailsButton);

    expect(getByRole('heading', {
      level: 2,
      name: new RegExp(`${name} details`, 'i'),
    })).toBeInTheDocument();
  });

  it('renders no link to "More details"', () => {
    const { getByRole, queryByRole } = renderWithRouter(<App />);

    const nextButton = getByRole('button', { name: /próximo pokémon/i });
    for (let count = randomIndex; count > 0; count -= 1) userEvent.click(nextButton);
    const moreDetailsButton = getByRole('link', { name: /more details/i });
    userEvent.click(moreDetailsButton);

    expect(queryByRole('link', { name: /more details/i })).not.toBeInTheDocument();
  });

  it('contains a details section with a heading lvl 2 "Summery"', () => {
    const { getByRole } = renderWithRouter(<App />);

    const nextButton = getByRole('button', { name: /próximo pokémon/i });
    for (let count = randomIndex; count > 0; count -= 1) userEvent.click(nextButton);
    const moreDetailsButton = getByRole('link', { name: /more details/i });
    userEvent.click(moreDetailsButton);

    expect(getByRole('heading', {
      level: 2,
      name: /summary/i,
    })).toBeInTheDocument();
  });

  it('renders a paragraph about the pokemon', () => {
    const { summary } = randomPokemon;
    const { getByRole, getByText } = renderWithRouter(<App />);

    const nextButton = getByRole('button', { name: /próximo pokémon/i });
    for (let count = randomIndex; count > 0; count -= 1) userEvent.click(nextButton);
    const moreDetailsButton = getByRole('link', { name: /more details/i });
    userEvent.click(moreDetailsButton);

    expect(getByText(summary, { selector: 'p' })).toBeInTheDocument();
  });
});

describe('A map section is shown on the screen', () => {
  let randomIndex;
  let randomPokemon;

  beforeEach(() => {
    randomIndex = Math.floor(Math.random() * pokemons.length);
    randomPokemon = pokemons[randomIndex];
  });

  it('render a heading lvl 2 with text "Game locations of <name>"', () => {
    const { name } = randomPokemon;
    const { getByRole } = renderWithRouter(<App />);

    const nextButton = getByRole('button', { name: /próximo pokémon/i });
    for (let count = randomIndex; count > 0; count -= 1) userEvent.click(nextButton);
    const moreDetailsButton = getByRole('link', { name: /more details/i });
    userEvent.click(moreDetailsButton);

    expect(getByRole('heading', {
      level: 2,
      name: new RegExp(`game locations of ${name}`, 'i'),
    })).toBeInTheDocument();
  });

  it('renders all locations', () => {
    const { name, foundAt } = randomPokemon;
    const { getByRole, getAllByRole, getByText } = renderWithRouter(<App />);

    const nextButton = getByRole('button', { name: /próximo pokémon/i });
    for (let count = randomIndex; count > 0; count -= 1) userEvent.click(nextButton);
    const moreDetailsButton = getByRole('link', { name: /more details/i });
    userEvent.click(moreDetailsButton);

    const img = getAllByRole('img', { name: new RegExp(`${name} location`, 'i') });
    expect(img).toHaveLength(foundAt.length);

    foundAt.forEach(({ location, map }, index) => {
      const description = getByText(location, { selector: 'em' });
      expect(description).toBeInTheDocument();
      expect(img[index].src).toBe(map);
    });
  });
});

describe('A form to favorite the pokemon is shown', () => {
  let randomIndex;
  let randomPokemon;

  beforeEach(() => {
    randomIndex = Math.floor(Math.random() * pokemons.length);
    randomPokemon = pokemons[randomIndex];
  });

  it('renders a checkbox to favorite the pokemon', () => {
    const { name } = randomPokemon;
    const { history, getByRole, getByLabelText, getByText } = renderWithRouter(<App />);

    const nextButton = getByRole('button', { name: /próximo pokémon/i });
    for (let count = randomIndex; count > 0; count -= 1) userEvent.click(nextButton);
    const moreDetailsButton = getByRole('link', { name: /more details/i });
    userEvent.click(moreDetailsButton);

    // Favorite pokemon
    const checkbox = getByLabelText('Pokémon favoritado?');
    userEvent.click(checkbox);
    expect(checkbox).toBeChecked();

    // Goes to Favorites to check if it is rendered there
    const favoritesLink = getByRole('link', { name: /favorite pokémons/i });
    userEvent.click(favoritesLink);
    expect(getByText(name, { selector: 'p' })).toBeInTheDocument();

    // Goes back, unfavorite and check if it is gone
    history.goBack();
    userEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
    // history.goForward();
    // expect(getByText('No favorite pokemon found', { selector: 'p' })).toBeInTheDocument();
  });
});
