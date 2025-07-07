import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import './App.scss';
import CardList from './components/CardList';
import type { Launch } from './types/Launch';
import { useFetch } from '@mantine/hooks';

function App() {
  const { data } = useFetch<Launch[]>(
    'https://api.spacexdata.com/v3/launches?launch_year=2020'
  );
  return (
    <MantineProvider>
      <div className="container">
        <h1>SpaceX Launches 2020</h1>
        <CardList data={data || []} />
      </div>
    </MantineProvider>
  );
}

export default App;
