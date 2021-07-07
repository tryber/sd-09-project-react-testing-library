import React from 'react';
import { Router } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import App from '../App';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={ history }>{component}</Router>), history,
  });
};

describe('testando o arquivo PokemonDetails ', () => {
  it('Verifica se as informações detalhadas do Pokémon selecionado exibe na tela', () => {
    const { getByText, getAllByRole } = renderWithRouter(<App />);
    const zero = 0;
    const detailsLink = getByText('More details');
    fireEvent.click(detailsLink);
    expect(detailsLink).not.toBeInTheDocument();
    expect(getByText('Pikachu Details')).toBeInTheDocument();
    expect(getByText('Summary')).toBeInTheDocument();
    expect(getAllByRole('generic')[zero]).toHaveTextContent('roasts hard berries');
  });

  it('Verifica se na página há seção c/ o mapa que tem localizações do pokémon', () => {
    const { getByText, getAllByAltText } = renderWithRouter(<App />);
    const two = 2;
    fireEvent.click(getByText('More details'));
    const locations = getAllByAltText('Pikachu location');
    expect(getByText('Game Locations of Pikachu')).toBeInTheDocument();
    expect(getByText('Kanto Viridian Forest')).toBeInTheDocument();
    expect(getByText('Kanto Power Plant')).toBeInTheDocument();
    expect(locations.length).toBe(two);
    expect(locations[0].src).toBe('https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(locations[1].src).toBe('https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });

  it('As informações detalhadas do Pokémon selecionado são mostradas na tela', () => {
    const { getByText } = renderWithRouter(<App />);
    fireEvent.click(getByText('More details'));
    expect(getByText('Pokémon favoritado?')).toBeInTheDocument();
  });
});
