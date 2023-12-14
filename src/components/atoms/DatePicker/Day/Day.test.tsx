import React from 'react';
import { render, RenderAPI } from '@testing-library/react-native';

// Components
import Day from './Day';

describe('Day tests', () => {
  let component: RenderAPI;
  beforeEach(() => {
    component = render(<Day />);
  });

  test('Day rendered correctly', () => {
    expect(component).not.toBeNull();
  });
});
