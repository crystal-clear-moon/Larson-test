import { QueryClient, QueryClientProvider } from 'react-query';
import { AddressesPage } from './app/addresses';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 2,
    },
  },
});

export default function App() {
  return (
    
    <QueryClientProvider client={queryClient}>
      <main className='px-8 py-4'>
        <Router>
          <Routes>
            <Route path="/" element={<AddressesPage />}  />
          </Routes>
        </Router>
      </main>
    </QueryClientProvider>
  );
}
