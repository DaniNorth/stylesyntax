import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import * as outfitService from '../../services/outfitService';

const OutfitForm = (props) => {
    const { updatedID } = useParams();

    const [formData, setFormData] = useState({
        title: '',  
        text: '',  
        category: 'News',  
    });

    const handleChange = (evt) => {
        setFormData({
            ...formData, 
            [evt.target.name]: evt.target.value
        });
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();
        if(updatedID) {
            props.handleUpdateOutfit(updatedID, formData);
        } else {
            props.handleAddOutfit(formData);
        }
    };

    useEffect(() => {
       const fetchOutfit = async () => {
            const outfitData = await outfitService.show(updatedID);
            setFormData(outfitData); // fill out form with outfit details
            // so we can edit the outfit
       } 

       if(updatedID) fetchOutfit();

       return () => { // cleanup function
            setFormData({
                title: '',  
                text: '',  
                category: 'News',  
            });
       }
    }, [updatedID]); // only set form state to the outfit when editing

    return (
        <main>
            <h1>{updatedID ? 'Edit outfit' : 'New outfit'}</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title-input">Title</label>
                <input
                    required 
                    type="text"
                    name="title"
                    id="title-input"
                    value={formData.title}
                    onChange={handleChange} 
                />
                <label htmlFor="text-input">Text</label>
                <textarea
                    required 
                    type="text"
                    name="text" 
                    id="text-input"
                    value={formData.text}
                    onChange={handleChange} 
                />
                <label htmlFor="category-input">Category</label>
                <select
                    required 
                    name="category" 
                    id="category-input"
                    value={formData.category}
                    onChange={handleChange}
                >
                    <option value="News">News</option>
                    <option value="Games">Games</option>
                    <option value="Music">Music</option>
                    <option value="Movies">Movies</option>
                    <option value="Sports">Sports</option>
                    <option value="Television">Television</option>
                </select>
                <button type="submit">SUBMIT</button>
            </form>
        </main>
    );
}

export default OutfitForm;