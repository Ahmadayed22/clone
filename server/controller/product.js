const Product = require('../modules/product'); 

// const CreateProduct = async (req, res) => {
//     try {
//         const { image, title, description, price } = req.body;

//         const product = new Product({
//             image,
//             title,
//             description,
//             price,
//         });

        
//         await product.save();

//         res.status(201).json({ product });
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// }


const CreateProduct = async (req, res) => {
    try {
        const { title, description, price } = req.body;
        let image = req.file ? `/uploads/${req.file.filename}` : undefined;

        const product = new Product({
            image: image || "https://antonovich-design.ae/uploads/page/2024/8/antonovich-design-20248EyR0mqntbiv.jpg", // Default image if none uploaded
            title,
            description,
            price,
        });

        await product.save();
        res.status(201).json({ product });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};



const getProduct = async (req, res) => {
    try {
        
        const { startIndex = 0, limit = 9, sort = 'desc' } = req.query;


        const skip = parseInt(startIndex, 10) || 0;
        const limitNum = parseInt(limit, 10) || 9;
        const sortDirection = sort === 'asc' ? 1 : -1;

        
        const products = await Product.find({})
            .skip(skip)
            .limit(limitNum)
            .sort({ createdAt: sortDirection });

        const totalProducts = await Product.countDocuments();

        
        res.status(200).json({
            products,
            totalProducts,
            startIndex: skip,
            totalPages: Math.ceil(totalProducts / limitNum),
        });
    } catch (error) {
        res.status(500).json({ error: `Failed to get products: ${error.message}` });
    }
};

const deleteProduct = async (req, res) => {
    if (!req.user.IsAdmin ) {
        res.status(400).json({error:`you are not allowed to delete this product`})
    }
    // console.log(req.params.userId)
    // console.log(req.params.productId)
    try {
        await Product.findByIdAndDelete(req.params.productId.slice(1));
        res.status(200).json("The product has been deleted")
    } catch (error) {
        res.status(400).json({error:`product Can't be deleted ${error}`})
    }
}

module.exports = {CreateProduct,getProduct,deleteProduct}