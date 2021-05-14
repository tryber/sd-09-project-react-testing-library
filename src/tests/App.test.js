import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderpag from '../services/renderpag';
import App from '../App';

test('Caminho do app', () => {
  const { getByText, history } = renderpag(<App />);
  const pokedex = getByText('Pokédex');
  expect(pokedex).toBeInTheDocument();
  fireEvent.click(pokedex);
  const { pathname } = history.location;
  expect(pathname).toBe('/');
});

test('Links de navegação', () => {
  const { getByText } = renderpag(<App />);
  const home = getByText('Home');
  expect(home).toBeInTheDocument();
  const about = getByText('About');
  expect(about).toBeInTheDocument();
  const favoritePokemons = getByText('Favorite Pokémons');
  expect(favoritePokemons).toBeInTheDocument();
});

test('Verificando rota about', () => {
  const { getByText, history } = renderpag(<App />);
  const compAbout = getByText('About');
  expect(compAbout).toBeInTheDocument();
  fireEvent.click(compAbout);
  const { pathname } = history.location;
  expect(pathname).toBe('/about');
});

test('Verificando rota pokémon favorito', () => {
  const { getByText, history } = renderpag(<App />);
  const favorito = getByText('Favorite Pokémons');
  expect(favorito).toBeInTheDocument();
  fireEvent.click(favorito);
  const { pathname } = history.location;
  expect(pathname).toBe('/favorites');
});

test('Not found ', () => {
  const { getByText, history } = renderpag(<App />);
  history.push('/aaa');
  const erro = getByText('Page requested not found');
  expect(erro).toBeInTheDocument();
});
