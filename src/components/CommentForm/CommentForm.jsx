import {
    useState
}

from 'react';
import './CommentForm.css';

const CommentForm=(props)=> {

    const [formData,
    setFormData]=useState( {
            content: ''
        }

    );

    const handleChange=(evt)=> {
        setFormData( {
                ...formData,
                [evt.target.name]: evt.target.value
            }

        );
    }

    ;

    const handleSubmit=(evt)=> {
        evt.preventDefault();
        props.handleAddComment(formData);

        setFormData( {
                text: ''
            }

        );
    }

    ;

    return (<form onSubmit= {
            handleSubmit
        }

        className="comment-form"> <label htmlFor="text-input">Your Comment</label> <textarea required type="text"
        // name="text" 
        name="content"
        id="text-input"

        value= {
            formData.text
        }

        onChange= {
            handleChange
        }

        /> <button type="submit">SUBMIT COMMENT</button> </form>);
}

;

export default CommentForm;