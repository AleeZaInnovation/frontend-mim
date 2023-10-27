import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Layout/Header/Header";
import { Footer } from './components/Layout/Footer/Footer';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ForgetPassword from './components/Auth/ForgetPassword';
import { ResetPassword } from './components/Auth/ResetPassword';
import { Contact } from './components/Contact/Contact';
import Request from './components/Request/Request';
import About from './components/About/About';
import Subscribe from './components/Payments/Subscribe';
import PaymentFail from './components/Payments/PaymentFail';
import PaymentSuccess from './components/Payments/PaymentSuccess';
import NotFound from './components/Layout/NotFound/NotFound';
import Profile from './components/Profile/Profile';
import ChangePassword from './components/Profile/ChangePassword';
import UpdateProfile from './components/Profile/UpdateProfile';
import Dashboard from './components/Admin/Dashboard/Dashboard';
import CreateParty from './components/Admin/CreateParty/CreateParty';
import Users from './components/Admin/Users/Users';
import { useDispatch, useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import { loadUser } from './redux/actions/user';
import { ProtectedRoute } from 'protected-route-react';
import Loader from './components/Layout/Loader/Loader';
import AdminParties from './components/Admin/AdminParties/AdminParties';
import CreateTransaction from './components/Admin/CreateTransaction/CreateTransaction';
import PartyTransaction from './components/Admin/PartyTransaction/PartyTransaction';
import TypeWiseTra from './components/Admin/Report/TypeWiseTra';
import AccountWiseTra from './components/Admin/Report/AccountWiseTra';
function App() {
  // window.addEventListener('contextmenu', e=>{
  //   e.preventDefault();
  // });
  const { isAuthenticated, user, error, message, loading } = useSelector((state) => state?.user)
  const dispatch = useDispatch();
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' })
    }
    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' })
    }
  }, [dispatch, error, message]);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch])
  return (
    <Router>
      {
        loading ? (<Loader />) : (
          <>
            <Header isAuthenticated={isAuthenticated} user={user} />
            <Routes>
              <Route path='/contact' element={<Contact />} />
              <Route path='/request' element={<Request />} />
              <Route path='/about' element={<About />} />
              <Route path='/profile' element={<ProtectedRoute isAuthenticated={isAuthenticated} adminRoute={true} isAdmin={user && user.role === 'admin'}>
                <Profile user={user} />
              </ProtectedRoute>} />
              <Route path='/changepassword' element={<ProtectedRoute isAuthenticated={isAuthenticated}>
                <ChangePassword />
              </ProtectedRoute>} />
              <Route path='/updateprofile' element={<ProtectedRoute isAuthenticated={isAuthenticated}>
                <UpdateProfile user={user} />
              </ProtectedRoute>} />
              <Route path='/' element={<ProtectedRoute isAuthenticated={!isAuthenticated} redirect="/admin/dashboard">
                <Login />
              </ProtectedRoute>} />
              <Route path='/login' element={<ProtectedRoute isAuthenticated={!isAuthenticated} redirect="/admin/dashboard">
                <Login />
              </ProtectedRoute>} />
              <Route path='/register' element={<ProtectedRoute isAuthenticated={!isAuthenticated} redirect="/admin/dashboard">
                <Register />
              </ProtectedRoute>} />
              <Route path='/forgetpassword' element={<ProtectedRoute isAuthenticated={!isAuthenticated} redirect="/admin/dashboard">
                <ForgetPassword />
              </ProtectedRoute>} />
              <Route path='/resetpassword/:token' element={<ProtectedRoute isAuthenticated={!isAuthenticated} redirect="/admin/dashboard">
                <ResetPassword />
              </ProtectedRoute>} />
              <Route path="/subscribe" element={<ProtectedRoute isAuthenticated={isAuthenticated}>
                <Subscribe user={user} />
              </ProtectedRoute>} />
              <Route path="*" element={<NotFound />} />
              <Route path="/paymentsuccess" element={<PaymentSuccess />} />
              <Route path="/paymentfail" element={<PaymentFail />} />
              {/* {--Admin Routes--} */}
              <Route path="/admin/dashboard" element={<ProtectedRoute isAuthenticated={isAuthenticated} adminRoute={true} isAdmin={user && user.role === 'admin'}>
                <Dashboard />
              </ProtectedRoute>} />
              <Route path="/admin/parties" element={<ProtectedRoute isAuthenticated={isAuthenticated} adminRoute={true} isAdmin={user && user.role === 'admin'}>
                <AdminParties />
              </ProtectedRoute>} />
              <Route path="/admin/create-transaction" element={<ProtectedRoute isAuthenticated={isAuthenticated} adminRoute={true} isAdmin={user && user.role === 'admin'}>
                <CreateTransaction />
              </ProtectedRoute>} />
              <Route path="/admin/create-party" element={<ProtectedRoute isAuthenticated={isAuthenticated} adminRoute={true} isAdmin={user && user.role === 'admin'}>
                <CreateParty />
              </ProtectedRoute>} />
              <Route path="/admin/party-transaction" element={<ProtectedRoute isAuthenticated={isAuthenticated} adminRoute={true} isAdmin={user && user.role === 'admin'}>
                <PartyTransaction />
              </ProtectedRoute>} />
              <Route path="/admin/type-wise-transaction" element={<ProtectedRoute isAuthenticated={isAuthenticated} adminRoute={true} isAdmin={user && user.role === 'admin'}>
                <TypeWiseTra />
              </ProtectedRoute>} />
              <Route path="/admin/account-wise-transaction" element={<ProtectedRoute isAuthenticated={isAuthenticated} adminRoute={true} isAdmin={user && user.role === 'admin'}>
                <AccountWiseTra />
              </ProtectedRoute>} />
              <Route path="/admin/users" element={<ProtectedRoute isAuthenticated={isAuthenticated} adminRoute={true} isAdmin={user && user.role === 'admin'}>
                <Users />
              </ProtectedRoute>} />
            </Routes>
            <Footer />
            <Toaster />
          </>
        )
      }
    </Router>
  );
}

export default App;
