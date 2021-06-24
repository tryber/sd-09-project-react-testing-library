import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

// necessário inciar de APP para renderizar "FavoritePokemons"; onde App busca a
// lista dos pokemons favoritados anteriormente sendo passado via props para "FavoritePokemons"
// Para não causar falsos positivos;

describe('Testa o componente Pokemon', () => {
  it('Teste se é renderizado um card com as informações de determinado pokémon', () => {
    const { getByTestId, getByAltText } = renderWithRouter(<App />);
    const elementPokemonName = getByTestId('pokemon-name');
    const elementPokemonType = getByTestId('pokemonType');
    const elementPokemonWeight = getByTestId('pokemon-weight');
    const elementImage = getByAltText('Pikachu sprite');
    const imgsrc = 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';

    // O nome correto do Pokémon deve ser mostrado na tela;
    expect(elementPokemonName.textContent).toBe('Pikachu');

    // O nome tipo do Pokémon deve ser mostrado na tela;
    expect(elementPokemonType.textContent).toBe('Electric');

    // O peso médio do pokémon deve ser exibido com um texto no formato
    expect(elementPokemonWeight.textContent).toBe('Average weight: 6.0 kg');

    // A imagem do Pokémon deve ser exibida
    expect(elementImage.src).toBe(imgsrc);
  });

  it('Teste se o card do Pokémon na Pokédex contém link para detalhes do pokemon', () => {
    const { getByText } = renderWithRouter(<App />);
    const elementLinkToDetails = getByText(/More details/i);
    expect(elementLinkToDetails).toBeInTheDocument();
  });

  it('Teste se clicar no link para detalhes do pokemon', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const elementLinkToDetails = getByText('More details');

    // verifica se o link esta renderizado
    expect(elementLinkToDetails).toBeInTheDocument();

    // clickar no link, redireciona
    userEvent.click(elementLinkToDetails);
    const elementInRedirectedLInk = getByText(/Summary/i);
    expect(elementInRedirectedLInk).toBeInTheDocument();

    // verifica se URL é a esperada após click
    const expectedPathAfterClick = '/pokemons/25';
    expect(history.location.pathname).toBe(expectedPathAfterClick);
  });

  it('Teste se existe um ícone de estrela nos Pokémons favoritados', () => {
    const { getByText, getByRole, getByLabelText } = renderWithRouter(<App />);
    const elementLinkToDetails = getByText(/More details/i);

    userEvent.click(elementLinkToDetails);
    userEvent.click(getByLabelText(/Pokémon favoritado/i));
    userEvent.click(getByText(/Home/i));
    const elementImg = getByRole('img', { name: 'Pikachu is marked as favorite' });
    const pathLocaHostSliceNUm = 16;
    expect(elementImg.src.slice(pathLocaHostSliceNUm)).toBe('/star-icon.svg');
  });
});
