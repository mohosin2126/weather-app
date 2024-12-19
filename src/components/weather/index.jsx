import { useState } from 'react';
import invalid from '../../../public/invalid.png';
import { FaSearch } from 'react-icons/fa';
import { WiDaySunny, WiHumidity, WiDayWindy } from 'react-icons/wi';
import { BsCloudSun, BsClouds, BsCloudFog2 } from 'react-icons/bs';
import { IoRainy } from 'react-icons/io5';
import { FaSnowflake } from 'react-icons/fa';
import { CiCloudDrizzle } from 'react-icons/ci';

const weatherIcons = {
    Clear: <WiDaySunny size={64} />,
    Haze: <BsCloudSun size={64} />,
    Clouds: <BsClouds size={64} />,
    Rain: <IoRainy size={64} />,
    Snow: <FaSnowflake size={64} />,
    Fog: <BsCloudFog2 size={64} />,
    Mist: <BsCloudFog2 size={64} />,
    Drizzle: <CiCloudDrizzle size={64} />,
};

const defaultState = {
    humidity: '0',
    wind: '0',
    temp: '0',
    cityName: 'Enter Location',
    description: '',
    icon: <img src={invalid} alt="invalid" className="w-[128px]" />,
};

export default function Weather() {
    const key = import.meta.env.VITE_WEATHER_API_KEY;
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(defaultState);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!city.trim()) return;

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.trim()}&units=metric&appid=${key}`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            if (data.cod === "404") {
                setWeatherData({ ...defaultState, cityName: 'Invalid City' });
            } else {
                setWeatherData({
                    humidity: Math.floor(data.main.humidity),
                    wind: Math.floor(data.wind.speed),
                    temp: Math.floor(data.main.temp),
                    cityName: data.name,
                    description: data.weather[0].main,
                    icon: weatherIcons[data.weather[0].main] || defaultState.icon,
                });
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            setWeatherData(defaultState);
        } finally {
            setCity('');
        }
    };

    const { humidity, wind, temp, cityName, description, icon } = weatherData;

    return (
        <div className="w-[350px] bg-white bg-opacity-15 border-2 border-white border-opacity-20 backdrop-blur-lg h-[555px] rounded-2xl p-5 font-sans">
            <form onSubmit={handleSearch} className="w-full relative flex items-center h-[55px]">
                <input
                    type="text"
                    placeholder="Search"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full h-full absolute bg-transparent border-2 border-white border-opacity-20 text-xl outline-none text-white rounded-xl pl-5 pr-10"
                />
                <button type="submit" className="text-white absolute right-0 h-full w-[40px] text-xl pr-5 pl-2">
                    <FaSearch />
                </button>
            </form>

            <div className="mt-8 text-white font-normal flex flex-col items-center">
                <div className="text-9xl">{icon}</div>
                <div className="mt-6 text-6xl font-bold">
                    {temp}<span className="absolute text-2xl">°C</span>
                </div>
                <div className="mt-5 text-2xl font-medium">
                    {cityName}{description ? ' - ' + description : ''}
                </div>
            </div>

            <div className="w-full mt-8 text-white flex justify-center items-center">
                <div className="flex items-center pl-5 w-1/2">
                    <WiHumidity className="h-full text-white text-6xl" />
                    <div className="font-medium">
                        <div className="text-xl">{humidity} %</div>
                        <div className="text-sm">Humidity</div>
                    </div>
                </div>

                <div className="flex items-center gap-3 w-1/2">
                    <WiDayWindy className="h-full text-white text-6xl" />
                    <div className="font-medium">
                        <div className="text-xl">{wind} km/h</div>
                        <div className="text-sm">Wind Speed</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
