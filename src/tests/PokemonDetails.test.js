import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();

  return {
    ...render(<Router history={ history }>{ component }</Router>), history,
  };
};

const MORE_DETAILS = 'More details';

describe('Requisito 7', () => {
  it('Testa as informaçõoes de página de detalhes do pokémon', () => {
    const { queryByText, getByText, getAllByRole } = renderWithRouter(<App />);
    const pokemonLink = getByText(MORE_DETAILS);
    userEvent.click(pokemonLink);
    const pokemonTitle = getByText('Pikachu Details');
    expect(pokemonTitle).toBeInTheDocument();
    const pokemonLink2 = queryByText(MORE_DETAILS);
    expect(pokemonLink2).toBeNull();
    const titles = getAllByRole('heading', { level: 2 });
    expect(titles[1]).toHaveTextContent('Summary');
    const description = queryByText(/This intelligent Pokémon roasts hard berries with/i);
    expect(description).toBeInTheDocument();
  });

  it('Testa se existe uma seção de mapas com as localizações do pokémon', () => {
    const { getByText, getAllByRole } = renderWithRouter(<App />);
    const pokemonLink = getByText(MORE_DETAILS);
    userEvent.click(pokemonLink);
    const titles = getAllByRole('heading', { level: 2 });
    expect(titles[2]).toHaveTextContent('Game Locations of Pikachu');
    const pokemonLocation1 = getByText('Kanto Viridian Forest');
    expect(pokemonLocation1).toBeInTheDocument();
    const pokemonLocation2 = getByText('Kanto Power Plant');
    expect(pokemonLocation2).toBeInTheDocument();
    const images = getAllByRole('img');
    expect(images[1]).toBeInTheDocument();
    expect(images[2]).toBeInTheDocument();
    expect(images[1].src).toBe('https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(images[2].src).toBe('https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
    expect(images[1].alt).toBe('Pikachu location');
    expect(images[2].alt).toBe('Pikachu location');
  });

  it('Testa se o pokemon pode ser favoritado', () => {
    const { getByText, getByLabelText, getByRole } = renderWithRouter(<App />);
    const pokemonLink = getByText('More details');
    userEvent.click(pokemonLink);
    const checkbox = getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
    userEvent.click(checkbox);
    expect(checkbox.checked).toBeTruthy();
    const pokemonFavoritado = getByLabelText('Pokémon favoritado?');
    expect(pokemonFavoritado).toBeInTheDocument();
  });
});
