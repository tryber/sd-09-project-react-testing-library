import React from 'react';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import { Router } from 'react-router';

const renderWithRouter = (componet) => {
  const history = createMemoryHistory();
  return {
    ...render(<Router history={history}>{ componet }</Router>), history,
  }
}

export default renderWithRouter;