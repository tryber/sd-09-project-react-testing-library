import React from 'react';
import { fireEvent } from '@testing-library/dom';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Test Component Pokedex', () => {
  const favoritePokemonIds = {
    4: false,
    10: false,
    23: false,
    25: false,
    65: false,
    78: false,
    143: false,
    148: false,
    151: false,
  };
  const eight = 8;

  it('should contains a h2 tag with Encountered pokémons on it', () => {
    const { getByRole } = renderWithRouter(
      <App
        pokemons={ pokemons }
        isPokemonFavoriteById={ favoritePokemonIds }
      />,
    );

    const h2 = getByRole('heading', { level: 2 });
    expect(h2).toHaveTextContent('Encountered pokémons');
  });

  it('should show next pokémon on click next pokémon button', () => {
    const { getByTestId, getAllByText, getAllByRole } = renderWithRouter(
      <App
        pokemons={ pokemons }
        isPokemonFavoriteById={ favoritePokemonIds }
      />,
    );

    const moreDetails = 'More details';
    const pikachuPath = '/pokemons/25';
    let actualPokemon = getAllByText(moreDetails);
    expect(actualPokemon[0].attributes[0].value).toBe(pikachuPath);

    const nextButton = getByTestId('next-pokemon');
    expect(nextButton).toBeInTheDocument();
    expect(nextButton).toHaveTextContent('Próximo pokémon');
    fireEvent.click(nextButton);

    actualPokemon = getAllByText(moreDetails);
    expect(actualPokemon[0].attributes[0].value).toBe('/pokemons/4');
    expect(actualPokemon).toHaveLength(1);

    const nine = 9;
    for (let i = 1; i < nine; i += 1) {
      fireEvent.click(nextButton);
    }
    actualPokemon = getAllByText(moreDetails);
    expect(actualPokemon[0].attributes[0].value).toBe(pikachuPath);
    const pokeName = getByTestId('pokemon-name');
    expect(pokeName).toBeInTheDocument();
    const allBtn = getAllByRole('button');
    const filterBtn = allBtn.filter((button) => button.innerHTML !== 'Próximo pokémon');
    expect(filterBtn).toHaveLength(eight);
    filterBtn.forEach((element) => {
      expect(element).toBeInTheDocument();
    });
    const fireBtn = filterBtn.filter((btn) => btn.innerHTML === 'Fire');
    fireEvent.click(fireBtn[0]);
    const filteredPokemons = pokemons.filter((poke) => poke.type === 'Fire');
    expect(filteredPokemons).toHaveLength(2);

    fireEvent.click(allBtn[0]);
    actualPokemon = getAllByText(moreDetails);
    expect(actualPokemon[0].attributes[0].value).toBe(pikachuPath);
  });

  it('should filter the type of the pokemon', () => {
    const seven = 7;

    const { getAllByTestId } = renderWithRouter(
      <App
        pokemons={ pokemons }
        isPokemonFavoriteById={ favoritePokemonIds }
      />,
    );

    const typeButtons = getAllByTestId('pokemon-type-button');
    expect(typeButtons.length).toBe(seven);
    expect(typeButtons[0]).toBeInTheDocument();
    expect(typeButtons[5]).toBeInTheDocument();
  });

  it('should show all pokemons if click in button All', () => {
    const { getByText } = renderWithRouter(
      <App
        pokemons={ pokemons }
        isPokemonFavoriteById={ favoritePokemonIds }
      />,
    );

    const allButton = getByText('All');
    expect(allButton.type).toBe('button');
    expect(allButton).toBeInTheDocument();
  });
});
