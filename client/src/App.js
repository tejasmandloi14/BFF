import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Import the CSS file

function App() {
    const [inputData, setInputData] = useState('');
    const [response, setResponse] = useState(null);
    const [error, setError] = useState('');
    const [selectedOption, setSelectedOption] = useState(''); // For dropdown menu selection

    // Set the website title to the roll number
    useEffect(() => {
        document.title = '21BAI1227'; // Replace 'ABCD123' with your roll number
    }, []);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const jsonInput = JSON.parse(inputData); // Parse input as JSON
            const res = await axios.post('https://bajajend-1.onrender.com/bfhl', {
                data: jsonInput.data,
            });
            setResponse(res.data); // Store API response
            setError('');
        } catch (err) {
            console.error(err);
            setError('Invalid JSON input or error occurred during the request.');
            setResponse(null);
        }
    };

    // Handle changes in the dropdown selection
    const handleDropdownChange = (e) => {
        setSelectedOption(e.target.value);
    };

    // Render the filtered response based on selected option
    const renderResponse = () => {
        if (!response) return null;

        const filteredResponse = {};
        if (selectedOption === 'Alphabets') {
            filteredResponse.alphabets = response.alphabets;
        } else if (selectedOption === 'Numbers') {
            filteredResponse.numbers = response.numbers;
        } else if (selectedOption === 'Highest lowercase alphabet') {
            filteredResponse.highest_lowercase_alphabet = response.highest_lowercase_alphabet;
        }

        // Render only the selected option
        return <pre>{JSON.stringify(filteredResponse, null, 2)}</pre>;
    };

    return (
        <div className="container">
            <h1 className="title">JSON Input</h1>
            <form className="form" onSubmit={handleSubmit}>
                <textarea
                    className="textarea"
                    value={inputData}
                    onChange={(e) => setInputData(e.target.value)}
                    placeholder="Enter JSON input here"
                    rows="10"
                    cols="50"
                />
                <br />
                <button className="submit-button" type="submit">Submit</button>
            </form>

            {error && <p className="error">{error}</p>}

            {response && (
                <div className="response-container">
                    <h2 className="subtitle">Select an option to display:</h2>
                    <select className="dropdown" onChange={handleDropdownChange} value={selectedOption}>
                        <option value="">Select an option</option>
                        <option value="Alphabets">Alphabets</option>
                        <option value="Numbers">Numbers</option>
                        <option value="Highest lowercase alphabet">Highest lowercase alphabet</option>
                    </select>

                    <h2 className="subtitle">Filtered Response:</h2>
                    {renderResponse()}
                </div>
            )}
        </div>
    );
}

export default App;
