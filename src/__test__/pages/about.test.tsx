import { render, screen } from '@testing-library/react';
import AboutPage from '@/pages/about';

describe('AboutPage', () => {
  it('renders the About ShopSmart Page', () => {
    const page = render(<AboutPage />);
    expect(page).toMatchSnapshot();
  });
});
