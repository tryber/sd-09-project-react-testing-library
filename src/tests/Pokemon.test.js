import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Testes do componente Pokemon', () => {
  const moreDetails = 'More details';
  it('Teste se é renderizado um card com as informações do pokémon.', () => {
    const { getByTestId, getByRole } = renderWithRouter(<App />);
    const pokemonName = getByTestId('pokemon-name');
    expect(pokemonName.innerHTML).toBe('Pikachu');
    const pokemonType = getByTestId('pokemonType');
    expect(pokemonType.innerHTML).toBe('Electric');
    const pokemonWeigth = getByTestId('pokemon-weight');
    expect(pokemonWeigth.innerHTML).toBe('Average weight: 6.0 kg');
    const pokemonImage = getByRole('img');
    expect(pokemonImage).toBeInTheDocument();
    expect(pokemonImage.src).toBe(pokemons[0].image);
    expect(pokemonImage.alt).toBe(`${pokemons[0].name} sprite`);
  });

  it('Teste se o card do Pokémon indicado na Pokédex contém um link de navegação', () => {
    const { getByText } = renderWithRouter(<App />);
    const details = getByText(moreDetails);
    expect(details.href).toContain(`pokemons/${pokemons[0].id}`);
  });

  it('Teste se ao clicar no link do Pokémon o componente é renderizado', () => {
    const { getByText } = renderWithRouter(<App />);
    const details = getByText(moreDetails);
    userEvent.click(details);
    const summary = getByText('Summary');
    expect(summary).toBeInTheDocument();
  });

  it('Teste se ao clicar no link do Pokémon, a URL muda', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const details = getByText(moreDetails);
    userEvent.click(details);
    const { pathname } = history.location;
    expect(pathname).toContain(`pokemons/${pokemons[0].id}`);
  });

  it('Teste se existe um ícone de estrela nos Pokémons favoritados', () => {
    const { getAllByRole, getByLabelText, getByText } = renderWithRouter(<App />);
    const details = getByText(moreDetails);
    userEvent.click(details);
    const favorite = getByLabelText('Pokémon favoritado?');
    userEvent.click(favorite);
    const images = getAllByRole('img');
    expect(images[1]).toBeInTheDocument();
    expect(images[1].alt).toBe(`${pokemons[0].name} is marked as favorite`);
    expect(images[1].src).toContain('star-icon.svg');
  });
});
