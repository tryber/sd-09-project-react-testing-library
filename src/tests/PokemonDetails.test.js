import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('testa o component PokemonDetails.js', () => {
  test('testa se as infos detalhadas do Pokémon selecionado aparecem', () => {
    const {
      getByText, getAllByRole, getAllByAltText, getByRole, history,
    } = renderWithRouter(<App />);
    const moreDetails = getByText('More details');
    fireEvent.click(moreDetails);
    expect(history.location.pathname).toBe(`/pokemons/${pokemons[0].id}`);
    expect(moreDetails).not.toBeInTheDocument();

    const mainText = getByText(/Details/i).textContent;
    expect(mainText).toBe(`${pokemons[0].name} Details`);

    const h2Titles = getAllByRole('heading', { level: 2 });
    expect(h2Titles[1].textContent).toBe('Summary');

    const summaryText = getByText(`${pokemons[0].summary}`);
    expect(summaryText).toBeInTheDocument();

    expect(h2Titles[2].textContent).toBe(`Game Locations of ${pokemons[0].name}`);

    const pokeLocations = getAllByAltText(`${pokemons[0].name} location`);
    expect(pokeLocations[1]).toBeInTheDocument();
    expect(pokeLocations[0]).toBeInTheDocument();
    expect(pokeLocations[0].src).toBe(`${pokemons[0].foundAt[0].map}`);
    expect(pokeLocations[1].src).toBe(`${pokemons[0].foundAt[1].map}`);
    const imgsLocation = getAllByRole('img', { name: `${pokemons[0].name} location` });
    expect(imgsLocation[0]).toHaveAttribute('alt');
    expect(imgsLocation[1]).toHaveAttribute('alt');

    const favOption = getByRole(
      'checkbox', { checked: false, name: 'Pokémon favoritado?' },
    );
    expect(favOption).toBeInTheDocument();
    fireEvent.click(favOption);
    expect(favOption).toBeChecked();
    fireEvent.click(favOption);
    expect(favOption).not.toBeChecked();
  });
});
