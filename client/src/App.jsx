import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import Layout from "./Layout";
import RegisterPage from "./pages/RegisterPage";
import axios from "axios";
import UserContextProvider from "./UserContextProvider";
import AccountPage from "./pages/AccountPage";
import PlaceForm from "./pages/PlaceForm";
import ShowPage from "./pages/ShowPage";
import PhotosPage from "./pages/PhotosPage";
import SingleBookingPage from "./pages/SingleBookingPage";

axios.defaults.baseURL = "http://localhost:4000";//giving base url so no need to type whole url again and again

// withCredentials to true allows the browser to send cookies that are applicable to the target domain
//cross origin request,session management ,for security,use before making any axios request
axios.defaults.withCredentials = true; //this helps in token genreation on diffrent port  for accessing resources that require authentication where the session information is stored in cookies.
  
function App() {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<IndexPage />} />
            <Route path="/login" exact element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/account/:subpage?" element={<AccountPage/>}/>
            <Route path="/account/:subpage/:action" element={<AccountPage/>}/>
            <Route path="account/places/new" element={<PlaceForm/>} />
            <Route path="account/places/:id" element={<PlaceForm/>} />
            <Route path="show/:id" element={<ShowPage/>} />
            <Route path="/account/bookings/:id" element={<SingleBookingPage/>}/>
          </Route>
          {/* <Route path="/show/:id/photos" element={<PhotosPage/>}/> */}

        </Routes>
      </BrowserRouter>
      
    </UserContextProvider>
    
  );
}

export default App;
