import { Button } from "flowbite-react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Dining from "../assets/Dining.png";
import Bedroom from "../assets/Bedroom.png";
import Living from "../assets/Living.png";

const Section3 = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    return (
        <div className="bg-orange-300 my-4 p-4 h-auto">
            <div className="container mx-auto flex flex-col sm:flex-row items-center justify-around">
                {/* Text Content */}
                <div className="p-4 max-w-md flex flex-col gap-4 items-center justify-center text-center sm:text-left">
                    <h1 className="text-3xl font-bold text-center">50+ Beautiful rooms <br /> inspiration</h1>
                    <span className="text-gray-700 text-center">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur blanditiis ex eum vel cupiditate eos.
                    </span>
                    <Button className="max-w-fit px-4 mt-4 flex ">Check Room</Button>
                </div>

                {/* Slider */}
                <div className="flex-1 max-w-xs sm:max-w-md lg:max-w-lg xl:max-w-xl">
                    <div className="h-30 sm:h-45 md:h-70 ">
                        <Slider {...settings} className="w-full h-full flex items-center justify-center ">
                            <div className="px-2">
                                <img src={Living} className="w-full h-full object-cover" alt="Living Room" />
                            </div>
                            <div className="px-2">
                                <img src={Dining} className="w-full h-full object-cover" alt="Dining Room" />
                            </div>
                            <div className="px-2">
                                <img src={Bedroom} className="w-full h-full object-cover" alt="Bedroom" />
                            </div>
                        </Slider>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Section3;
