import { useContext, useState, useEffect } from 'react';
import { Routes, Route, useNavigate,useParams, useLocation } from 'react-router-dom';
import { UserContext } from './contexts/UserContext';

import NavBar from './components/NavBar/NavBar';
import Landing from './components/Landing/Landing';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import UserList from './components/UserList/UserList';
import UserProfileDetails from './components/UserProfileDetails/UserProfileDetails';
import OutfitForm from './components/OutfitForm/OutfitForm';
import OutfitList from './components/OutfitList/OutfitList';
import OutfitDetails from './components/OutfitDetails/OutfitDetails';
import Footer from './components/Footer/Footer';
import Background from './components/Background/Background';
import UserUpdateForm from './components/UserUpdateForm/UserUpdateForm';
import Quiz from './components/Quiz/Quiz';
import QuizResult from './components/QuizResult/QuizResult'

import * as outfitService from './services/outfitService';
import UserProfile from './components/UserProfile/UserProfile';

const UserProfileWrapper = () => {
  const { id } = useParams();
  const { user } = useContext(UserContext)

  if (user._id === id) {
    return <UserProfile id={id}/>
  } else {
    return  <UserProfileDetails id={id}/>;
  }
  
};

const App = () => {
  const { user } = useContext(UserContext);
  const [outfits, setOutfits] = useState([]);
  const navigate = useNavigate();

  const handleAddOutfit = async (outfitFormData) => {
    const newOutfit = await outfitService.create(outfitFormData);
    setOutfits([newOutfit, ...outfits]); 
    navigate('/outfits');
  };

  const handleDeleteOutfit = async (updatedID) => {
    const deletedOutfit = await outfitService.deleteOutfit(updatedID);
    setOutfits(outfits.filter((outfit) => outfit._id !== deletedOutfit._id));
    navigate('/outfits');
  };

  const handleUpdateOutfit = async (updatedID, outfitFormData) => {
    const updatedOutfit = await outfitService.updateOutfit(updatedID, outfitFormData);
    setOutfits(outfits.map((outfit) => (
      updatedID ===  outfit._id ? updatedOutfit : outfit
    )));

    navigate(`/outfits/${updatedID}`);
  };

  const location = useLocation();

  useEffect(() => {
    const fetchAllOutfits = async () => {
      try {
        const outfitsData = await outfitService.index();
        setOutfits(outfitsData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
      } catch (err) {
        console.error('Failed to fetch outfits:', err);
      }
    };
  
    const shouldFetch = [
      '/outfits',
      '/outfits/new',
      '/profile',
    ].some(path => location.pathname.startsWith(path));
  
    if (user && shouldFetch) {
      fetchAllOutfits();
    }
  }, [user, location.pathname]);
  

  return (
    <>
     <Background />
     <div className="page-container">
        <NavBar />
        <main className="content-wrap">
          <Routes>
            <Route path="/" element={user ? <UserList /> : <Landing />} />
            <Route path="/landing" element={<Landing />} />
            {user ? (
              <>
                <Route path="/outfits" element={<OutfitList outfits={outfits} />} />
                <Route path="/outfits/new" element={<OutfitForm handleAddOutfit={handleAddOutfit} />} />
                <Route path="/outfits/:updatedID" element={<OutfitDetails handleDeleteOutfit={handleDeleteOutfit} />} />
                <Route path="/outfits/:updatedID/edit" element={<OutfitForm handleUpdateOutfit={handleUpdateOutfit} />} />
                <Route path="/userList" element={<UserList />} />
                <Route path="/profile/:id" Component={UserProfileWrapper} />
                <Route path="/profile/:id" element={<UserProfileDetails />} />
                <Route path="/profile/" element={<UserProfile />} /> 
                <Route path="/profile/edit" element={<UserUpdateForm />} />
                <Route path="/quiz" element={<Quiz />} />
                <Route path="/quiz/results" element={<QuizResult />} />


              </>
            ) : (
              <>
                <Route path="/sign-up" element={<SignUpForm />} />
                <Route path="/sign-in" element={<SignInForm />} />
              </>
            )}
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default App;
