import React,{Fragment,useState, useEffect} from 'react';

// import axios
import axios from 'axios'

// import icons
import {IoMdSunny, IoMdRainy, IoMdCloudy, IoMdSnow, IoMdThunderstorm, IoMdSearch} from 'react-icons/io'

import {BsCloudHazeFill, BsCloudDrizzleFill, BsEye, BsWater, BsThermometer, BsWind, BsCloudHaze2Fill} from 'react-icons/bs'
import { TbTemperatureCelsius } from 'react-icons/tb';
import { ImSpinner8 } from 'react-icons/im';

// api key
const APIkey = 'fc62695859357c2753c81031c6bc2ca5'

const Weather = () => {
    const [data, setData] = useState(null)
    const [location, setLocation] = useState('Savar')

    // fetch the data
    useEffect(()=>{
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${APIkey}`

        axios.get(url).then(res => {
            setData(res.data)
        })
    }, [location])

    //if data is false show the loader
    if(!data){
        return(
            <div>
                <div>
                    <ImSpinner8 className='text-5xl animate-spin'></ImSpinner8>
                </div>
            </div>
        )

    }

    // set the icon according to the weather
    let icon;
    console.log(data.weather[0].main)
    switch(data.weather[0].main){
        case 'Clouds':
            icon = <IoMdCloudy/>
            break;

        case 'Haze':
            icon = <BsCloudHaze2Fill/>
            break;

        case 'Rain':
            icon = <IoMdRainy/>
            break;

        case 'Clear':
            icon = <IoMdSunny/>
            break;

        case 'Drizzle':
            icon = <BsCloudDrizzleFill/>
            break;

        case 'Snow':
            icon = <IoMdSnow/>
            break;

        case 'Thunderstrom':
            icon = <IoMdThunderstorm/>
            break;
    }

    // date object
    const date = new Date()
    




    return (
        <Fragment>
            <div className='w-full h-screen bg-gradientBg bg-no-repeat bg-cover bg-center flex flex-col items-center justify-center px-4 lg:px-0'>
            {/* form */}
                <form>form</form>
            {/* card */}
                <div className='w-full bg-black/20 max-w-[450px] min-h-[584px] text-white backdrop-blur-[32px] rounded-[32px] py-12 px-6'>
                    <div>
                      {/* card top */}
                        <div className='flex items-center gap-x-5'>
                            {/* icon */}
                            <div className='text-[87px]'>
                                {icon}
                            </div>
                            <div>
                                {/* country name */}
                                <div className='text-2xl font-semibold'>
                                    {data.name}, {data.sys.country}
                                </div>
                                {/*Date*/}
                                <div>
                                    {date.getUTCDate()}/{date.getUTCMonth() + 1}/{date.getUTCFullYear()}
                                </div>
                            </div>
                        </div>


                      {/* card body */}
                      <div className='my-20'>
                        <div className='flex justify-center items-center'>
                            {/* temp */}
                            <div className='text-[144px] leading-none font-light'>
                                {parseInt(data.main.temp)}
                            </div>
                            {/* celsius */}
                            <div className='text-4xl'>
                                <TbTemperatureCelsius></TbTemperatureCelsius>
                            </div>
                        </div>
                        {/* weather description */}
                        <div className='capitalize text-center'>
                            {data.weather[0].description}
                        </div>
                        
                      </div>
                      {/* card bottom */}
                      <div>
                        <div className='flex items-center gap-x-2'>
                            {/* icon */}
                            <div className='text-[20px]'>
                                <BsEye></BsEye>
                            </div>
                            <div>
                                Visibility <span className='ml-2'>{data.visibility / 1000} km</span>
                            </div>
                        </div>
                      </div>
                    </div>
                </div>
            </div>
        </Fragment>
       
    );
};

export default Weather;