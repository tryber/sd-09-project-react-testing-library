import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderRouter from './renderRouter';
import pokemons from '../data';
import App from '../App';
// Esse foi o requisito mais dificil, muitos detalhes, consegui ajustar conforme erros dos testes!!

const chLocation = 'Pikachu location';
// Verifica detalhes de pokemons
describe('Check pokemons details', () => {
  it('Check ', () => {
    renderRouter(<App />);
    fireEvent.click(screen.getByText(/More details/i));
    const pikachu = screen.getByText(/Pikachu Details/i);
    expect(pikachu).toBeInTheDocument();
  });
  // Não deve existir o link de navegação nos detalhes do Pokémon selecionado.
  it('There should be no navigation link in the details of the selected Pokémon.', () => {
    renderRouter(<App />);
    const checkClick = screen.getByText(/More details/i);
    fireEvent.click(checkClick);
    expect(checkClick).not.toBeInTheDocument();
  });
  // Seção de detalhes deve conter um heading h2 com o texto Summary
  it('Details section must contain an heading h2 with the text Summary ', () => {
    renderRouter(<App />);
    fireEvent.click(screen.getByText(/More details/i));
    const checkDetails = screen.getByRole('heading', { name: 'Summary' });
    expect(checkDetails.tagName).toBe('H2');
  });
  // Seção de detalhes deve conter um parágrafo com o resumo do Pokémon
  it('details section should contain a paragraph with the summary of the Pokémon', () => {
    renderRouter(<App />);
    fireEvent.click(screen.getByText(/More details/i));
    const checkTagP = document.getElementsByTagName('p');
    const paragraph = 'This intelligent Pokémon roasts hard berries with '
      + 'electricity to make them tender enough to eat.';
    expect(checkTagP[3].innerHTML).toBe(paragraph);
  });
  // Detalhes deverá conter um heading h2 com o texto Game Locations of <name>
  it('H2 deve estar contido em details', () => {
    renderRouter(<App />);
    fireEvent.click(screen.getByText(/More details/i));
    const H2Detail = screen.getByRole('heading', { name: 'Game Locations of Pikachu' });
    expect(H2Detail.tagName).toBe('H2');
  });
  // Todas as localizações devem ser mostradas
  it('all locations must be shown', () => {
    renderRouter(<App />);
    fireEvent.click(screen.getByText(/More details/i));
    const checLoc = screen.getByRole('heading', { name: 'Game Locations of Pikachu' });
    expect(checLoc).toBeInTheDocument();
  });
  // Verifica localizações no mapa
  it('Check locations on the map', () => {
    renderRouter(<App />);
    fireEvent.click(screen.getByText(/More details/i));
    const checkLoc = screen.getAllByAltText(chLocation);
    const kantoForest = screen.getByText('Kanto Viridian Forest');
    const kantoPlant = screen.getByText('Kanto Power Plant');

    expect(checkLoc[0]).toBeInTheDocument();
    expect(checkLoc[1]).toBeInTheDocument();

    expect(kantoForest.innerHTML).toBe('Kanto Viridian Forest');
    expect(kantoPlant.innerHTML).toBe('Kanto Power Plant');
  });
  // Imagem da localização deve ter um atributo src
  it('location image must have a src attribute', () => {
    renderRouter(<App />);
    fireEvent.click(screen.getByText(/More details/i));
    const checkLoc = screen.getAllByAltText(chLocation);
    expect(checkLoc[0].src).toBe(pokemons[0].foundAt[0].map);
    expect(checkLoc[1].src).toBe(pokemons[0].foundAt[1].map);
  });
  // Imagem da localização deve ter um atributo alt
  it('location image must have a alt attribute', () => {
    renderRouter(<App />);
    fireEvent.click(screen.getByText(/More details/i));
    const checkAlt = screen.getAllByAltText(chLocation);
    expect(checkAlt[0]).toBeInTheDocument();
    expect(checkAlt[1]).toBeInTheDocument();
  });
  // Testar se favoritar funciona
  it('Test if favorite works', () => {
    renderRouter(<App />);
    fireEvent.click(screen.getByText(/More details/i));
    const favoriteCheckbox = screen.getByRole('checkbox');
    expect(favoriteCheckbox.type).toBe('checkbox');
  });
  // Cliques alternados devem funcionar como adicionar e remover
  it('Alternate clicks should work like adding and removing', () => {
    renderRouter(<App />);
    fireEvent.click(screen.getByText('More details'));
    const favCheckbox = screen.getByRole('checkbox');
    if (favCheckbox.checked) fireEvent.click(checkbox);
    expect(favCheckbox.checked).toBeFalsy();
    fireEvent.click(favCheckbox);
    expect(favCheckbox.checked).toBeTruthy();
    const checkFavorite = screen.getByAltText('Pikachu is marked as favorite');
    expect(checkFavorite).toBeInTheDocument();
  });
  // A label do checkbox deve conter pokemon favoritado?
  it('Should the checkbox label contain a favorite pokemon?', () => {
    renderRouter(<App />);
    fireEvent.click(screen.getByText(/More details/i));
    const CheckLabel = screen.getByLabelText('Pokémon favoritado?');
    expect(CheckLabel.type).toBe('checkbox');
  });
});
