import "bootstrap/dist/css/bootstrap.min.css";
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
import AdminMyPage from "./Admin/AdminMyPage";
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

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
      <Route path="/" element={<Main />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login/findid" element={<FindId />} />
        <Route path="/login/findid" element={<FindPassword />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/mypage/modify/:userid" element={<Modify />} />
        <Route path="/mypage/myreviews/:userid" element={<MyReviews />} />
        <Route path="/mypage/myfavorites/:userid" element={<MyFavorites />} />
        <Route path="/mypage/admin" element={<AdminMyPage />} />
        <Route path="/mypage/member/list" element={<MemberList />} />
        <Route path="/mypage/member/modify/:userid" element={<MemberModify />} />
        <Route path="/hospital/search" element={<HospitalSearch />} />
        <Route path="/hospital/detail/:hospitalid" element={<HospitalDetail />} />
        <Route path="/pharmacy/search" element={<PharmacySearch />} />
        <Route path="/pharmacy/detail/:pharmacyid" element={<PharmacyDetail />} />
        <Route path="/info/list" element={<InfoList />} />
        <Route path="/info/add" element={<InfoAdd />} />
        <Route path="/info/detail/modify/:infoid" element={<InfoModify />} />
        <Route path="/info/detail/:infoid" element={<InfoDetail />} />
        <Route path="/help/list" element={<HelpList />} />
        <Route path="/help/add" element={<HelpAdd />} />
        <Route path="/help/detail" element={<HelpDetail />} />
        <Route path="/help/detail/modify/:helpid" element={<HelpModify />} />
      </Route>
    </Routes>
  );
}

export default App;
