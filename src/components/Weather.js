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
    const [inputValue, setInputValue] = useState('')
    const [animate, setAnimate] = useState(false)
    const [loading, setLoading] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')

    const handleInput = (e)=>{
        setInputValue(e.target.value)
    }

    const handleSubmit = (e) =>{
        // if input values is not empty
        if (inputValue !== ''){
            // set location
            setLocation(inputValue)
        }
        

        
        //  select input
        const input = document.querySelector('input')

        // if input value is empty
        if (input.value === ''){
            // set animate to true
            setAnimate(true)

            setTimeout(()=>{
                setAnimate(false)
            },500)

        }

        // clear input
        input.value = ''

        e.preventDefault()
    }
    


    

    // fetch the data
    useEffect(()=>{
        setLoading(true)
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${APIkey}`

        axios.get(url).then(res => {
            // set the data after 1500ms

            setTimeout(()=>{
                setData(res.data)
                // set loading to false
                setLoading(false)
            }, 1500)
           
        }).catch(err=>{
            setLoading(false)
            setErrorMsg(err)
        })
    }, [location])

    // err massage
    useEffect(()=>{
        const timer = setTimeout(() => {
            setErrorMsg('')
            
        }, 2000);
        // clear timer
        return ()=>clearTimeout(timer)

    }, [errorMsg])

    //if data is false show the loader
    if(!data){
        return(
            <div className='w-full h-screen bg-gradientBg bg-no-repeat bg-cover bg-center flex flex-col justify-center items-center'>
                <div>
                    <ImSpinner8 className='text-5xl animate-spin text-white'></ImSpinner8>
                </div>
            </div>
        )

    }

    // set the icon according to the weather
    let icon;
    
    switch(data.weather[0].main){
        case 'Clouds':
            icon = <IoMdCloudy/>
            break;

        case 'Haze':
            icon = <BsCloudHaze2Fill/>
            break;

        case 'Rain':
            icon = <IoMdRainy className='text-[#31cafb]'/>
            break;

        case 'Clear':
            icon = <IoMdSunny className='text-[#ffde33]'/>
            break;

        case 'Drizzle':
            icon = <BsCloudDrizzleFill className='text-[#31cafb]'/>
            break;

        case 'Snow':
            icon = <IoMdSnow className='text-[#31cafb]'/>
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
            {errorMsg && <div className='w-full max-w-[90vw] lg:max-w-[450px] bg-[#ff208c] text-white absolute top-2 lg:top-2 p-4 capitalize rounded-md'>{`${errorMsg.response.data.message}`}</div>}
            {/* form */}
                <form className={`${animate ? 'animate-shake': 'animate-none'} h-16 bg-black/30 w-full max-w-[450px] rounded-full backdrop-blur-[32px] mb-8`}>
                    <div className='h-full relative flex items-center justify-between p-2'>
                        <input onChange={(e)=>handleInput(e)} type="text" className='flex-1 bg-transparent outline-none placeholder:text-white text-white text-[15px] font-light pl-6 h-full' placeholder='search by city or country'/>
                        <button onClick={(e)=> handleSubmit(e)} className='bg-[#1ab8eb] hover:bg-[#15abdd] w-20 h-12 flex rounded-full felx justify-center items-center transition'>
                            <IoMdSearch className='text-2xl text-white'/>
                        </button>
                    </div>
                </form>
            {/* card */}
                <div className='w-full bg-black/20 max-w-[450px] min-h-[584px] text-white backdrop-blur-[32px] rounded-[32px] py-12 px-6'>
                    {loading ? (<div className='w-full h-full flex justify-center items-center'>
                        <ImSpinner8 className='text-white text-5xl animate-spin'/>
                    </div> 

                    ) : (
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
                        <div className='max-w-[378px] max-auto flex flex-col gap-y-6'>
                            <div className='flex justify-between'>
                                <div className='flex items-center gap-x-2'>
                                    {/* icon */}
                                    <div className='text-[20px]'>
                                        <BsEye></BsEye>
                                    </div>
                                    <div>
                                        Visibility <span className='ml-2'>{data.visibility / 1000} km</span>
                                    </div>
                                </div>

                                <div className='flex items-center gap-x-2'>
                                    {/* icon */}
                                    <div className='text-[20px]'>
                                        <BsThermometer></BsThermometer>
                                    </div>
                                    <div className='flex'>
                                        Feels like
                                        <div className='flex ml-2'>
                                            {parseInt(data.main.feels_like)}
                                            <TbTemperatureCelsius></TbTemperatureCelsius>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='flex justify-between'>
                                <div className='flex items-center gap-x-2'>
                                    {/* icon */}
                                    <div className='text-[20px]'>
                                        <BsWater></BsWater>
                                    </div>
                                    <div>
                                        Humidity<span className='ml-2'>{data.main.humidity} %</span>
                                    </div>
                                </div>

                                <div className='flex items-center gap-x-2'>
                                    {/* icon */}
                                    <div className='text-[20px]'>
                                        <BsWind></BsWind>
                                    </div>
                                    <div className='ml-2'>
                                       Wind <span>{data.wind.speed} m/s</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    )}
                </div>
            </div>
        </Fragment>
       
    );
};

export default Weather;