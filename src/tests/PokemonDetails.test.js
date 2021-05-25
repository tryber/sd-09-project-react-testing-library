import React from 'react';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';
import App from '../App';

const moreDetails = 'More details';

describe('Testing Component PokemonDetails', () => {
  it('verifies if informations is display', () => {
    renderWithRouter(<App />);

    const phrase = (
      'This intelligent Pokémon roasts hard '
      + 'berries with electricity to make them tender enough to eat.'
    );

    const detailsLink = screen.getByText(moreDetails);
    userEvent.click(detailsLink);

    const textDetails = screen.getByRole('heading', {
      level: 2,
      name: 'Pikachu Details',
    });
    const heading = screen.getByRole('heading', {
      level: 2,
      name: 'Summary',
    });
    const textoSumario = screen.getByText('Summary');
    expect(textDetails).toBeInTheDocument();
    expect(detailsLink).not.toBeInTheDocument();
    expect(heading).toBeInTheDocument();
    expect(textoSumario).toBeInTheDocument();
    expect(textoSumario.nextSibling.textContent).toBe(phrase);

    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemonType');
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    const pokemonImg = screen.getByAltText('Pikachu sprite');

    expect(pokemonName).toHaveTextContent('Pikachu');
    expect(pokemonType).toHaveTextContent('Electric');
    expect(pokemonWeight).toHaveTextContent('Average weight: 6.0 kg');
    expect(pokemonImg.src).toBe(
      'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
    );
  });

  it('verifies if maps exists', () => {
    renderWithRouter(<App pokemons={ pokemons } />);
    const link = screen.getByText(moreDetails);
    userEvent.click(link);

    const mapContent = screen.getByRole('heading', {
      level: 2,
      name: 'Game Locations of Pikachu',
    });
    expect(mapContent).toBeInTheDocument();

    const locationImg = screen.getAllByAltText('Pikachu location');
    expect(pokemons[0].foundAt.length).toBe(locationImg.length);
    expect(locationImg[0].src)
      .toBe(
        'https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
      );
    expect(locationImg[1].src)
      .toBe(
        'https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
      );
  });

  it('verifies if favorite pokemon', () => {
    renderWithRouter(<App />);
    const link = screen.getByText(moreDetails);
    userEvent.click(link);

    const checkBox = screen.getByRole('checkbox');
    expect(checkBox).toBeInTheDocument();

    userEvent.click(checkBox);
    expect(checkBox.checked).toBeTruthy();
    userEvent.click(checkBox);
    expect(checkBox.checked).toBeFalsy();
    expect(checkBox.previousSibling.textContent).toBe('Pokémon favoritado?');
  });
});
