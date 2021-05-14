import React from 'react';
import { FavoritePokemons } from '../components';
import renderpag from '../services/renderpag';

describe('testando componente pokémon favorito', () => {
  test('Teste', () => {
    const { getByText } = renderpag(<FavoritePokemons />);
    expect(getByText('No favorite pokemon found')).toBeInTheDocument();
  });
});
