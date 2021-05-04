import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../services/RenderWithRouter';
import App from '../App';

const md = /More details/i;

describe('Teste do Pokemon.js', () => {
  it('Testa se o nome correto do pokemon está aparecendo na tela', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const pokeName = getByTestId('pokemon-name');
    expect(pokeName).toBeInTheDocument();
    expect(pokeName).toHaveTextContent('Pikachu');
  });

  it('Testa se o tipo correto está aparecendo na tela', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const pokeType = getByTestId('pokemon-type');
    expect(pokeType).toHaveTextContent('Electric');
  });

  it('Verifica se o Average Weight aparece corretamente', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const pokeWeight = getByTestId('pokemon-weight');
    expect(pokeWeight).toBeInTheDocument();
    expect(pokeWeight).toHaveTextContent('Average weight: 6.0 kg');
  });
  it('A imagem do Pokemon deve ser exibida', () => {
    const { getByAltText } = renderWithRouter(<App />);
    // const image = getAllByRole('img');
    const image = getByAltText(/Pikachu sprite/i);
    expect(image.src).toBe('https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });
  it('Testa se o Card do Pokemon contém um link de navegação', () => {
    const { getByText } = renderWithRouter(<App />);
    const linkMoreDetails = getByText(md);
    expect(linkMoreDetails).toBeInTheDocument();
  });
  it('Testa se o link aparece lá em cima ao clicar em More details', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const linkMoreDetails = getByText(md);
    fireEvent.click(linkMoreDetails);
    const { location } = history;
    const { pathname } = location;
    const pathname1 = pathname;
    expect(pathname1).toBe('/pokemons/25');
  });
  // it('Testa se ao clicar no link de navegacao a pagina é redirecionada', () => {
  //   const { getByText, history } = renderWithRouter(<App />);
  //   const linkMoreDetails = getByText(md);
  //   fireEvent.click(linkMoreDetails);
  //   const { location } = history;
  //   const { pathname } = location;
  //   const pathname1 = pathname;
  //   expect(pathname1).toBe('/pokemons/25');
  // });
  it('Testa se tem uma estrela no pokemon favoritado', () => {
    const { getByText, getByAltText } = renderWithRouter(<App />);
    const moreDetails = getByText(md);
    fireEvent.click(moreDetails);
    const checkFavorite = getByText(/Pokémon favoritado?/i);
    fireEvent.click(checkFavorite);
    const img = getByAltText(/Pikachu is marked as favorite/i);
    expect(img.src).toBe('http://localhost/star-icon.svg');
  });
});
