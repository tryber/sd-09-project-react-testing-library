import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();

  return {
    ...render(<Router history={ history }>{ component }</Router>), history,
  };
};

describe('Requisito 6', () => {
  it('Testa reenderização de um card pokemon', () => {
    const { getByTestId, getByRole } = renderWithRouter(<App />);
    const pokemonName = getByTestId('pokemon-name');
    expect(pokemonName).toBeInTheDocument();
    expect(pokemonName).toHaveTextContent('Pikachu');
    const pokemonType = getByTestId('pokemon-type');
    expect(pokemonType).toBeInTheDocument();
    expect(pokemonType).toHaveTextContent('Electric');
    const pokemonWeight = getByTestId('pokemon-weight');
    expect(pokemonWeight).toHaveTextContent('Average weight: 6.0 kg');
    const pokemonImage = getByRole('img');
    expect(pokemonImage.src).toBe('https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(pokemonImage.alt).toBe('Pikachu sprite');
  });

  it('Testa se contém um link para exibir detalhes do pokemon', () => {
    const { getByText } = renderWithRouter(<App />);
    const pokemonLink = getByText('More details');
    expect(pokemonLink).toBeInTheDocument();
    expect(pokemonLink).toHaveAttribute('href', '/pokemons/25');
  });

  it('Testa se é feito o redirecionamento para a página de detalhes do pokémon', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const pokemonLink = getByText('More details');
    expect(pokemonLink).toBeInTheDocument();
    userEvent.click(pokemonLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  it('Testa se é feito o redirecionamento para a página de detalhes do pokémon', () => {
    const { getAllByRole } = renderWithRouter(<Pokemon
      pokemon={ pokemons[0] }
      isFavorite
    />);
    const images = getAllByRole('img');
    expect(images[1]).toHaveAttribute('src', '/star-icon.svg');
    expect(images[1].alt).toBe('Pikachu is marked as favorite');
  });
});
