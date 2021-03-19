import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa o component PokemonDetails', () => {
  test('Testa se as informações do Pokémon selecionado são mostradas na tela', () => {
    const { getByRole, getByText, history } = renderWithRouter(<App />);

    const dragonButton = getByRole('button', {
      name: 'Dragon',
    });
    expect(dragonButton).toBeInTheDocument();
    userEvent.click(dragonButton);
    const linkDetails = getByRole('link', {
      name: (/More details/i),
    });
    expect(linkDetails).toBeInTheDocument();
    userEvent.click(linkDetails);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/pokemons/148');
    const detailsHeading = getByRole('heading', {
      level: 2,
      name: 'Dragonair Details',
    });
    expect(detailsHeading).toBeInTheDocument();
    const summaryHeading = getByRole('heading', {
      name: 'Summary',
    });
    expect(summaryHeading).toBeInTheDocument();
    const summaryContent = getByText(/emits an aura from its whole body/i);
    expect(summaryContent).toBeInTheDocument();
    const locationName = getByText(/Johto Dragon's Den/i);
    expect(locationName).toBeInTheDocument();
  });

  test('Testa se existe uma seção com os mapas contendo as localizações', () => {
    const { getByRole, getAllByAltText } = renderWithRouter(<App />);

    const map1 = 'https://cdn.bulbagarden.net/upload/2/21/Johto_Route_45_Map.png';
    const map2 = 'https://cdn.bulbagarden.net/upload/1/1e/Johto_Dragons_Den_Map.png';

    const dragonButton = getByRole('button', {
      name: 'Dragon',
    });
    expect(dragonButton).toBeInTheDocument();
    userEvent.click(dragonButton);
    const linkDetails = getByRole('link', {
      name: 'More details',
    });
    expect(linkDetails).toBeInTheDocument();
    userEvent.click(linkDetails);
    const headingLocation = getByRole('heading', {
      level: 2,
      name: 'Game Locations of Dragonair',
    });
    expect(headingLocation).toBeInTheDocument();
    const imagesLocation = getAllByAltText('Dragonair location');
    expect(imagesLocation.length).toBe(2);
    expect(imagesLocation[0].src).toBe(map1);
    expect(imagesLocation[1].src).toBe(map2);
  });

  test('Testa se pode favoritar um pokémon através da página de detalhes', () => {
    const { getByRole, getByLabelText } = renderWithRouter(<App />);

    const dragonButton = getByRole('button', {
      name: 'Dragon',
    });
    expect(dragonButton).toBeInTheDocument();
    userEvent.click(dragonButton);
    const linkDetails = getByRole('link', {
      name: 'More details',
    });
    expect(linkDetails).toBeInTheDocument();
    userEvent.click(linkDetails);
    const favoriteCheckBox = getByRole('checkbox');
    expect(favoriteCheckBox).toBeInTheDocument();
    expect(favoriteCheckBox.checked).toBeFalsy();
    userEvent.click(favoriteCheckBox);
    expect(favoriteCheckBox.checked).toBeTruthy();
    const favoriteCheckBoxLabel = getByLabelText('Pokémon favoritado?');
    expect(favoriteCheckBoxLabel).toBeInTheDocument();
  });
});
