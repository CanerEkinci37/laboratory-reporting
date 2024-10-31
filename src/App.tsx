import './App.css';
import Header from './components/Header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ReportDetail from './components/ReportDetail';
import '@mantine/core/styles.css';
import Report from './pages/Report';

function App() {
  return (
    <Router basename='laboratory-reporting'>
      <Header />
      <Routes>
        <Route path='/' element={<Report />} />
        <Route path='/details/:id' element={<ReportDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
