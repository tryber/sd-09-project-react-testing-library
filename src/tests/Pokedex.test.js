import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

describe('Bloco de testes para o componente Pókedex.js', () => {
  const nextPokemonBtnText = 'Próximo pokémon';

  it('Testa se a pagina contem um heading h2 com o texto "Encountered pokémon"', () => {
    /*  const pokemonMock = [
      {
        id: 25,
        image: 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
        name: 'Pikachu',
        type: 'Electric',
        averageWeight: { measurementUnit: 'kg', value: '6.0' },
      },
      {
        id: 4,
        image: 'https://cdn.bulbagarden.net/upload/0/0a/Spr_5b_004.png',
        name: 'Charmander',
        type: 'Fire',
        averageWeight: { measurementUnit: 'kg', value: '8.5' },
      },
    ];
    const isPokemonFavoriteById = {
      4: false,
      25: false,
    };

    global.fetch = jest.fn().mockReturnValue({
      json: async () => pokemonMock,
    }); */
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );
    const pokedexHeading = getByText('Encountered pokémons');
    expect(pokedexHeading).toBeInTheDocument();
  });

  it('Testa se é exibido o próximo Pókemon quando o botao é clicado', () => {
    const { getByText, getByAltText } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );
    const nextPokemonBtn = getByText(nextPokemonBtnText);
    fireEvent.click(nextPokemonBtn);
    const nextPokemon = getByAltText('Charmander sprite');
    expect(nextPokemon).toBeInTheDocument();
    fireEvent.click(nextPokemonBtn);
    const nextPokemon2 = getByAltText('Caterpie sprite');
    expect(nextPokemon2).toBeInTheDocument();
    const pokemons = 7;
    for (let i = 0; i < pokemons; i += 1) {
      fireEvent.click(nextPokemonBtn);
    }
    const fistPokemon = getByAltText('Pikachu sprite');
    expect(fistPokemon).toBeInTheDocument();
  });

  it('Testa se a Pokédex tem botões de filtro', () => {
    const { getAllByRole } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );
    const pokedexBtns = getAllByRole('button');
    const numberOfBtnsAtPokedex = 9;
    expect(pokedexBtns.length).toBe(numberOfBtnsAtPokedex);
  });

  it('Testa se ao selecionar um filtro, é mostrado apenas pokemons deste tipo', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );
    const fireBtn = getByText('Fire');
    fireEvent.click(fireBtn);
    const nextPokemonBtn = getByText(nextPokemonBtnText);
    fireEvent.click(nextPokemonBtn);
    const rapidashPokemon = getByText('Rapidash');
    expect(rapidashPokemon).toBeInTheDocument();
  });

  it('Testa se a Pokédex contém um botão para resetar o filtro', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );
    const allBtn = getByText('All');
    fireEvent.click(allBtn);
    const fistPokemon = getByText('Pikachu');
    expect(fistPokemon).toBeInTheDocument();
  });

  it('Testa se é criado, um botão de filtro para cada tipo de Pokémon.', () => {
    const { getAllByTestId } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );
    const typeBtn = getAllByTestId('pokemon-type-button');
    typeBtn.map((btn) => expect(btn).toBeInTheDocument());
  });

  it('O botao "Proximo pokémon" deve ser desabilitado quando necessario', () => {
    const { getByText, getAllByRole } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );
    const pageBtns = getAllByRole('button');
    fireEvent.click(pageBtns[1]);
    const nextPokemonBtn = getByText(nextPokemonBtnText);
    expect(nextPokemonBtn.disabled).toBe(true);
    fireEvent.click(pageBtns[3]);
    const nextPokemonBtn1 = getByText(nextPokemonBtnText);
    expect(nextPokemonBtn1.disabled).toBe(true);
  });
});
