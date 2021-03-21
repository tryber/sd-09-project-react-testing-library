import React from 'react';
import { fireEvent } from '@testing-library/dom';
import renderWithRouter from '../helper/renderWithRouter';
import App from '../App';

const summaryText = [
  'They say that if it emits an aura from its whole body',
  ' the weather will begin to change instantly.',
];

const pokemon = {
  id: 148,
  name: 'Dragonair',
  type: 'Dragon',
  averageWeight: {
    value: '16.5',
    measurementUnit: 'kg',
  },
  image: 'https://cdn.bulbagarden.net/upload/2/2c/Spr_5b_148.png',
  moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Dragonair_(Pok%C3%A9mon)',
  foundAt: [
    {
      location: 'Johto Route 45',
      map: 'https://cdn.bulbagarden.net/upload/2/21/Johto_Route_45_Map.png',
    },
    {
      location: 'Johto Dragon\'s Den',
      map: 'https://cdn.bulbagarden.net/upload/1/1e/Johto_Dragons_Den_Map.png',
    },
  ],
  summary: summaryText.join(),
};

const { name, summary, foundAt } = pokemon;
const urlDetails = 'http://localhost/pokemons/148';

describe('Testa o componente <PokemonDetails.js />', () => {
  it(`Testa se as informações detalhadas do Pokémon selecionado
      são mostradas na tela.`, () => {
    const { getByText, history } = renderWithRouter(<App />);

    const buttonDragon = getByText(/Dragon/i);
    expect(buttonDragon.type).toBe('button');
    fireEvent.click(buttonDragon);

    const moreDetails = getByText(/More details/i);
    expect(moreDetails.href).toBe(urlDetails);
    fireEvent.click(moreDetails);

    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/148');

    const details = getByText(`${name} Details`);
    expect(details).toBeInTheDocument();

    expect(moreDetails).not.toBeInTheDocument();

    const summaryTitle = getByText('Summary');
    expect(summaryTitle).toBeInTheDocument();

    const resume = getByText(summary);
    expect(resume).toBeInTheDocument();
  });

  it(`Testa se existe na página uma seção com os mapas contendo
      as localizações do pokémon.`, () => {
    const { getByText, getAllByAltText, history } = renderWithRouter(<App />);

    const buttonDragon = getByText(/Dragon/i);
    expect(buttonDragon.type).toBe('button');
    fireEvent.click(buttonDragon);

    const moreDetails = getByText(/More details/i);
    expect(moreDetails.href).toBe(urlDetails);
    fireEvent.click(moreDetails);

    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/148');

    const details = getByText(`${name} Details`);
    expect(details).toBeInTheDocument();

    const locationTitle = getByText(`Game Locations of ${name}`);
    expect(locationTitle).toBeInTheDocument();

    const locationImg = getAllByAltText(`${name} location`);
    foundAt.forEach(({ location, map }, index) => {
      const locationElement = getByText(location);
      expect(locationElement).toBeInTheDocument();
      expect(locationImg[index]).toBeInTheDocument();
      expect(locationImg[index].src).toBe(map);
    });
  });

  it(`Testa se o usuário pode favoritar um pokémon através da página
      de detalhes.`, () => {
    const { getByText, getByLabelText,
      getByAltText } = renderWithRouter(<App />);

    const buttonDragon = getByText(/Dragon/i);
    expect(buttonDragon.type).toBe('button');
    fireEvent.click(buttonDragon);

    const moreDetails = getByText(/More details/i);
    expect(moreDetails.href).toBe(urlDetails);
    fireEvent.click(moreDetails);

    const favorited = getByLabelText(/Pokémon favoritado?/i);
    expect(favorited.type).toBe('checkbox');
    fireEvent.click(favorited);

    const star = getByAltText(/Dragonair is marked as favorite/i);
    expect(star).toBeInTheDocument();
    expect(star.src).toBe('http://localhost/star-icon.svg');

    expect(favorited).toBeChecked();

    fireEvent.click(favorited);
    expect(favorited).not.toBeChecked();
  });
});
