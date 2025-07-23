import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import './App.scss';
import './reset.scss';
import Header from './modules/Header/Header';
import CardList from './modules/CardList/CardList';
import { theme } from './theme';

function App() {
  return (
    <MantineProvider theme={theme}>
      <Header />
      <CardList />
    </MantineProvider>
  );
}

export default App;
