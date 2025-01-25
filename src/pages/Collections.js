import React, { useState, useMemo, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { SlidersHorizontal } from 'lucide-react';
import { FaSpinner, FaExclamationTriangle, FaHeartBroken } from 'react-icons/fa';
import { AppContext } from '../App';
import SmallCard from './SmallCard';

function Collection() {
  const { allproducts } = useContext(AppContext);
  const [products] = useState(allproducts);
  const [selectedFilters, setSelectedFilters] = useState({
    category: [],
    type: [],
  });
  const [sortOption, setSortOption] = useState('relevant');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [loading] = useState(false);
  const [error] = useState(null);

  const navigate = useNavigate();

  const handleFilterChange = (filterType, value) => {
    setSelectedFilters((prevState) => {
      const isChecked = prevState[filterType].includes(value);
      return {
        ...prevState,
        [filterType]: isChecked
          ? prevState[filterType].filter((item) => item !== value)
          : [...prevState[filterType], value],
      };
    });
  };

  const clearFilters = () => {
    setSelectedFilters({
      category: [],
      type: [],
    });
  };

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products;

    if (selectedFilters.category.length > 0) {
      filtered = filtered.filter((product) =>
        selectedFilters.category.some((selected) => selected === product.category)
      );
    }

    if (selectedFilters.type.length > 0) {
      filtered = filtered.filter((product) =>
        selectedFilters.type.some((selected) => selected === product.type)
      );
    }

    if (sortOption === 'low-high') {
      filtered = [...filtered].sort((a, b) => {
        const priceA = a.discountedPrice > 0 ? a.discountedPrice : a.originalPrice;
        const priceB = b.discountedPrice > 0 ? b.discountedPrice : b.originalPrice;
        return priceA - priceB;
      });
    } else if (sortOption === 'high-low') {
      filtered = [...filtered].sort((a, b) => {
        const priceA = a.discountedPrice > 0 ? a.discountedPrice : a.originalPrice;
        const priceB = b.discountedPrice > 0 ? b.discountedPrice : b.originalPrice;
        return priceB - priceA;
      });
    }

    return filtered;
  }, [products, selectedFilters, sortOption]);

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const filterData = [
    {
      title: 'Category',
      options: ['Men', 'Women', 'Kids'],
      filterKey: 'category',
    },
    {
      title: 'Type',
      options: ['Topwear', 'Bottomwear', 'Shoes'],
      filterKey: 'type',
    },
  ];

  const handleProductSelect = (product) => {
    navigate(`/displaycard/${product.id}`);
  };

  const activeFiltersCount = Object.values(selectedFilters).flat().length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Banner */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-full mx-auto px-4 sm:px-6 pt-24 sm:pt-20">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-gray-900">All Collections</h1>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setShowMobileFilters(true)}
                className="sm:hidden inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
              </button>
              <select
                className="border border-gray-300 rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={sortOption}
                onChange={handleSortChange}
              >
                <option value="relevant">Sort by: Relevant</option>
                <option value="low-high">Price: Low to High</option>
                <option value="high-low">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filter Bar */}
          {showMobileFilters && (
            <div className="sm:hidden w-full bg-white p-4 shadow-md rounded-md mb-4">
              {filterData.map((filter, index) => (
                <div key={index} className="mb-6">
                  <h3 className="text-sm font-medium text-gray-900 mb-3">{filter.title}</h3>
                  <div className="space-y-3">
                    {filter.options.map((option, idx) => (
                      <label key={idx} className="flex items-center">
                        <input
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          value={option}
                          onChange={() => handleFilterChange(filter.filterKey, option)}
                          checked={selectedFilters[filter.filterKey].includes(option)}
                        />
                        <span className="ml-3 text-sm text-gray-600">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
              {activeFiltersCount > 0 && (
                <button
                  onClick={clearFilters}
                  className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
                >
                  Clear all filters
                </button>
              )}
              <button
                onClick={() => setShowMobileFilters(false)}
                className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md mt-4"
              >
                Close Filters
              </button>
            </div>
          )}

          {/* Product Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {loading ? (
                <div className="flex flex-col items-center text-center">
                  <FaSpinner className="animate-spin text-gray-400 w-16 h-16 mt-56" />
                  <p className="text-gray-500 text-lg">Loading products...</p>
                </div>
              ) : error ? (
                <div className="flex flex-col items-center text-center">
                  <FaExclamationTriangle className="text-red-500 w-16 h-16 mt-56" />
                  <p className="text-red-500 text-lg">{error}</p>
                </div>
              ) : filteredAndSortedProducts.length > 0 ? (
                filteredAndSortedProducts.map((product) => (
                  <SmallCard
                    key={product.id}
                    products={[product]}
                    handleProductSelect={handleProductSelect}
                  />
                ))
              ) : (
                <div className="flex items-center justify-center text-center mt-52">
                  <FaHeartBroken className="text-gray-400 w-16 h-16 mb-4" />
                  <p className="text-gray-500 text-lg">No products found.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Collection;
