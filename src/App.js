import './App.css';
import { Routes, Route } from 'react-router-dom';
import HeaderComponent from './Universal-Component/HeaderComponent';
import HomePage from './Page-Components/HomePage/HomePage';
import FilmographyPage from './Page-Components/FilmographyPage/FilmographyPage';
import PeoplePage from './Page-Components/PeoplePage/PeoplePage';
import AboutPage from './Page-Components/AboutPage/AboutPage';
import FooterComponent from './Universal-Component/FooterComponent';
import FetchingDataContext from './ContextComponents/FetchingFilmsContext';
import FetchingPeoplesContext from './ContextComponents/FetchingPeoplesContext';

function App() {
  return (
    <div className="App">
      <HeaderComponent />
      <FetchingDataContext>
        <FetchingPeoplesContext>
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/Filmography" element={<FilmographyPage />}></Route>
            <Route path="/People" element={<PeoplePage />}></Route>
            <Route path="/About" element={<AboutPage />}></Route>
          </Routes>
        </FetchingPeoplesContext>
      </FetchingDataContext>
      <FooterComponent />
    </div>
  );
}

export default App;
