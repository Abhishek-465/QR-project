// src/App.js
import React, { useState } from 'react';
import axios from 'axios';
import QRCode from 'qrcode.react';

function App() {
    const [name, setName] = useState('');
    const [teamName, setTeamName] = useState('');
    const [mealCount, setMealCount] = useState(null);
    const [qrUrl, setQrUrl] = useState('');
    const backend_url="";

    const handleGenerateQR = async () => {
        const user = { name, teamName };
        try {
            await axios.post(`${backend_url}/createUser`, user);
            const url = `${backend_url}/scan?name=${encodeURIComponent(name)}&teamName=${encodeURIComponent(teamName)}`;
            setQrUrl(url);
            setMealCount(0);
        } catch (error) {
            console.error(error);
        }
    };

    const handleScanQR = async () => {
        try {
            const response = await axios.get(qrUrl);
            setMealCount(response.data.mealCount);
            alert('Meal count updated successfully');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="App">
            <h1>QR Code Meal Tracker</h1>
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Team Name"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
            />
            <button onClick={handleGenerateQR}>Generate QR Code</button>
            {qrUrl && <QRCode value={qrUrl} />}

            <button onClick={handleScanQR} disabled={!qrUrl}>Simulate Scan</button>

            {mealCount !== null && <p>Meal Count: {mealCount}</p>}
        </div>
    );
}

export default App;
