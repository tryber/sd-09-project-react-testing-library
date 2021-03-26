import React from 'react';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';

describe('Test the About component', () => {
  test('Test if the page contains information about pokedex', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    history.push('/about');
    const subPageTitle = getByRole('heading', { level: 2, name: 'About Pokédex' });
    expect(subPageTitle).toBeInTheDocument();
  });

  test('Page with two paragraphs with text about Pokedex', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/about');
    const paragraphOne = getByText(/This application/);
    const paragraphTwo = getByText(/One can filter/);
    expect(paragraphOne).toBeInTheDocument();
    expect(paragraphTwo).toBeInTheDocument();
  });

  test('Pokedex have a specific image', () => {
    //  https://stackoverflow.com/questions/60509527/jestreact-native-testing-library-how-to-test-an-image-src
    //  https://testing-library.com/docs/queries/byrole
    const { getByRole, history } = renderWithRouter(<App />);
    history.push('/about');
    const image = getByRole('img', { name: 'Pokédex' });
    expect(image.src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
