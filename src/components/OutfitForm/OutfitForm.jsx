import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import * as outfitService from '../../services/outfitService';
import './OutfitForm.css';




const OutfitForm = (props) => {
    const { updatedID } = useParams();

    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        styleProfile: '',
        lifestyleTags: [],
        season: '',
        climateFit: '',
        fitPreference: '',
        genderCategory: '',
    });

    const [image, setImage] = useState(null);

    const [imagePreview, setImagePreview] = useState(null);
  

    const handleChange = (evt) => {
        const { name, value, type, checked } = evt.target;

        if (type === 'checkbox') {
        const newTags = checked
            ? [...formData.lifestyleTags, value]
            : formData.lifestyleTags.filter((tag) => tag !== value);
            setFormData((prev) => ({ ...prev, lifestyleTags: newTags }));
        } else {
          setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

      const handleFileChange = (evt) => {
        const file = evt.target.files[0];
        setImage(file);
        if (file) {
          const previewURL = URL.createObjectURL(file);
          setImagePreview(previewURL);
        }
    };

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        const submissionData = new FormData();
      
        Object.entries(formData).forEach(([key, value]) => {
          if (Array.isArray(value)) {
            value.forEach((val) => submissionData.append(key, val));
          } else {
            submissionData.append(key, value);
          }
        });
        if (image) submissionData.append('image', image);
      
        try {
            if (updatedID) {
              await props.handleUpdateOutfit(updatedID, submissionData);
            } else {
              await props.handleAddOutfit(submissionData);
            }
          
            setErrorMessage(''); // clear any previous errors
            navigate('/outfits'); 
          } catch (error) {
            console.error(error);
          
            if (error.response?.data?.error) {
              setErrorMessage(error.response.data.error); // from server
            } else {
              setErrorMessage('Something went wrong while saving the outfit.');
            }
          }
        };
        useEffect(() => {
            const fetchOutfit = async () => {
              const outfitData = await outfitService.show(updatedID);
              setFormData(outfitData);
        
              if (outfitData.imageUrl) {
                setImagePreview(outfitData.imageUrl);
              }
            };
      
        if (updatedID) fetchOutfit();
    }, [updatedID]);

    useEffect(() => {
        return () => {
          if (imagePreview?.startsWith('blob:')) {
            URL.revokeObjectURL(imagePreview);
          }
        };
      }, [imagePreview]);
      
    return (
        <main>
            <h1>{updatedID ? 'Edit outfit' : 'New outfit'}</h1>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <label htmlFor="title">Title</label>
                <input
                required
                type="text"
                name="title"
                id="title"
                value={formData.title}
                onChange={handleChange}
                />

                <label htmlFor="description">Description</label>
                <textarea
                name="description"
                id="description"
                value={formData.description}
                onChange={handleChange}
                />

                <label htmlFor="styleProfile">Style Profile</label>
                <select name="styleProfile" id="styleProfile" value={formData.styleProfile} onChange={handleChange}>
                <option value="">Select one</option>
                {['Boho', 'Minimalist', 'Grunge', 'Preppy', 'Streetwear', 'Classic', 'Casual', 'Y2K', 'Chic', 'Other'].map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                ))}
                </select>

                <fieldset>
                <legend>Lifestyle Tags</legend>
                {['Athletic', 'Professional', 'Casual', 'Event-ready', 'Outdoorsy', 'Loungewear'].map(tag => (
                    <label key={tag}>
                    <input
                        type="checkbox"
                        name="lifestyleTags"
                        value={tag}
                        checked={formData.lifestyleTags.includes(tag)}
                        onChange={handleChange}
                    />
                    {tag}
                    </label>
                ))}
                </fieldset>

                <label htmlFor="season">Season</label>
                <select name="season" id="season" value={formData.season} onChange={handleChange}>
                <option value="">Select one</option>
                {['Winter', 'Spring', 'Summer', 'Fall'].map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                ))}
                </select>

                <label htmlFor="climateFit">Climate Fit</label>
                <select name="climateFit" id="climateFit" value={formData.climateFit} onChange={handleChange}>
                <option value="">Select one</option>
                {['Tropical', 'Temperate', 'Cold', 'Dry', 'Humid'].map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                ))}
                </select>

                <label htmlFor="fitPreference">Fit Preference</label>
                <select name="fitPreference" id="fitPreference" value={formData.fitPreference} onChange={handleChange}>
                <option value="">Select one</option>
                {['Fitted', 'Relaxed', 'Oversized'].map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                ))}
                </select>

                <label htmlFor="genderCategory">Gender Category</label>
                <select name="genderCategory" id="genderCategory" value={formData.genderCategory} onChange={handleChange}>
                <option value="">Select one</option>
                {['Male', 'Female', 'Nonbinary', 'Unisex'].map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                ))}
                </select>
                {imagePreview && (
                    <div className="image-preview">
                        <img src={imagePreview} alt="Preview" />
                    </div>
                )}
                <label htmlFor="image">Upload Image</label>
                <input type="file" name="image" id="image" accept="image/*" onChange={handleFileChange} />

                {errorMessage && (
                    <p style={{ color: 'red', marginBottom: '1rem' }}>
                        {errorMessage}
                    </p>
                )}
                <button type="submit">Submit</button>
            </form>
        </main>
        );
    };

export default OutfitForm;