import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('testa o component PokemonDetails.js', () => {
  test('testa se as infos detalhadas do Pokémon selecionado aparecem', () => {
    const { history } = renderWithRouter(<App />);

    const mrDetails = screen.queryByText('More details');
    fireEvent.click(mrDetails);
    expect(mrDetails).not.toBeInTheDocument();
    expect(history.location.pathname).toBe(`/pokemons/${pokemons[0].id}`);

    const titles = screen.getAllByRole('heading', { level: 2 });
    expect(titles[1].textContent).toBe('Summary');

    const text = screen.getByText(/Details/i).textContent;
    expect(text).toBe(`${pokemons[0].name} Details`);

    const summary = screen.getByText(`${pokemons[0].summary}`);
    expect(summary).toBeInTheDocument();

    expect(titles[2].textContent).toBe(`Game Locations of ${pokemons[0].name}`);

    const locations = screen.getAllByAltText(`${pokemons[0].name} location`);
    expect(locations[1]).toBeInTheDocument();
    expect(locations[0]).toBeInTheDocument();
    expect(locations[0].src).toBe(`${pokemons[0].foundAt[0].map}`);
    expect(locations[1].src).toBe(`${pokemons[0].foundAt[1].map}`);
    const locImg = screen.getAllByRole('img', { name: `${pokemons[0].name} location` });
    expect(locImg[0]).toHaveAttribute('alt');
    expect(locImg[1]).toHaveAttribute('alt');

    const favPok = screen.getByRole(
      'checkbox', { checked: false, name: 'Pokémon favoritado?' },
    );
    expect(favPok).toBeInTheDocument();
    fireEvent.click(favPok);
    expect(favPok).toBeChecked();
    fireEvent.click(favPok);
    expect(favPok).not.toBeChecked();
  });
});
