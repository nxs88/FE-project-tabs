import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import './App.scss';

function App() {
  return (
    <MantineProvider>
      <div className="container"></div>
    </MantineProvider>
  );
}

export default App;
