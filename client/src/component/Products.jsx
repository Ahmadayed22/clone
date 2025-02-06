import { Button, Card } from "flowbite-react";
import PropTypes from "prop-types";

const Products = ({ title, image, description, price }) => {
    // console.log(`../../../server/public${image}`);
    const API_BASE_URL = import.meta.env.VITE_API_URL
    console.log(API_BASE_URL)
    return (
        <div className="mt-4">
            <div className="cursor-pointer group relative gap-4">
                <Card
                    className="max-w-sm max-h-[600px] overflow-hidden"
                    renderImage={() => (
                        <img
                            width={500}
                            height={500}
                            src={`https://clone-phi-green.vercel.app${image}`}
                            alt={title}
                            className="max-h-[350px]"
                            style={{ objectFit: 'cover' }}
                        />
                    )}
                >
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {title}
                    </h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                        {description}
                    </p>
                    <p className="font-normal text-gray-700 dark:text-gray-400 text-xl">
                        {`${price}$`}
                    </p>
                </Card>

                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="text-white text-center">
                        <Button color="gray" className="w-full px-8 py-2 text-xl">
                            Add to Cart
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

Products.propTypes = {
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
};

export default Products;
