import { FC } from 'react';
import './App.css';
import 'antd/dist/reset.css';
import MainPage from './pages/MainPage/MainPage';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

const App: FC = () => {
  return (
    <div className="app">
      <Header />
      <MainPage />
      <Footer />
    </div>
  );
};
export default App;
