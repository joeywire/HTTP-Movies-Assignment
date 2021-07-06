import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';



const UpdateForm = props => {
    //Organize needed data
    const [item, setItem] = useState({});
    const { id } = useParams();
    const { push } = useHistory();
    const { getMovieList } = props;

    //pull the info we need - could probably just pass this down as props to avoid un-necessary duplicate calls? Only passing the infor down one level so its not really a pain in the ass. 
    //Context API seems like a good option.  
    useEffect(() => {
        axios.get(`http://localhost:5000/api/movies/${id}`)
        .then(res => {
            setItem(res.data);
        })
        .catch(err => {console.log(err)})
    }, []);

    //Event Handlers
    const handleChange = e => {
        setItem({
            ...item, 
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = e => {
        e.preventDefault();
        //update our API - check documentation for body structure
        axios.put(`http://localhost:5000/api/movies/${id}`, item)
            // Put call updates our API but doesn't cause the page to re-render. So lets reset our global state if the put request is good 
            //this will trigger a re-render, and our subsequent API call for update infor
            .then(res => {
                getMovieList();
                //Send em back to teh movie pages
                push(`/movies/${id}`);
            })
            .catch(err => console.log(err))
    }
    
    return (
        <div>
            <h3>Update Movie Information:</h3>
            <form onSubmit={handleSubmit}>
                <label>Title:</label>
                <input 
                    type="text"
                    name="title"
                    value={item.title}
                    onChange={handleChange}
                />
                <label>Director:</label>
                <input 
                    type="text"
                    name="director"
                    value={item.director}
                    onChange={handleChange}
                />
                <label>Metascore:</label>
                <input 
                    type="text"
                    name="metascore"
                    value={item.metascore}
                    onChange={handleChange}
                />
                <button>Update Movie</button>
            </form>
        </div>
    )
    
}

export default UpdateForm;