import { useState, useEffect, useContext } from 'react';
import CommentForm from '../CommentForm/CommentForm';
import * as outfitService from '../../services/outfitService';
// import { show } from '../../services/outfitService'; // best way to import
import { UserContext } from '../../contexts/UserContext';
import { useParams, Link } from 'react-router';

const OutfitDetails = (props) => {
    const [outfit, setOutfit] = useState(null);
    const { updatedID } = useParams();
    const { user } = useContext(UserContext);

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
    
    useEffect(() => {
        const fetchOutfit = async () => {
            const outfitData = await outfitService.show(updatedID);
            setOutfit(outfitData);
        }
        fetchOutfit(); // this will run when the effect function runs
        // the effect function runs when we have a updatedID

    }, [updatedID]);

    if (!outfit) return <main>Loading ... </main>;
    if (Object.keys(outfit).length === 0 || !outfit.title) {
        return <main>No outfit found.</main>;
    }

    return (
        <main>
            <section>
                <header>
                    <p>{outfit.tags?.join(', ') || 'No tags listed'}</p>
                    <h1>{outfit.title}</h1>
                    <p>
                        {`${outfit.author.username} posted on 
                          ${new Date(outfit.createdAt).toLocaleDateString()}`}
                    </p>
                    {
                        outfit.author._id === user._id && (
                            <>
                                <Link to={`/outfits/${updatedID}/edit`}>Edit</Link>
                                <button 
                                    onClick={() => props.handleDeleteOutfit(updatedID)}>
                                        Delete
                                </button>
                            </>
                        )
                    }
                </header>
                <p>{outfit.text}</p>
            </section>
            <section>
                <h2>Comments</h2>
                
                <CommentForm 
                    handleAddComment={handleAddComment} 
                />

                {!outfit.comments?.length && <p>There are no comments</p>}
                {outfit.comments?.map((comment) => (
                    <article key={comment._id}>
                        <header>
                            <p>
                                {`${comment.author.username} posted on
                                    ${new Date(comment.createdAt).toLocaleDateString()}
                                `}
                            </p>
                        </header>
                        <p>{comment.text}</p>
                    </article>
                ))}
            </section>
        </main>
    );
};

export default OutfitDetails;