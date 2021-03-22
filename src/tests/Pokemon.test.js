import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import App from '../App';

describe('Bloco de testes para o componente Pokemon.js', () => {
  const moreDetails = 'More details';
  it('Testa se é renderizado um card com as informações de determinado pokémon.', () => {
    const { getByText, getByTestId, getByAltText } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );
    const pokemonName = getByText('Pikachu');
    expect(pokemonName.textContent).toBe('Pikachu');
    const pokemonType = getByTestId('pokemonType');
    expect(pokemonType.textContent).toBe('Electric');
    const pokemonWeight = getByTestId('pokemon-weight');
    expect(pokemonWeight.textContent).toBe('Average weight: 6.0 kg');
    const pokemonImg = getByAltText('Pikachu sprite');
    expect(pokemonImg.src).toBe('https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  it('Testa se o card do Pokémon indicado na Pokédex contém um link de navegação', () => {
    const history = createMemoryHistory();
    const { getByText } = render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    const moreInfoLink = getByText(moreDetails);
    fireEvent.click(moreInfoLink);
    expect(history.location.pathname).toBe('/pokemons/25');
  });

  it('Testa ao clicar no link de navegação do Pokémon, é feito redirecionamento', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );
    const moreDetailsLink = getByText(moreDetails);
    fireEvent.click(moreDetailsLink);
    const sumary = getByText('Summary');
    expect(sumary).toBeInTheDocument();
  });

  it('Testa URL exibida no navegador muda para /pokemon/<id>', () => {
    const { getByText, getByAltText, getByRole } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );
    const moreInfoLink = getByText(moreDetails);
    fireEvent.click(moreInfoLink);
    const favoriteCheckbox = getByRole('checkbox');
    fireEvent.click(favoriteCheckbox);
    const starIcon = getByAltText('Pikachu is marked as favorite');
    expect(starIcon).toBeInTheDocument();
    console.log(starIcon.src);
    expect(starIcon.src).toBe('http://localhost/star-icon.svg');
  });
});
