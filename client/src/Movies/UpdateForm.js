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

    useEffect(() => {
        axios.get(`http://localhost:5000/api/movies/${id}`)
        .then(res => {
            setItem(res.data);
        })
        .catch(err => {console.log(err)})
    }, []);

    //Event Handlers
    const handleChange = e => {
        e.persist();
        setItem({
            ...item, 
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = e => {
        e.preventDefault();
    }
    
    return (
        <div>
            <h3>Update Movie Information:</h3>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    name="title"
                    value={item.title}
                    onChange={handleChange}
                />
                 <input 
                    type="text"
                    name="director"
                    value={item.director}
                    onChange={handleChange}
                />
                 <input 
                    type="text"
                    name="title"
                    value={item.metascore}
                    onChange={handleChange}
                />

            </form>
        </div>
    )
    
}

export default UpdateForm;