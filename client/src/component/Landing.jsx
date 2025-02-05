import Home2 from '../assets/Home.jpg';
import { Button } from 'flowbite-react';
const Landing = () => {
    return (
        <div className='relative '>
            <img src={Home2} alt="" className='sm:w-full min-h-screen bg-cover' />
            <div className='w-1/2 absolute top-1/3 sm:top-1/2  right-6 bg-orange-400 mx-auto '>
                <div className='p-8 my-4  max-w-sm  flex flex-col gap-4'>
                    <h4>New Arrival</h4>
                    <h1 className='sm:text-4xl text-yellow-300'>Discouver our <br /> New Collection</h1>
                    <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo ex non </span>
                    <Button className='bg-black rounded w-fit sm:w-[220px] p-4'>BUY NOW</Button>
                </div>
            </div>
        </div>
    )
}

export default Landing