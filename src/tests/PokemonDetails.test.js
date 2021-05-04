import React from 'react';
import { fireEvent } from '@testing-library/dom';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

const pikachuPath = '/pokemons/25';
const pikachuDetail = 'Pikachu Details';

describe('informações detalhadas do Pokémon devem ser mostradas na tela', () => {
  it('Deve conter um texto <name> Details, onde <name> é o nome do Pokémon', () => {
    const { getByText, history } = renderWithRouter(<App />);

    fireEvent.click(getByText(/More details/i));

    const { location } = history;

    const { pathname } = location;

    expect(pathname).toBe(pikachuPath);

    const heading = getByText('Pikachu Details');

    expect(heading).toBeInTheDocument();
  });

  it('Verifica se o link More details saiu da tela', () => {
    const { getByText, history, queryByText } = renderWithRouter(<App />);

    fireEvent.click(getByText(/More details/i));

    const { location } = history;

    const { pathname } = location;

    expect(pathname).toBe(pikachuPath);

    const link = queryByText('More details');

    expect(link).not.toBeInTheDocument();
  });

  it('A seção de detalhes deve conter um heading h2 com o texto Summary', () => {
    const { getByText, history, queryByRole } = renderWithRouter(<App />);

    fireEvent.click(getByText(/More details/i));

    const { location } = history;

    const { pathname } = location;

    expect(pathname).toBe(pikachuPath);

    const heading = getByText(pikachuDetail);

    expect(heading).toBeInTheDocument();

    const heading2 = queryByRole('heading', { level: 2, name: 'Summary' });

    expect(heading2).toBeInTheDocument();
  });

  it('A seção de detalhes deve conter um parágrafo com o resumo do Pokémon', () => {
    const { getByText, history } = renderWithRouter(<App />);

    fireEvent.click(getByText(/More details/i));

    const { location } = history;

    const { pathname } = location;

    expect(pathname).toBe(pikachuPath);

    const heading = getByText(pikachuDetail);

    expect(heading).toBeInTheDocument();

    const paragraph = getByText(/This intelligent Pokémon roasts hard berries/i);

    expect(paragraph).toBeInTheDocument();
  });
});

describe('Deve existir na página mapas contendo as localizações do pokémon', () => {
  it('Em detalhes deverá existir um h2 com o texto Game Locations of <name>', () => {
    const { getByText, queryByRole, history } = renderWithRouter(<App />);

    fireEvent.click(getByText(/More details/i));

    const { location } = history;

    const { pathname } = location;

    expect(pathname).toBe(pikachuPath);

    const heading2 = queryByRole('heading',
      {
        level: 2, name: 'Game Locations of Pikachu',
      });

    expect(heading2).toBeInTheDocument();
  });

  it('Todas as localizações do Pokémon devem ser mostradas na seção de detalhes;', () => {
    const { queryAllByAltText, getByText, history } = renderWithRouter(<App />);

    fireEvent.click(getByText(/More details/i));

    const { location } = history;

    const { pathname } = location;

    expect(pathname).toBe(pikachuPath);

    const firstPokemonLocation = getByText('Kanto Viridian Forest');

    expect(firstPokemonLocation).toBeInTheDocument();

    const secondPokemonLocation = getByText('Kanto Power Plant');

    expect(secondPokemonLocation).toBeInTheDocument();

    const locationImg = queryAllByAltText(/Pikachu location/i);

    expect(locationImg[0].getAttribute('src')).toBe('https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
  });
});

describe('O usuário deve poder favoritar o pokémon pela página de detalhes.', () => {
  it('A página deve exibir um checkbox que permite favoritar o Pokémon;', () => {
    const { getByRole, getByText, history } = renderWithRouter(<App />);

    fireEvent.click(getByText(/More details/i));

    const { location } = history;

    const { pathname } = location;

    expect(pathname).toBe(pikachuPath);

    const checkbox = getByRole('checkbox',
      {
        name: /Pokémon favoritado?/i,
        checked: false,
      });

    fireEvent.click(checkbox);

    expect(checkbox).toBeInTheDocument();
  });
});
