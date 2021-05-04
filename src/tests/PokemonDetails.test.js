import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import RenderWithRouter from '../services/RenderWithRouter';

const md = 'More details';

describe('Teste o componente <PokemonDetails.js />', () => {
  it('Testa se há um texto com o nome do pokemon', () => {
    const { getByText } = RenderWithRouter(<App />);
    const moreDetails = getByText(md);
    fireEvent.click(moreDetails);
    const namePokemon = getByText('Pikachu Details');
    expect(namePokemon).toHaveTextContent(/Pikachu Details/i);
    expect(moreDetails).not.toBeInTheDocument();
  });

  it('A seção de detalhes deve conter um heading h2 com o texto Summary', () => {
    const { getByRole, getByText } = RenderWithRouter(<App />);
    const moreDetails = getByText(md);
    fireEvent.click(moreDetails);
    const summary = getByRole('heading', { level: 2, name: 'Summary' });
    expect(summary).toHaveTextContent('Summary');
  });

  it('Verifica se há um parágrafo c/ o resumo do Pokemon', () => {
    const { getByText, queryByText } = RenderWithRouter(<App />);
    const moreDetails = getByText(md);
    fireEvent.click(moreDetails);
    const
      content = queryByText(
        /This intelligent Pokémon roasts hard berries with electricity/i,
      );
    expect(content).toHaveTextContent(
      /This intelligent Pokémon roasts hard berries with electricity/i,
    );
  });
});

describe('Teste a favoritação de um pokémon através da página de detalhes.', () => {
  it('Verifica se há um checkbox que permite favoritar o pokemon', () => {
    const { getByRole, getByText, getByAltText } = RenderWithRouter(<App />);
    const moreDetails = getByText(md);
    fireEvent.click(moreDetails);
    const cb = getByRole('checkbox');
    expect(cb).toBeInTheDocument();
    fireEvent.click(cb);
    const img = getByAltText(/Pikachu is marked as favorite/i);
    expect(img.src).toBe('http://localhost/star-icon.svg');
    fireEvent.click(cb);
    expect(img).not.toBeInTheDocument();
    fireEvent.click(cb);
    expect(img.src).toBe('http://localhost/star-icon.svg');
    fireEvent.click(cb);
    expect(img).not.toBeInTheDocument();
  });

  it('O label do checkbox deve conter o texto Pokémon favoritado?', () => {
    const { getByText } = RenderWithRouter(<App />);
    const moreDetails = getByText(md);
    fireEvent.click(moreDetails);
    const labelFav = getByText(/Pokémon favoritado?/i);
    expect(labelFav).toBeInTheDocument();
  });

  it('Verifica imagens no location', () => {
    const {
      queryByText,
      getByText,
      getByRole,
      getAllByAltText,
    } = RenderWithRouter(<App />);
    const moreDetails = getByText(md);
    fireEvent.click(moreDetails);
    const gameLocations = getByRole('heading', {
      level: 2,
      name: 'Game Locations of Pikachu',
    });
    expect(gameLocations).toBeInTheDocument();
    const location1 = queryByText('Kanto Viridian Forest');
    const location2 = queryByText('Kanto Power Plant');
    const maps = getAllByAltText('Pikachu location');
    expect(location1).toBeInTheDocument();
    expect(location2).toBeInTheDocument();
    expect(maps[0].src).toBe('https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(maps[1].src).toBe('https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });

  it('Testa se tem h2 com o texto "Game Locations of <name>', () => {
    const { getByText, getByRole } = RenderWithRouter(<App />);
    const moreDetails = getByText(md);
    fireEvent.click(moreDetails);
    const location = getByRole('heading', {
      level: 2,
      name: 'Game Locations of Pikachu',
    });
    expect(location).toBeInTheDocument();
  });
});
