import { useContext, useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router';

import NavBar from './components/NavBar/NavBar';
import Landing from './components/Landing/Landing';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import Dashboard from './components/Dashboard/Dashboard';
import OutfitForm from './components/OutfitForm/OutfitForm';
import OutfitList from './components/OutfitList/OutfitList';
import OutfitDetails from './components/OutfitDetails/OutfitDetails';

import Background from './components/Background/Background';
import { UserContext } from './contexts/UserContext';

import * as outfitService from './services/outfitService';

const App = () => {
  const { user } = useContext(UserContext);
  const [outfits, setOutfits] = useState([]);
  const navigate = useNavigate();

  const handleAddOutfit = async (outfitFormData) => {
    const newOufit = await outfitService.create(outfitFormData);
    setOutfits([newOutfit, ...outfits]); // updating state in asc order
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
    ))); // using .map for this helps preserve order when updating state

    navigate(`/outfits/${updatedID}`);
  };

  useEffect(() => {
    const fetchAllOutfits = async () => {
      const outfitsData = await outfitService.index();

      setOutfits(outfitsData); // setting outfits state
    }; 

    if(user) fetchAllOutfits(); 
    // ^ only fetch outfits when a user is logged in
  }, [user]); // adding user dependency
  // because the effect depends on the user to run

  return (
    <>
     <Background />
      <NavBar/>
      <Routes>
        <Route path='/' element={user ? <Dashboard /> : <Landing />} />
        {
          user ? (
            <>
              <Route 
                path="/outfits" 
                element={
                  <outfitList outfits={outfits} />
                } 
              />
              <Route 
                path="/outfits/new" 
                element={
                  <outfitForm handleAddOutfit={handleAddOutfit} />
                } 
              />
              <Route 
                path="/outfits/:updatedID" 
                element={
                  <outfitDetails handleDeleteOutfit={handleDeleteOutfit} />
                } 
              />
              <Route 
                path="/outfits/:updatedID/edit" 
                element={
                  <outfitForm handleUpdateOutfit={handleUpdateOutfit} />
                } 
              />
            </>
          ) : (
            <>
              <Route path='/sign-up' element={<SignUpForm />} />
              <Route path='/sign-in' element={<SignInForm />} />
            </>
          )
        }
      </Routes>
    </>
  );
};

export default App;
