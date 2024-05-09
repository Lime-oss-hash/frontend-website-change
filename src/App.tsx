import { useEffect, useState } from 'react';
import { User } from './models/user';
import * as WebsitesApi from './network/websites_api';
import { Staff } from './models/staff';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import UserLoginModal from './components/UserLoginModal';
import StaffLoginModal from './components/StaffLoginModal';
import NavBar from './components/Navbar';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import UserSignUpModal from './components/UserSignUpModal';
import styles from "./styles/navbar.module.css";
import LoggedOutView from './components/LoggedOutView';
import Footer from './components/Footer';
import RegisterPage from './pages/RegisterPage';
import { Registers } from './models/registers';
import BookingPage from './pages/BookingPage';
import ViewBookingRequest from './pages/ViewBookingRequest';
import BookingReceivedPage from './pages/BookingReceivedPage';
import BookingRequest from './pages/BookingRequest';
import RegisterReceivedPage from './pages/RegisterReceivedPage';
import ViewRegisterForm from './pages/ViewRegisterForm';
import ViewRoster from './pages/ViewRoster';
import ForgotPasswordReceivedPage from './pages/ForgotPasswordReceivedPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ViewCalendar from './pages/ViewCalendar';

function App() {

  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const [loggedInStaff, setLoggedInStaff] = useState<Staff | null>(null);
  const [showUserSignUpModal, setshowUserSignUpModal] = useState(false);
  const [showUserLoginModal, setShowUserLoginModal] = useState(false);
  const [showStaffLoginModal, setShowStaffLoginModal] = useState(false);

  const logo = require("./styles/wakaeasternbaylogo.png");

  useEffect(() => {
    async function fetchLoggedInUser() {
      try {
        const user = await WebsitesApi.getLoggedInUser();
        setLoggedInUser(user);
      } catch (error) {
        console.error(error);
      }
    }
    async function fetchLoggedInStaff() {
      try {
        const staff = await WebsitesApi.getLoggedInStaff();
        setLoggedInStaff(staff);
      } catch (error) {
        console.error(error);
      }
    }
    
    fetchLoggedInUser();
    fetchLoggedInStaff();
  }, []);
  

  return (
    <BrowserRouter>
      <div>
        <NavBar
          loggedInUser={loggedInUser}
          onUserLoginClicked={() => setShowUserLoginModal(true)}
          onUserSignUpClicked={() => setshowUserSignUpModal(true)}
          onUserLogoutSuccessful={() => setLoggedInUser(null)}
        />
        {showUserSignUpModal &&
          <UserSignUpModal
            onDismiss={() => setshowUserSignUpModal(false)}
            onUserSignUpSuccessful={(user) => {
              setLoggedInUser(user);
              setshowUserSignUpModal(false);
            }}
          />
        }
        {showUserLoginModal &&
          <UserLoginModal
            onDismiss={() => setShowUserLoginModal(false)}
            onUserLoginSuccessful={(user) => {
              setLoggedInUser(user);
              setShowUserLoginModal(false);
            }} 
          />
        }

        <div>
          <center><img src={logo} alt="waka eastern bay logo" className={styles.img} /></center>
        </div>
        <Container className={styles.homePage}>
          <>
            {loggedInUser && loggedInStaff
              ? <LoggedOutView />
              : null
            }
          </>
        </Container>
        <Container>
          <Routes>
            <Route
              path='/'
              element={<HomePage />}
            />
            <Route
              path='/*'
              element={<NotFoundPage />}
            />
            <Route
              path='/registerpage'
              element={<RegisterPage onRegisterSaved={(register: Registers) => {}} />}
            />
            <Route
              path='/viewregisters'
              element={<ViewRegisterForm />}
            />
            <Route
              path='/registerreceivedpage'
              element={<RegisterReceivedPage />}
            />
            <Route
              path='/forgotpassword'
              element={<ForgotPasswordPage onEmailSubmitted={(user: User) => {}} />}
            />
            <Route
              path='/resetpassword/:id'
              element={<ResetPasswordPage onPasswordSubmitted={(user: User) => {}} />}
            />
            <Route
              path='/forgotpasswordreceivedpage'
              element={<ForgotPasswordReceivedPage />}
            />
            <Route
              path='/bookingpage'
              element={<BookingPage />}
            />
            <Route
              path='/bookings/userview'
              element={<BookingRequest />}
            />
            <Route
              path='/bookings/staffview'
              element={<ViewBookingRequest />}
            />
            <Route
              path='/bookingreceivedpage'
              element={<BookingReceivedPage />}
            />
            <Route
              path='/viewrosters'
              element={<ViewRoster />}
            />
            <Route
              path='/viewcalendar'
              element={<ViewCalendar />}
            />
            <Route
              path='notfoundpage'
              element={<NotFoundPage />}
            />
          </Routes>
        </Container>
        <Footer
          loggedInStaff={loggedInStaff}
          onStaffLoginClicked={() => setShowStaffLoginModal(true)}
          onStaffLogoutSuccessful={() => setLoggedInStaff(null)}
        />
        {showStaffLoginModal &&
          <StaffLoginModal
            onDismiss={() => setShowStaffLoginModal(false)}
            onStaffLoginSuccessful={(staff) => {
              setLoggedInStaff(staff);
              setShowStaffLoginModal(false);
            }} 
          />
        }
      </div>
    </BrowserRouter>
  );
}

export default App;
