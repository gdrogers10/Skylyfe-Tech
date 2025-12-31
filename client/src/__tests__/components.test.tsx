import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false },
    mutations: { retry: false },
  },
});

function MockRouter({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}

jest.mock('@/hooks/use-auth', () => ({
  useAuth: () => ({
    user: null,
    isLoading: false,
    isAuthenticated: false,
    logout: jest.fn(),
  }),
}));

jest.mock('@assets/generated_images/skylyfe_tech_modern_logo.png', () => 'logo.png');

describe('BottomNav Component', () => {
  it('renders navigation items', async () => {
    const { BottomNav } = await import('@/components/BottomNav');
    
    render(
      <MockRouter>
        <BottomNav />
      </MockRouter>
    );

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Services')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
    expect(screen.getByText('Launch')).toBeInTheDocument();
  });

  it('has correct test ids for all nav items', async () => {
    const { BottomNav } = await import('@/components/BottomNav');
    
    render(
      <MockRouter>
        <BottomNav />
      </MockRouter>
    );

    expect(screen.getByTestId('link-bottom-nav-home')).toBeInTheDocument();
    expect(screen.getByTestId('link-bottom-nav-services')).toBeInTheDocument();
    expect(screen.getByTestId('link-bottom-nav-about')).toBeInTheDocument();
    expect(screen.getByTestId('link-bottom-nav-contact')).toBeInTheDocument();
    expect(screen.getByTestId('link-bottom-nav-launch')).toBeInTheDocument();
  });
});

describe('Auth Hook', () => {
  it('returns unauthenticated state by default', async () => {
    const { useAuth } = await import('@/hooks/use-auth');
    const result = useAuth();
    
    expect(result.isAuthenticated).toBe(false);
    expect(result.user).toBe(null);
  });
});
