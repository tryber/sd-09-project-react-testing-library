import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './RenderWithRouter';
import App from '../App';
import pokemons from '../data';

const moreDetails = 'More details';
const links = 3;
describe('Testando o componente PokemonDetails.js', () => {
  test('Teste se as informações detalhadas do Pokémon selecionado são mostradas.', () => {
    const { getByText, getByRole, getAllByRole } = renderWithRouter(<App />);

    const pokemonDetails = getByText(moreDetails);
    fireEvent.click(pokemonDetails);

    const pokemonName = getByText(`${pokemons[0].name} Details`);
    expect(pokemonName).toBeInTheDocument();

    const namePokemon = getByText(pokemons[0].name);
    expect(namePokemon).toBeInTheDocument();

    const section = getByRole('heading', {
      level: 2,
      name: /Summary/,
    });
    expect(section).toBeInTheDocument();

    const sectionParagraph = getByText(pokemons[0].summary);
    expect(sectionParagraph).toBeInTheDocument();

    const link = getAllByRole('link');
    expect(link.length).toBe(links);
  });

  test('Teste se na página há uma seção com as localizações do pokémon', () => {
    const { getByRole, getByText, getAllByRole } = renderWithRouter(<App />);

    const pokemonDetails = getByText(moreDetails);
    fireEvent.click(pokemonDetails);

    const sectionDetails = getByRole('heading', {
      level: 2,
      name: `Game Locations of ${pokemons[0].name}`,
    });
    expect(sectionDetails).toBeInTheDocument();

    const images = getAllByRole('img');
    expect(images[1]).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(images[1]).toHaveAttribute('alt', 'Pikachu location');
    expect(images[2]).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
    expect(images[2]).toHaveAttribute('alt', 'Pikachu location');

    const nameLocation1 = getByText('Kanto Viridian Forest');
    const nameLocation2 = getByText('Kanto Power Plant');
    expect(nameLocation1).toBeInTheDocument();
    expect(nameLocation2).toBeInTheDocument();
  });

  test('Teste se pode favoritar um pokémon através da página de detalhes.', () => {
    const { getByLabelText, getByText } = renderWithRouter(<App />);

    const pokemonDetails = getByText(moreDetails);
    fireEvent.click(pokemonDetails);

    const pokeInput = getByLabelText('Pokémon favoritado?');
    expect(pokeInput).toBeInTheDocument();
    fireEvent.click(pokeInput);
    expect(pokeInput.checked).toEqual(true);
    fireEvent.click(pokeInput);
    expect(pokeInput.checked).toEqual(false);
  });
});
