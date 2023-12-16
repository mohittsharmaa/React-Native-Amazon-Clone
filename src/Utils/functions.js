export const fetchProducts = async () => {
  try {
    const res = await fetch('https://dummyjson.com/products?limit=10');
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const fetchCategoryProducts = async category => {
  try {
    const res = await fetch(
      `https://dummyjson.com/products/category/${category}?limit=10`,
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching category products:', error);
    throw error;
  }
};

export const capitalizeFirstLetter = function (string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
