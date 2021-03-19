import React from 'react';
import { fireEvent } from '@testing-library/dom';
import renderWithRouter from '../renderWithRouter';
import Pokemon from '../components/Pokemon';

describe('Testa o component Pokemon', () => {
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
    summary: `They say that if it emits an aura from its whole body, 
    the weather will begin to change instantly.`,
  };

  test('Testa se é renderizado um card com as informações do pokémon', () => {
    const { getByText, getByRole } = renderWithRouter(<Pokemon
      pokemon={ pokemon }
      isFavorite={ false }
    />);

    const imgUrl = 'https://cdn.bulbagarden.net/upload/2/2c/Spr_5b_148.png';

    const name = getByText('Dragonair');
    expect(name).toBeInTheDocument();
    const type = getByText('Dragon');
    expect(type).toBeInTheDocument();
    const weight = getByText(/Average weight: 16.5 kg/i);
    expect(weight).toBeInTheDocument();
    const img = getByRole('img');
    expect(img.alt).toBe('Dragonair sprite');
    expect(img.src).toBe(imgUrl);
  });

  test('Testa se o card contém um link de navegação para exibir detalhes', () => {
    const { getByRole } = renderWithRouter(<Pokemon
      pokemon={ pokemon }
      isFavorite={ false }
    />);

    const link = getByRole('link');
    expect(link).toBeInTheDocument();
    expect(link.href).toContain('/pokemons/148');
  });

  test('Testa se é feito o redirecionamento para a página de detalhes', () => {
    const { getByRole, getByTestId } = renderWithRouter(<Pokemon
      pokemon={ pokemon }
      isFavorite={ false }
    />);

    const link = getByRole('link', {
      name: (/More details/i),
    });
    expect(link).toBeInTheDocument();
    fireEvent.click(link);
    const name = getByTestId('pokemon-name');
    expect(name).toBeInTheDocument();
  });

  test('Testa se a URL exibida muda para /pokemon/<id>', () => {
    const { getByRole, history } = renderWithRouter(<Pokemon
      pokemon={ pokemon }
      isFavorite={ false }
    />);

    const link = getByRole('link');
    expect(link).toBeInTheDocument();
    fireEvent.click(link);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/pokemons/148');
  });

  test('Testa se existe um ícone de estrela nos Pokémons favoritados', () => {
    const { getByAltText } = renderWithRouter(<Pokemon
      pokemon={ pokemon }
      isFavorite
    />);

    const iconSrc = '/star-icon.svg';
    const iconAlt = 'Dragonair is marked as favorite';
    const favoriteIcon = getByAltText(iconAlt);
    expect(favoriteIcon).toBeInTheDocument();
    expect(favoriteIcon.src).toContain(iconSrc);
  });
});
