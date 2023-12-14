import React from 'react';
import { render, RenderAPI } from '@testing-library/react-native';

// Components
import Header from './Header';

describe('Header tests', () => {
  let component: RenderAPI;
  beforeEach(() => {
    component = render(<Header />);
  });

  test('Header rendered correctly', () => {
    expect(component).not.toBeNull();
  });
});
