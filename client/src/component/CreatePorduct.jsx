import { useState } from "react";
import { FileInput, Label, TextInput, Button } from "flowbite-react";

const CreateProduct = () => {
    const API_BASE_URL = import.meta.env.VITE_API_URL

    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [inputForm, setInputForm] = useState({
        title: "",
        description: "",
        price: "",
    });

    const handleInputForm = (e) => {
        setInputForm({ ...inputForm, [e.target.id]: e.target.value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", image);
        formData.append("title", inputForm.title);
        formData.append("description", inputForm.description);
        formData.append("price", inputForm.price);

        try {
            const response = await fetch(`${API_BASE_URL}/api/products/createproduct`, {
                method: "POST",
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                setInputForm({ title: "", description: "", price: "" });
                setImage(null);
                setImagePreview(null);
                alert("Product added successfully!");
            } else {
                console.error("Error creating product:", data);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="p-6 max-w-4xl mx-auto bg-slate-300 rounded-lg shadow-md my-16">
            <h2 className="text-xl font-semibold mb-4">Upload Product</h2>

            <div className="mb-4 border border-gray-300 rounded-lg overflow-hidden">
                <label className="block w-full h-40 flex items-center justify-center bg-gray-100 cursor-pointer">
                    {imagePreview ? (
                        <img src={imagePreview} alt="" className="w-full h-full object-cover" />
                    ) : (
                        <span className="text-gray-500 text-lg"> Click to upload image</span>
                    )}
                    <FileInput id="image" className="hidden" onChange={handleImageChange} />
                </label>
            </div>

            <form className="grid grid-cols-1 md:grid-cols-3 gap-4" onSubmit={handleSubmit}>
                <div>
                    <Label value="Title" />
                    <TextInput id="title" type="text" placeholder="Title" value={inputForm.title} required onChange={handleInputForm} />
                </div>

                <div>
                    <Label value="Description" />
                    <TextInput id="description" type="text" placeholder="Description" value={inputForm.description} required onChange={handleInputForm} />
                </div>

                <div>
                    <Label value="Price" />
                    <TextInput id="price" type="number" placeholder="Price" value={inputForm.price} required onChange={handleInputForm} />
                </div>

                <Button type="submit" className="w-full my-5">Add Product</Button>
            </form>
        </div>
    );
};

export default CreateProduct;
