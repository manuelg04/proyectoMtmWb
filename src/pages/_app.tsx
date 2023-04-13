import '../../styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { UserProvider } from '@/contexts/UserContextproyectomtm';
import { store } from '../store';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </UserProvider>
  );
}
