import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';
import { Pokemon } from '../components';
import pokemonsList from '../data';

describe('Requisito 06 - Testes do Pokemon.js', () => {
  it('É renderizado um card com as informações de determinado pokémon', () => {
    const { getByTestId, getByRole } = renderWithRouter(<App />);

    const pokemonName = getByTestId('pokemon-name');
    const pokemonType = getByTestId('pokemonType');
    const pokemonWeight = getByTestId('pokemon-weight');
    const pokemonImg = getByRole('img');
    const nextPokemonButton = getByTestId('next-pokemon');

    pokemonsList.forEach(({ name, type, image, averageWeight }) => {
      expect(pokemonName).toHaveTextContent(name);
      expect(pokemonType).toHaveTextContent(type);
      expect(pokemonWeight).toHaveTextContent(
        `Average weight: ${averageWeight.value} ${averageWeight.measurementUnit}`,
      );
      expect(pokemonImg.alt).toBe(`${name} sprite`);
      expect(pokemonImg.src).toBe(image);
      userEvent.click(nextPokemonButton);
    });
  });

  it('O card do Pokémon indicado na Pokédex contém um link de navegação para'
  + ' exibir detalhes deste Pokémon.', () => {
    const { getByRole } = renderWithRouter(<App />);

    const { id } = pokemonsList[0];
    const pokemonDetailsLink = getByRole('link', { name: /more details/i });
    expect(pokemonDetailsLink).toHaveAttribute('href', `/pokemons/${id}`);
  });

  it('Ao clicar no link de navegação do Pokémon, é feito o redirecionamento'
  + ' da aplicação para a página de detalhes de Pokémon.', () => {
    const { getByText } = renderWithRouter(<App />);

    const pokemonDetailsLink = getByText(/more details/i);
    userEvent.click(pokemonDetailsLink);

    const detailedPokemonTitle = getByText(/pikachu details/i);

    expect(detailedPokemonTitle).toBeInTheDocument();
  });

  it('A URL exibida no navegador muda para /pokemon/<id>', () => {
    const { history, getByText } = renderWithRouter(<App />);
    // If you declare pathname here, you will only receive the root pathname '/'

    const pokemonDetailsLink = getByText(/more details/i);
    userEvent.click(pokemonDetailsLink);

    const { id } = pokemonsList[0];
    const { location: { pathname } } = history; // Get the pathname AFTER the click

    expect(pathname).toBe(`/pokemons/${id}`);
  });

  it('Existe um ícone de estrela nos Pokémons favoritados', () => {
    const { getByAltText } = (
      renderWithRouter(<Pokemon pokemon={ pokemonsList[0] } isFavorite />));

    const star = getByAltText('Pikachu is marked as favorite');
    expect(star).toHaveAttribute('src', '/star-icon.svg');
  });
});
