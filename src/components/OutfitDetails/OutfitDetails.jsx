import { useState, useEffect, useContext } from 'react';
import CommentForm from '../CommentForm/CommentForm';
import * as outfitService from '../../services/outfitService';
// import { show } from '../../services/outfitService'; // best way to import
import { UserContext } from '../../contexts/UserContext';
import { useParams, Link } from 'react-router';
import './OutfitDetails.css';

const OutfitDetails = (props) => {
    const [outfit, setOutfit] = useState(null);
    const { updatedID } = useParams();
    const { user } = useContext(UserContext);
    
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editFormData, setEditFormData] = useState({ content: '' })

    const handleAddComment = async (commentFormData) => {
        const newComment = await outfitService.createComment(
            updatedID, 
            commentFormData
        );
        
        setOutfit({
            ...outfit, 
            comments: [...outfit.comments, newComment]
        });
    };

    const handleEditClick = (comment) => {
        setEditingCommentId(comment._id);
        setEditFormData({ content: comment.content })
    }

    const handleUpdateComment = async (commentId) => {
        try {
            const updatedComment = await outfitService.updateComment(updatedID, commentId, editFormData);

            const updatedComments = outfit.comments.map((comment) =>
            comment._id === commentId ? updatedComment : comment);
            setOutfit({ ...outfit, comments: updatedComments });
            setEditingCommentId(null);
            setEditFormData({ content: '' })
        } catch (error) {
            console.error(error)
        }
    }

    const handleCancelEdit = () => {
        setEditingCommentId(null);
        setEditFormData({ content: '' })
    }

    const handleDeleteComment = async (commentId) => {
        try {
          const deletedComment = await outfitService.deleteComment(updatedID, commentId);
          const updatedComments = outfit.comments.filter(c => c._id !== commentId);
          setOutfit({ ...outfit, comments: updatedComments });
        } catch (error) {
          console.error(error);
        }
      };

    useEffect(() => {
        const fetchOutfit = async () => {
            const outfitData = await outfitService.show(updatedID);
            setOutfit(outfitData);
        }
        fetchOutfit(); // Fetch outfit when updatedID changes

    }, [updatedID]);

    if (!outfit) return <main>Loading ... </main>;
    if (Object.keys(outfit).length === 0 || !outfit.title) {
        return <main>No outfit found.</main>;
    }



    return (
        <main className='outfit-container'>
            <section className='outfit-header'>
                <header>
                    <h1>{outfit.title}</h1>
                    <p>{`Posted by ${outfit.author.username} on ${new Date(outfit.createdAt).toLocaleDateString()}`}</p>
        
                    {outfit.author._id === user._id && (
                        <div className="edit-delete-buttons">
                        <Link to={`/outfits/${updatedID}/edit`} className="edit-button">
                          Edit
                        </Link>
                        <button onClick={() => props.handleDeleteOutfit(updatedID)} className="delete-button">
                          Delete
                        </button>
                      </div>
                    )}
                </header>
                {outfit.imageUrl && (
                    <img 
                        className='outfit-image'
                        src={outfit.imageUrl}
                        alt={outfit.title}
                    />
                )}
                <p><strong>Description:</strong> {outfit.description}</p>
                <p><strong>Style:</strong> {outfit.styleProfile}</p>
                <p><strong>Fit:</strong> {outfit.fitPreference}</p>
                <p><strong>Season:</strong> {outfit.season}</p>
                <p><strong>Climate:</strong> {outfit.climateFit}</p>
                <p><strong>Gender Category:</strong> {outfit.genderCategory}</p>
                <p><strong>Lifestyle Tags:</strong> {outfit.lifestyleTags?.join(', ')}</p>
            </section>
            <section className='comments-section'>
                <h2>Comments</h2>
                
                <CommentForm 
                    handleAddComment={handleAddComment} 
                />

                {!outfit.comments?.length && <p>There are no comments</p>}
                {outfit.comments?.map((comment) => (
                   <article key={comment._id}>
                   <header>
                     <p>
                       {`${comment.author.username} posted on ${new Date(comment.createdAt).toLocaleDateString()}`}
                     </p>
                   </header>
               
                   {editingCommentId === comment._id ? (
                     <form onSubmit={(e) => {
                       e.preventDefault();
                       handleUpdateComment(comment._id);
                     }}>
                       <textarea
                         value={editFormData.content}
                         onChange={(e) => setEditFormData({ content: e.target.value })}
                         required
                       />
                       <button type="submit">Save</button>
                       <button type="button" onClick={handleCancelEdit}>Cancel</button>
                     </form>
                   ) : (
                     <>
                       <p>{comment.content}</p>
                       {comment.author._id === user._id && (
                         <div>
                         <button onClick={() => handleEditClick(comment)}>Edit</button>
                         <button onClick={() => handleDeleteComment(comment._id)}>Delete</button>
                       </div>
                       )}
                     </>
                   )}
                 </article>
                ))}
            </section>
        </main>
    );
};

export default OutfitDetails;