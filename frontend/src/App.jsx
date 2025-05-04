import { Route, Routes } from 'react-router-dom';
import LoginPage from "./pages/LoginPage"
import Homepage from "./pages/Homepage"
import GenerateSummaryPage from "./pages/GenerateSummaryPage"
import ProfilePage from "./pages/ProfilePage";
import ProtectedRouting from './route/ProtectedRouting'
import SummaryPage from './pages/SummaryPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
      <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/login" element={<LoginPage />} />
        <Route path='/GenerateSummary' element={<ProtectedRouting><GenerateSummaryPage/></ProtectedRouting>}/>
        <Route path="/profile" element={<ProtectedRouting><ProfilePage/></ProtectedRouting>}/>
        <Route path="/SummaryPage" element={<ProtectedRouting><SummaryPage/></ProtectedRouting>}/>
        <Route path='*' element={<NotFoundPage/>}></Route>
        {/* Other routes */}
      </Routes>
  );
}
export default App;