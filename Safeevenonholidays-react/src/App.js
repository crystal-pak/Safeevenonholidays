import "bootstrap/dist/css/bootstrap.min.css";
import "leaflet/dist/leaflet.css";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./component/Layout";
import Main from "./Main";
import Modify from "./MyPage/Modify";
import MyPage from "./MyPage/MyPage";
import Signup from "./UserAccount/Signup";
import Login from "./UserAccount/Login";
import FindId from "./UserAccount/FindId";
import FindPassword from "./UserAccount/FindPassword";
import MyReviews from "./MyPage/MyReviews";
import MyFavorites from "./MyPage/MyFavorites";
import MemberList from "./Admin/MemberList";
import MemberModify from "./Admin/MemberModify";
import HospitalSearch from "./Hospital/HospitalSearch";
import HospitalDetail from "./Hospital/HospitalDetail";
import PharmacySearch from "./Pharmacy/PharmacySearch";
import PharmacyDetail from "./Pharmacy/PharmacyDetail";
import InfoList from "./Support/InfoList";
import InfoDetail from "./Support/InfoDetail";
import HelpList from "./Support/HelpList";
import HelpAdd from "./Support/HelpAdd";
import HelpDetail from "./Support/HelpDetail";
import HelpModify from "./Support/HelpModify";
import InfoAdd from "./Support/InfoAdd";
import InfoModify from "./Support/InfoModify";
import KakaoRedirectPage from "./UserAccount/KakaoRedirectPage";
import KakaoModifyPage from "./UserAccount/KakaoModifyPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Main />} />

        <Route path="/member/">
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
          <Route path="findid" element={<FindId />} />
          <Route path="findpassword" element={<FindPassword />} />
          <Route path="kakao" element={<KakaoRedirectPage />} />
          <Route path="modify" element={<KakaoModifyPage />}  />
        </Route>
        
        <Route path="/mypage/">
          <Route index element={<MyPage />} />
          <Route path="modify/:id" element={<Modify />} />
          <Route path="myreviews/:id" element={<MyReviews />} />
          <Route path="myfavorites/:id" element={<MyFavorites />} />
          <Route path="list" element={<MemberList />} />
          <Route path="member/modify/:id" element={<MemberModify />} />
        </Route>
        
        <Route path="/hospital/">
          <Route path="list" element={<HospitalSearch />} />
          <Route path="detail/:id" element={<HospitalDetail />} />
        </Route>
        
        <Route path="/pharmacy/">
          <Route path="list" element={<PharmacySearch />} />
          <Route path="detail/:id" element={<PharmacyDetail />} />
        </Route>

        <Route path="/info/">
          <Route path="list" element={<InfoList />} />
          <Route path="add" element={<InfoAdd />} />
          <Route path="modify/:id" element={<InfoModify />} />
          <Route path="detail/:id" element={<InfoDetail />} />
        </Route>
        
        <Route path="/help/">
          <Route path="list" element={<HelpList />} />
          <Route path="add" element={<HelpAdd />} />
          <Route path="detail/:id" element={<HelpDetail />} />
          <Route path="modify/:id" element={<HelpModify />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
