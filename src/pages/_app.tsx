import '../../styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { UserProvider } from '@/contexts/UserContextproyectomtm';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { store } from '../store';

export default function App({ Component, pageProps }: AppProps) {
  const persistor = persistStore(store);
  return (
    <UserProvider>
      <PersistGate persistor={persistor}>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </PersistGate>
    </UserProvider>
  );
}
