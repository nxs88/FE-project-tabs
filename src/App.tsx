import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import './App.scss';
import './reset.scss';
import { theme } from './theme';
import { useEffect, useState } from 'react';
import { fetchVacancies, selectVacancies } from './Redux/slices/vacanciesSlice';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from './Redux/store';
import { selectCity, selectSkills } from './Redux/slices/filtersSlice';
import MainLayout from './layouts/MainLayout';
import SearchVacanciePage from './pages/SearchVacanciePage';
import SingleVacanciePage from './pages/SingleVacanciePage';
import CittyFilter from './modules/Filters/CittyFilter';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const skills = useSelector(selectSkills);
  const city = useSelector(selectCity);
  const vacancies = useSelector(selectVacancies);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path="/FE-project-tabs/"
        element={<MainLayout />}
        errorElement={<Navigate to="FE-project-tabs/not-found" replace />}
      >
        <Route index element={<Navigate to="vacancies" replace />} />
        <Route
          path="vacancies"
          element={
            <SearchVacanciePage
              vacancies={vacancies}
              page={page}
              totalPages={totalPages}
              pageChange={setPage}
            />
          }
        >
          <Route path="moscow" element={<CittyFilter />} />
          <Route path="petersburg" element={<CittyFilter />} />
        </Route>
        <Route
          path="vacancies/:id"
          element={<SingleVacanciePage vacancies={vacancies} />}
        />
        <Route path="not-found" element={<NotFoundPage />} />
        <Route
          path="*"
          element={<Navigate to="/FE-project-tabs/not-found" replace />}
        />
      </Route>
    )
  );

  useEffect(() => {
    const load = async () => {
      const action = await dispatch(
        fetchVacancies({ search: '', city, skills, page })
      );
      const { totalPages } = action.payload as { totalPages: number };
      setTotalPages(totalPages);
    };

    load();
  }, [dispatch, city, skills, page]);

  return (
    <MantineProvider theme={theme}>
      <RouterProvider router={router} />
    </MantineProvider>
  );
}

export default App;
