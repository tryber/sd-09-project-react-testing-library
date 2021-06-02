import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import RenderWithRouter from '../services/RenderWithRouter';
import App from '../App';

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

test('Teste se a home é renderizada ao carregar a aplicação no caminho de URL /', () => {
  const { getByText, history } = RenderWithRouter(<App />);
  const home = getByText(/Encountered pokémons/i);
  expect(home).toBeInTheDocument();
  const { pathname } = history.location;
  expect(pathname).toBe('/');
  const Home = getByText(/Home/i);
  const About = getByText(/About/i);
  const FavoritePokemons = getByText(/Favorite Pokémons/i);
  expect(Home).toBeInTheDocument();
  expect(About).toBeInTheDocument();
  expect(FavoritePokemons).toBeInTheDocument();
});
