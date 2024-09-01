import React, { useEffect } from 'react';
import s from './appStyles/App.module.css';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { ProjectsListContainer } from '../ProjectsList/ProjectsListContainer';
import { TheConstructionQueueContainer } from '../TheConstructionQueue/TheConstructionQueue';
import { SectionsListContainer } from '../SectionList/SectionListContainer';
import { RoofListContainer } from '../RoofListContainer/RoofListContainer';
import { SignIn } from '../SignIn/SignIn';
import { axiosAuthCheker } from '../shared/API/Api';

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const data = await axiosAuthCheker();
        if (data.status === 200 && location.pathname === '/signIn') {
          navigate('/');
        }
      } catch (error) {
        console.error(error);
        navigate('/signIn');
      }
    };

    checkAuth();
  }, [navigate]);

  return (
    <div className={s.appWrapper}>
      <Routes>
        <Route path="/" element={<ProjectsListContainer />} />
        <Route path=":projectId" element={<TheConstructionQueueContainer />} />
        <Route path=":projectId/:queueId" element={<SectionsListContainer />} />
        <Route
          path=":projectId/:queueId/:sectionId"
          element={<RoofListContainer />}
        />
        <Route path="signIn" element={<SignIn />} />
      </Routes>
    </div>
  );
}

export default App;
