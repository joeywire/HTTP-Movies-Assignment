import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';



const initialItem = { 
    title: "", 
    director: "", 
    metascore: ""
}

const UpdateForm = props => {
    //Organize needed data
    const [item, setItem] = useState({});
    const { id } = useParams();
    const { push } = useHistory();
    const { getMovieList } = props;

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
        axios.put(`http://localhost:5000/api/movies/${id}`, item)
            .then(res => {
                getMovieList();
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