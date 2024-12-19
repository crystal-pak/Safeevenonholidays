import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Mypage from "./page/Mypage";
import Navbars from "./component/Navbars";
import Footer from "./component/Footer";

function App() {
  return (
    <>
      <Navbars />
      <Routes>
        <Route path="/mypage" element={<Mypage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
