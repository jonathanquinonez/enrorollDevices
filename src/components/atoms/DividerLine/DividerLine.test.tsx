import React from 'react';
import { render, RenderAPI } from '@testing-library/react-native';

// Components
import DividerLine from './DividerLine';

describe('DividerLine tests', () => {
  let component: RenderAPI;
  beforeEach(() => {
    component = render(<DividerLine />);
  });

  test('DividerLine rendered correctly', () => {
    expect(component).not.toBeNull();
  });
});
