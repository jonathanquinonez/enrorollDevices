import React from 'react';
import { render, RenderAPI } from '@testing-library/react-native';

// Components
import YearPicker from './YearPicker';

describe('YearPicker tests', () => {
  let component: RenderAPI;
  beforeEach(() => {
    component = render(<YearPicker />);
  });

  test('YearPicker rendered correctly', () => {
    expect(component).not.toBeNull();
  });
});
