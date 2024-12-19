import  { useState, useEffect } from 'react';
import png from '../public/WeatherIcons.gif';
import Weather from "./components/weather/index.jsx";
import Location from "./components/location/index.jsx";

function App() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            () => setTimeout(() => setLoading(false), 3000),
            (error) => {
                alert('Please allow location access to use the app');
                console.error('Error getting location:', error);
            }
        );
    }, []);

    return (
        <div className={`h-[100vh] flex justify-center items-center ${loading ? '' : 'lg:h-[100vh] w-full flex-col lg:flex-row gap-4 py-8 lg:py-0'}`}>
            {loading ? (
                <div className='w-[350px] flex flex-col items-center bg-white bg-opacity-15 border-2 border-white border-opacity-20 backdrop-blur-lg h-[555px] rounded-2xl p-5 font-sans'>
                    <img className='w-5/6' src={png} alt='Weather Icons' />
                    <div className='text-white text-center'>
                        <h1 className='text-2xl font-semibold'>Detecting your location</h1>
                        <h2 className='mt-3'>Your current location will be displayed on the App & used for calculating real-time weather.</h2>
                        <h2 className='mt-3 font-medium'>Please allow your location</h2>
                    </div>
                </div>
            ) : (
                <div className='lg:h-[100vh] md:font-light w-full flex flex-col lg:flex-row justify-center items-center gap-4 py-8 lg:py-0'>
                    <Location/>
                 <Weather/>

                </div>
            )}
        </div>
    );
}

export default App;
