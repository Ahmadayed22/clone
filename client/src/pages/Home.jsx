import { useEffect, useState } from 'react';


import Products from '../component/Products';

import Range from '../component/Range';
import Dining from '../assets/Dining.png'
import Bedroom from '../assets/Bedroom.png'
import Living from '../assets/Living.png'
import Landing from '../component/Landing';
import Section3 from '../component/Section3';
import Section4 from '../component/Section4';

const Home = () => {
    const rooms = [
        { name: 'Dining', image: Dining },
        { name: 'Bedroom', image: Bedroom },
        { name: 'Living', image: Living },
    ];
    const [products, setProducts] = useState([]);
    // const [totalPages, setTotalPages] = useState(1);

    const [showMore, setShowMore] = useState(true);
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`/api/products/getproduct?limit=${6}&&sort=asc`);
                const data = await response.json();
                if (response.ok) {
                    setProducts(data.products);
                    // setTotalPages(data.totalPages);
                    console.log(data.products)
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchProduct();
    }, []);

    const handleShowMore = async () => {
        const startIndex = products.length;
        const limit = 6;

        try {
            const res = await fetch(`/api/products/getproduct?startIndex=${startIndex}&limit=${limit}&sort=asc`);
            const data = await res.json();

            if (res.ok) {
                setProducts((prevProducts) => [...prevProducts, ...data.products]);

                if (data.products.length < limit) {
                    setShowMore(false);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };



    return (
        <div className=''>
            {/* big photo Section */}
            <Landing />


            {/* Browse The Range Section */}
            <div className='mx-4 my-12 container mx-auto'>
                <div className='flex flex-col justify-center items-center'>
                    <h1 className='font-bold text-3xl'>Browse The Range</h1>
                    <span className='text-zinc-400 text-center'>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</span>
                </div>
                <div className='grid place-items-center grid-cols-1 md:grid-cols-3 my-12 rounded gap-4 '>
                    {rooms.map((room, i) => (
                        <Range key={i} {...room} />

                    ))}
                </div>


                {/*  Products Section */}
                <div className=''>
                    <div className='flex flex-col justify-center items-center'>
                        <h1 className='font-bold text-3xl'>Our Products</h1>
                    </div>

                    <div className='grid lg:place-items-center sm:grid-cols-2 md:grid-cols-3 gap-4 '>
                        {products.length > 0 ? (
                            products.map((product) => (
                                <Products key={product._id} {...product} />
                            ))
                        ) : (
                            <p className="text-center text-gray-500">No products available.</p>
                        )}
                    </div>

                    {showMore && (
                        <div className="flex justify-center mt-6">
                            <button
                                onClick={handleShowMore}
                                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                            >
                                Show More
                            </button>
                        </div>
                    )}

                </div>

            </div>
            {/* Section 3 */}
            <Section3 />
            {/* section 4 */}
            <Section4 />
        </div>
    );
};

export default Home;
