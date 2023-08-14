import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { InputLabel } from '@material-ui/core';

const Landprep = (props) => {
    const navigate = useNavigate();
    const [firPlowCost, setFirPlowCost] = useState("");
    const [secPlowCost, setSecPlowCost] = useState("");
    const [qr, setQr] = useState("");
    const [landPrepData, setLandPrepData] = useState({});

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const landPrepData = {
            firstPlowingCost: firPlowCost,
            secondPlowingCost: secPlowCost,
        };
        setLandPrepData(landPrepData);
        getQRCode(landPrepData);
    };

    const getQRCode = async (landPrepData) => {
        const dataToEncode = JSON.stringify(landPrepData);
        const encodedData = encodeURIComponent(dataToEncode);

        const res = await fetch(`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodedData}`)
        const blob = await res.blob();
        const qrImageUrl = URL.createObjectURL(blob);
        setQr(qrImageUrl);
    };

    return (
        <div className='page-container'>
            <form className='form' onSubmit={handleFormSubmit}>
                <h1 className='title'> Land Preparation </h1>
                <InputLabel>First plowing Cost</InputLabel>
                <input
                    type="text"
                    className='input'
                    value={firPlowCost}
                    onChange={(e) => setFirPlowCost(e.target.value)}
                    required
                    placeholder='Enter The Cost'
                />
                <InputLabel>Second plowing Cost</InputLabel>
                <input
                    type="text"
                    className='input'
                    value={secPlowCost}
                    onChange={(e) => setSecPlowCost(e.target.value)}
                    required
                    placeholder='Enter The Cost'
                />
                {/* Rest of the form */}
                <input type="submit" className='submit' value="Submit" />
                <button onClick={() => navigate(-1)}>Go Back</button>
            </form>
            {qr && <img className='qr_code' src={qr} alt='qr_code' />}
        </div>
    );
};

export default Landprep;
