import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

describe('Bloco de testes para o componente PokemonDetails.js', () => {
  const moreDetails = 'More details';
  it('Testa se as informações detalhadas do Pokémon selecionado são mostradas', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );
    const moreInfoLink = getByText(moreDetails);
    fireEvent.click(moreInfoLink);
    const detailsTitle = getByText('Pikachu Details');
    expect(detailsTitle).toBeInTheDocument();
    const sumary = getByText('Summary');
    expect(sumary).toBeInTheDocument();
    const detailsParagraph = getByText(/This intelligent Pokémon roasts /i);
    expect(detailsParagraph).toBeInTheDocument();
  });

  it('Testa se existe uma seção com os mapas contendo as localizações do pokémon', () => {
    const { getByText, getAllByAltText } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );
    const moreInfoLink = getByText(moreDetails);
    fireEvent.click(moreInfoLink);
    const locationHeading = getByText('Game Locations of Pikachu');
    expect(locationHeading).toBeInTheDocument();
    const pokemonLocationImg = getAllByAltText('Pikachu location');
    expect(pokemonLocationImg[0].src).toBe('https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
  });

  it('Testa se o usuário pode favoritar um pokémon através da página de detalhes', () => {
    const { getByText, getByLabelText, getByAltText } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );
    const moreInfoLink = getByText(moreDetails);
    fireEvent.click(moreInfoLink);
    const favoriteCheckBox = getByLabelText('Pokémon favoritado?');
    fireEvent.click(favoriteCheckBox);
    const starIcon = getByAltText('Pikachu is marked as favorite');
    expect(starIcon).toBeInTheDocument();
  });
});
