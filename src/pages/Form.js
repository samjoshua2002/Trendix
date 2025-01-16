import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../App";
import { Star } from "react-feather"; 
import { Package } from 'react-feather';


function Form() {
  const [formData, setFormData] = useState({
    title: "",
    brand: "",
    category: "Men",
    description: "",
    discountedPrice: "",
    originalPrice: "",
    rating: "",
    imageUrl: "",
    sizes: ["Medium", "Small", "Large"],
    type: "topwear",
  });

  const brands = [
    "Nike", "Adidas", "Puma", "Reebok", "Under Armour", "New Balance", "Asics", "Converse", "Vans", "Fila",
    "Champion", "Jordan", "Skechers", "Saucony", "Brooks", "Timberland", "Ugg", "Dr. Martens", "Crocs", "The North Face",
    "Columbia", "Patagonia", "L.L. Bean", "Mountain Hardwear", "Arc'teryx", "Moncler", "Canada Goose", "Carhartt", "Dickies", "Levi's",
    "Wrangler", "Lee", "Calvin Klein", "Tommy Hilfiger", "Guess", "Diesel", "True Religion", "Lucky Brand", "Ralph Lauren", "Hugo Boss",
    "Vince", "Michael Kors", "Kate Spade", "Coach", "Tory Burch", "Chanel", "Louis Vuitton", "Gucci", "Prada", "Burberry",
    "Versace", "Balenciaga", "Saint Laurent", "Fendi", "Dior", "Valentino", "Givenchy", "Celine", "Chloe", "Hermes",
    "Miu Miu", "BOSS", "Kenzo", "Alexander McQueen", "Marc Jacobs", "Tom Ford", "Acne Studios", "J.Crew", "Banana Republic", "Gap",
    "Old Navy", "Uniqlo", "H&M", "Zara", "Mango", "Topshop", "ASOS", "Bershka", "Stradivarius", "Pull & Bear",
    "Massimo Dutti", "Boden", "Everlane", "Lulus", "Revolve", "Free People", "Anthropologie", "Urban Outfitters", "American Eagle", "Aeropostale",
    "Abercrombie & Fitch", "Hollister", "PacSun", "Express", "Saks Fifth Avenue", "Nordstrom", "Neiman Marcus", "Bloomingdale's", "Barneys New York", "Macy's",
    "Kohl's", "TJ Maxx", "Marshalls", "Ross Stores", "Jockey", "Hanes", "Fruit of the Loom", "BVD", "American Apparel", "Aerie",
    "Victoria's Secret", "Savage X Fenty", "Lingerie by La Perla", "Fenty Beauty", "Alo Yoga", "Lululemon", "Athleta", "Sweaty Betty", "Gymshark", "Outdoor Voices",
    "Fabletics", "Under Armour Women", "Nike Training", "Puma", "Reebok", "Vans", "Converse", "Crocs", "Skechers", "Dr. Martens",
    "Nike Kids", "Adidas Kids", "Puma Kids", "Reebok Kids", "New Balance Kids", "Skechers Kids", "Converse Kids", "Vans Kids", "H&M Kids", "Zara Kids",
    "Peter England", "Van Heusen", "Allen Solly", "Arrow", "Louis Philippe", "FabIndia", "Biba", "W", "Pantaloons", "Shoppers Stop",
    "Lifestyle", "Central", "Reliance Trends", "Westside", "Max Fashion", "Jabong", "Myntra", "Ajio", "Limeroad", "Indigo Nation",
    "Hush Puppies", "Red Tape", "Mochi", "Liberty", "Woodland", "Bata", "Khadim's", "Metro", "Shoe Rack", "Puma India",
    "Adidas India", "Nike India", "Reebok India", "Vans India", "Converse India", "Lee Cooper", "Spykar", "Wrangler India", "Levi's India", "Jack & Jones",
    "Only", "Vero Moda", "Tommy Hilfiger India", "Pepe Jeans", "Gant", "S.Oliver", "H&M India", "Zara India", "Uniqlo India", "Marks & Spencer India"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImagePreview = (e) => {
    setFormData({ ...formData, imageUrl: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Submitted: ", formData);

    try {
      const response = await axios.post(`${BASE_URL}/product/add`, formData);

      if (response.status === 200) {
        alert("Product added successfully!");
        console.log(formData);
      }
    } catch (error) {
      console.error("There was an error:", error);
      alert("Failed to add product.");
    }
  };

  const clearForm = () => {
    setFormData({
      title: "",
      brand: "",
      category: "Men", // Reset to default category
      description: "",
      discountedprice: "",
      originalPrice: "",
      rating: "",
      imageUrl: "",
      sizes: ["Medium", "Small", "Large"],
      type: "topwear",
    });
  };

  const calculateDiscount = () => {
    if (formData.originalPrice && formData.discountedPrice) {
      return Math.round(
        ((formData.originalPrice - formData.discountedPrice) / formData.originalPrice) * 100
      );
    }
    return 0;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-violet-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <Package className="mx-auto h-12 w-12 text-blue-600" />
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900">
            Product Management
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Add and manage your products with live preview
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className=" bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-xl p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Title */}
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Enter product title"
                    required
                  />
                </div>

                {/* Brand */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Brand</label>
                  <input
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Enter brand name"
                    list="brand-suggestions"
                  />
                  <datalist id="brand-suggestions">
                    {brands.map((brand) => (
                      <option key={brand} value={brand} />
                    ))}
                  </datalist>
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="Men">Men</option>
                    <option value="Women">Women</option>
                  </select>
                </div>

                {/* Description */}
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Enter product description"
                  />
                </div>

                {/* Prices */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Original Price</label>
                  <input
                    type="number"
                    name="originalPrice"
                    value={formData.originalPrice}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Discounted Price</label>
                  <input
                    type="number"
                    name="discountedPrice"
                    value={formData.discountedPrice}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="0.00"
                  />
                </div>

                {/* Rating */}
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                  <div className="flex space-x-4">
                    {[1, 2, 3, 4, 5].map((rate) => (
                      <label key={rate} className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="rating"
                          value={rate}
                          checked={formData.rating === String(rate)}
                          onChange={handleChange}
                          className="sr-only"
                        />
                        <Star
                          className={`h-8 w-8 ${
                            formData.rating >= String(rate)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      </label>
                    ))}
                  </div>
                </div>

                {/* Image URL */}
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Image URL</label>
                  <input
                    type="text"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleImagePreview}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Enter image URL"
                  />
                </div>

                {/* Type */}
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                  <div className="flex space-x-4">
                    {["topwear", "bottomwear", "footwear"].map((type) => (
                      <label key={type} className="inline-flex items-center">
                        <input
                          type="radio"
                          name="type"
                          value={type}
                          checked={formData.type === type}
                          onChange={handleChange}
                          className="form-radio h-4 w-4 text-blue-600"
                        />
                        <span className="ml-2 capitalize">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex space-x-4 justify-end pt-4">
                <button
                  type="button"
                  onClick={clearForm}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Clear Form
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#E23378] hover:bg-[#a32256] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#811a43]"
                >
                  Add Product
                </button>
              </div>
            </form>
          </div>

          {/* Live Preview Section */}
          <div className=" bg-gradient-to-br from-white to-blue-50 rounded-xl shadow-xl p-6">
  <h2 className="text-xl font-semibold text-gray-900">Live Preview</h2>
  <div className="mt-4 grid grid-cols-1 gap-4">
    {formData.imageUrl ? (
      <img
        src={formData.imageUrl}
        alt="Product Preview"
        className="w-full h-80 object-cover  rounded-md"
      />
    ) : (
      <div className="w-full h-80 bg-gray-200 rounded-md flex items-center justify-center text-gray-500">
        No Image Available
      </div>
    )}
    
    {/* Title */}
    <div className="text-lg font-bold">
      {formData.title || "Product Title Not Available"}
    </div>

   {/* Men and Category as badges in grid */}
<div className="flex gap-5">
    <div>
    <span className="px-3 py-1 text-sm font-semibold text-red-500 bg-red-100 rounded-full">
    {formData.brand || "Brand"}
  </span>

    </div>
    <div>
    <span className="px-3 py-1 text-sm font-semibold text-red-500 bg-red-100 rounded-full">
    {formData.category || "Category Not Available"}
  </span>

    </div>

 
</div>


    {/* Description */}
    <div className="text-sm text-gray-600">
      {formData.description || "Description Not Available"}
    </div>
    <div className="flex gap-2 text-center items-center">

    {/* Price */}
    <div className="text-lg font-semibold">
      ₹{formData.discountedPrice|| formData.originalPrice || "N/A"}
      {formData.discountedPrice && (
        <span className="text-sm text-gray-500 line-through ml-2">
          ₹{formData.originalPrice}
        </span>
      )}
    </div>
    {/* Discount */}
  {formData.discountedPrice && (
    <div className="text-sm text-red-600">
      {calculateDiscount()}% Off
    </div>
  )}
</div>
    {/* Rating */}
    <div className="flex items-center space-x-2">
      {formData.rating ? (
        <div className="text-yellow-400">
          {Array.from({ length: formData.rating }, (_, i) => (
            <Star key={i} className="h-5 w-5 inline" />
          ))}
        </div>
      ) : (
        <div className="text-gray-400">No Rating</div>
      )}
    </div>

    {/* Type Display */}
    <div className="text-sm flex text-gray-500 ">
        <div className="px-3 py-1 text-sm font-semibold text-red-500 bg-red-100 rounded-full">
        {formData.type || "Type Not Available"}

        </div>
      
    </div>
  </div>

  
</div>

        </div>
      </div>
    </div>
  );
}

export default Form;
