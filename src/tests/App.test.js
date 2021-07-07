import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
import App from '../App';
import RenderWithRouter from '../services/RenderWithRouter';

describe('Verify the links', () => {
  it('renders a reading with the text `Pokédex`', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  it('verifies if the "Home" link is rendered on screen', () => {
    const { getByText } = RenderWithRouter(<App />);
    const home = getByText(/Home/i);
    expect(home).toBeInTheDocument();
  });

  it('verifies if the "About" link is rendered on screen', () => {
    const { getByText } = RenderWithRouter(<App />);
    const about = getByText(/About/i);
    expect(about).toBeInTheDocument();
  });

  it('verifies if the "Favorite Pokémons" link is rendered on screen', () => {
    const { getByText } = RenderWithRouter(<App />);
    const favpok = getByText(/Favorite Pokémons/i);
    expect(favpok).toBeInTheDocument();
  });
});

describe('Testa se os links estão redirecionando corretamente', () => {
  it('Testa se o link "Home" direciona corretamente para a página Home', () => {
    const { getByText, history } = RenderWithRouter(<App />);
    const homeLink = getByText(/Home/i);
    fireEvent.click(homeLink);
    expect(history.location.pathname).toBe('/');
  });

  it('Testa se o link "About" direciona corretamente para a página About', () => {
    const { getByText, history } = RenderWithRouter(<App />);
    const aboutLink = getByText(/About/i);
    fireEvent.click(aboutLink);
    expect(history.location.pathname).toBe('/about');
  });

  it('Testa se o link "Favorite Pokémons" direciona corretamente', () => {
    const { getByText, history } = RenderWithRouter(<App />);
    const favpokLink = getByText(/Favorite Pokémons/i);
    fireEvent.click(favpokLink);
    expect(history.location.pathname).toBe('/favorites');
  });

  it('Testa se a página "not found" é renderizada c/ endereco errado', () => {
    const { getByText, history } = RenderWithRouter(<App />);
    const wrongLink = '/pagina/que-nao-existe/';
    history.push(wrongLink);
    const noMatch = getByText(/Page requested not found/i);
    expect(noMatch).toBeInTheDocument();
  });
});
