import React from 'react';
import { render, RenderAPI } from '@testing-library/react-native';

// Components
import MenuBox from './MenuBox';

describe('MenuBox tests', () => {
  let component: RenderAPI;
  beforeEach(() => {
    component = render(<MenuBox />);
  });

  test('MenuBox rendered correctly', () => {
    expect(component).not.toBeNull();
  });
});
