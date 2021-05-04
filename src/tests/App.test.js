import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
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

test('shows the Pokédex when the route is `/`', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={ ['/'] }>
      <App />
    </MemoryRouter>,
  );

  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});

describe('Se topo da aplicação contém um conjunto fixo de links de navegação', () => {
  it('O primeiro link deve possuir o texto Home', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const homeLink = getByText('Home');

    expect(homeLink).toBeInTheDocument();
  });

  it('O segundo link deve possuir o texto About', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const aboutLink = getByText('About');

    expect(aboutLink).toBeInTheDocument();
  });

  it('O terceiro link deve possuir o texto Favorite Pokémons', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const favoritePokemonsLink = getByText('Favorite Pokémons');

    expect(favoritePokemonsLink).toBeInTheDocument();
  });
});

describe('Testando os links do header', () => {
  it('Teste se a aplicação é redirecionada para a página inicial na URL /', () => {
    const { getByText, history } = renderWithRouter(<App />);

    fireEvent.click(getByText(/Home/i));

    const { location } = history;

    const { pathname } = location;

    expect(pathname).toBe('/');

    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  it('Teste se a aplicação é redirecionada para a página de About, na URL /about', () => {
    const { getByText, getByAltText, history } = renderWithRouter(<App />);

    fireEvent.click(getByText(/About/i));

    const { location } = history;

    const { pathname } = location;

    expect(pathname).toBe('/about');

    const img = getByAltText('Pokédex');
    expect(img).toBeInTheDocument();
  });

  it('Testando o link Favorite Pokémon', () => {
    const { getByText, history } = renderWithRouter(<App />);

    fireEvent.click(getByText(/Favorite Pokémons/i));

    const { location } = history;

    const { pathname } = location;

    expect(pathname).toBe('/favorites');

    const favoriteText = getByText('Favorite pokémons');
    expect(favoriteText).toBeInTheDocument();
  });

  it('Teste se a aplicação é redirecionada para a página Not Found', () => {
    const { getByText, history } = renderWithRouter(<App />);

    history.push('/testarrghineedalcohol');
    const notFound = getByText(/Page requested not found/i);
    expect(notFound).toBeInTheDocument();
  });
});
