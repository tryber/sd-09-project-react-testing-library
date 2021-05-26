import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

const moreDetails = 'More details';

describe('PokemonDetails.js', () => {
  test('Verify display of pokémon informations details ', () => {
    renderWithRouter(<App />);

    const linkDetails = screen.getByText(moreDetails);
    expect(linkDetails).toBeInTheDocument();

    userEvent.click(linkDetails);

    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toBeInTheDocument();

    const messageDetails = screen.getAllByRole('heading', { level: 2 });
    expect(messageDetails[0].innerHTML).toBe(`${pokemonName.innerHTML} Details`);

    const navLinks = screen.getAllByRole('link');
    const pokemonLink = navLinks.filter((link) => link.innerHTML !== 'Home'
      && link.innerHTML !== 'About' && link.innerHTML !== 'Favorite Pokémons');
    expect(pokemonLink.length).toBe(0);

    const summaryText = messageDetails.find((summary) => summary.innerHTML === 'Summary');
    expect(summaryText.innerHTML).toBe('Summary');

    const selectPoke = pokemons.find((pokemon) => pokemon.name === pokemonName.innerHTML);
    const summary = screen.getByText(selectPoke.summary);
    expect(summary).toBeInTheDocument();
  });

  test('Verify maps section ', () => {
    renderWithRouter(<App />);

    const linkDetails = screen.getByText(moreDetails);
    expect(linkDetails).toBeInTheDocument();

    userEvent.click(linkDetails);

    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toBeInTheDocument();

    const messageDetails = screen.getAllByRole('heading', { level: 2 });
    const mapText = `Game Locations of ${pokemonName.innerHTML}`;
    const mapTitle = messageDetails.find((text) => text.innerHTML === mapText);
    expect(mapTitle.innerHTML).toBe(mapText);

    const selectPoke = pokemons.find((pokemon) => pokemon.name === pokemonName.innerHTML);
    const foundAt = selectPoke.foundAt.length;
    const images = screen.getAllByRole('img');
    const altText = `${pokemonName.innerHTML} location`;
    const imagesMap = images.filter((image) => image.alt === altText);
    expect(imagesMap.length).toBe(foundAt);

    selectPoke.foundAt.forEach((local) => {
      const localTitle = screen.getByText(local.location);
      expect(localTitle).toBeInTheDocument();
      const imageSrc = images.find((image) => image.src === local.map);
      expect(imageSrc).toBeInTheDocument();
    });
  });

  test('Verify Pokemon favorite ', () => {
    renderWithRouter(<App />);

    const linkDetails = screen.getByText(moreDetails);
    expect(linkDetails).toBeInTheDocument();

    userEvent.click(linkDetails);

    const checkBox = screen.getByRole('checkbox');
    expect(checkBox).toBeInTheDocument();

    userEvent.click(checkBox);
    expect(checkBox.checked).toBe(true);

    userEvent.click(checkBox);
    expect(checkBox.checked).toBe(false);

    const favoriteLabel = screen.getByText('Pokémon favoritado?');
    expect(favoriteLabel).toBeInTheDocument();
  });
});
