import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa componente pokemon detais', () => {
  const route = 'pokemons/25';
  it('As informações detalhadas do Pokémon selecionado são mostradas na tela.', () => {
    const { getByText, getByTestId, getByRole, history } = renderWithRouter(<App />);
    history.push(route);

    // A página deve conter um texto <name> Details, onde <name> é o nome do Pokémon
    expect(getByText(/Pikachu Details/i)).toBeInTheDocument();
    expect(getByTestId('pokemon-name')).toBeInTheDocument();
    expect(getByTestId('pokemon-name').textContent).toBe('Pikachu');

    // Não deve existir o link de navegação para os detalhes do Pokémon selecionado (what?).
    // fazer uma query all e se for maior q 0 quebrar o teste =D

    // A seção de detalhes deve conter um heading h2 com o texto Summary.
    const elementSumary = getByRole('heading', { level: 2, name: 'Summary' });
    expect(elementSumary).toBeInTheDocument();

    // A seção de detalhes deve conter um parágrafo com o resumo do Pokémon específico sendo visualizado.
    const paragraphContent = getByText(/This intelligent Pokémon roasts hard berries/i);
    expect(paragraphContent).toBeInTheDocument();
  });

  it('Existe na página, seção com os mapas contendo as localizações do pokémon', () => {
    const { getByRole, getAllByAltText, history } = renderWithRouter(<App />);
    history.push(route);
    // Na seção de detalhes deverá existir um heading
    const element = getByRole('heading', { level: 2, name: 'Game Locations of Pikachu' });
    expect(element).toBeInTheDocument();

    // Todas as localizações do Pokémon devem ser mostradas na seção de detalhes;
    const elementPokeLocations = getAllByAltText('Pikachu location');
    expect(elementPokeLocations.length > 0).toBeTruthy();

    // Devem ser exibidos, o nome da localização e uma imagem do mapa em cada localização;
    expect(elementPokeLocations[0].nextElementSibling.textContent)
      .toBe('Kanto Viridian Forest');

    // A imagem da localização deve ter um atributo src com a URL da localização;
    const elementPokeLocationsImgPath = 'https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png';
    expect(elementPokeLocations[0].src).toBe(elementPokeLocationsImgPath);

    // A imagem da localização deve ter um atributo 'alt' com o texto '<name> location', onde '<name>' é o nome do Pokémon;
    expect(elementPokeLocations[0].alt).toBe('Pikachu location');
  });

  it('Teste se o usuário pode favoritar um pokémon através da página de detalhes', () => {
    const { getByLabelText, getByRole, history } = renderWithRouter(<App />);
    history.push(route);
    const buttonElementFavCheckBox = getByLabelText(/Pokémon favoritado/i);
    expect(buttonElementFavCheckBox).toBeInTheDocument();

    userEvent.click(buttonElementFavCheckBox);
    expect(buttonElementFavCheckBox.checked).toBeTruthy();

    const elementImg = getByRole('img', { name: 'Pikachu is marked as favorite' });
    expect(elementImg).toBeInTheDocument();

    userEvent.click(buttonElementFavCheckBox);
    expect(buttonElementFavCheckBox.checked).not.toBeTruthy();
    expect(elementImg).not.toBeInTheDocument();
  });
});
