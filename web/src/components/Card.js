import React, { useState } from 'react';
import { InputLabel, Button} from '@material-ui/core';
import { useNavigate } from 'react-router-dom';


const Card = () => {
    const [fullName, setFullName] = useState("");
    const [address, setAddress] = useState("");
    const [cropSeason, setCropSeason] = useState("");
    const [culArea, setCulArea] = useState("");
    const [zone, setZone] = useState("");
    const [qr, setQr] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [landPrepData, setLandPrepData] = useState({});

    const navigate = useNavigate();

    const navigateToLandprep = () => {
        navigate('/Landprep');
    };

    const handleLandPrepSubmit = (landPrepData) => {
        setLandPrepData(landPrepData);
        navigateToLandprep();
    };

    const getQRCode = async (e) => {
        e.preventDefault();

        try {
            setIsLoading(true);
            const dataToEncode = `Full Name: ${fullName}\nAddress: ${address}\nCrop Season: ${cropSeason}\nCultivated Area (Ha): ${culArea}\nZone (Wet, Dry, Intermidiate): ${zone}\nLandprep Data: ${JSON.stringify(landPrepData)}`;
            const encodedData = encodeURIComponent(dataToEncode);
        
            const res = await fetch(`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodedData}`)
            const blob = await res.blob();
            const qrImageUrl = URL.createObjectURL(blob);
            setQr(qrImageUrl);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = qr;
        link.download = 'qr_code.png';
        link.click();
    };

    return (
        <div className='page-container' ><img src="./paddy.jpg" alt=''/>
        <form className='form' onSubmit={getQRCode}>
            <h1 className='title'> QR Code Generator</h1>
            <InputLabel>Full Name</InputLabel>
            <input
                type="text"
                className='input'
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                placeholder='Enter your full name'
            />
            <InputLabel>Address</InputLabel>
            <input
                type="text"
                className='input'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                placeholder='Enter your address'
            />
            <InputLabel>Crop Season</InputLabel>
            <input
                type="text"
                className='input'
                value={cropSeason}
                onChange={(e) => setCropSeason(e.target.value)}
                required
                placeholder='Enter the crop Season'
            />
            <InputLabel>Cultivated Area (Ha)</InputLabel>
            <input
                type="text"
                className='input'
                value={culArea}
                onChange={(e) => setCulArea(e.target.value)}
                required
                placeholder='Enter the Cultivated Area'
            />
            <InputLabel>Zone (Wet, Dry, Intermidiate)</InputLabel>
            <input
                type="text"
                className='input'
                value={zone}
                onChange={(e) => setZone(e.target.value)}
                required
                placeholder='Enter the Zone'
            />

            {/* Navigate button */}
            <div className='button-container'>
                <Button variant="contained" color="primary" onClick={navigateToLandprep}> Landprep
                </Button>
            </div>
            <div className='button-container'>
                <Button variant="contained" color="primary"> Seed Selection
                </Button>
            </div>

            

            <input type="submit" className='submit' value="Generate QR Code" />

            
            {isLoading && <div className='loading'><span></span>Loading....</div>}

            {!isLoading && (qr ? <img className='qr_code' src={qr} alt='qr_code' /> :
                <div className='loading'> QR Code for the user </div>)}
            
            <div className='download-container'>
                    <button className='download-button' onClick={handleDownload}>
                        Download QR Code
                    </button>
                </div>


        </form>
        </div>
        
        
    )
}

export default Card;
