import React, { useState } from "react";

const Recipes = () => {
  const [recipes] = useState([
    {
      id: 1,
      name: "Classic Coffee",
      category: "Coffee",
      ingredients: [
        { name: "Coffee powder", quantityPerUnit: "1 tsp" },
        { name: "Milk", quantityPerUnit: "1 cup" },
        { name: "Sugar", quantityPerUnit: "2 tsp" },
      ],
      steps: [
        "Boil water.",
        "Add coffee powder.",
        "Mix milk and sugar as desired.",
        "Serve hot.",
      ],
      estimatedTime: "5 minutes",
    },
    {
      id: 2,
      name: "Cappuccino",
      category: "Coffee",
      ingredients: [
        { name: "Espresso", quantityPerUnit: "1 shot" },
        { name: "Milk", quantityPerUnit: "1 cup" },
        { name: "Foam", quantityPerUnit: "1/4 cup" },
      ],
      steps: [
        "Prepare espresso.",
        "Steam and froth milk.",
        "Combine espresso and milk.",
        "Top with foam.",
      ],
      estimatedTime: "7 minutes",
    },
    {
      id: 3,
      name: "Cold Brew Coffee",
      category: "Coffee",
      ingredients: [
        { name: "Coffee grounds", quantityPerUnit: "2 tbsp" },
        { name: "Cold water", quantityPerUnit: "2 cups" },
        { name: "Ice", quantityPerUnit: "1 cup" },
      ],
      steps: [
        "Mix coffee grounds with cold water.",
        "Let it steep for 12 hours.",
        "Strain and serve over ice.",
      ],
      estimatedTime: "12 hours",
    },
    {
      id: 4,
      name: "Masala Tea",
      category: "Tea",
      ingredients: [
        { name: "Tea leaves", quantityPerUnit: "2 tsp" },
        { name: "Milk", quantityPerUnit: "1 cup" },
        { name: "Spices", quantityPerUnit: "1 tsp" },
      ],
      steps: [
        "Boil water with spices.",
        "Add tea leaves and let it brew.",
        "Mix in milk and sugar.",
        "Serve hot.",
      ],
      estimatedTime: "7 minutes",
    },
    {
      id: 5,
      name: "Green Tea",
      category: "Tea",
      ingredients: [
        { name: "Green tea leaves", quantityPerUnit: "1 tsp" },
        { name: "Hot water", quantityPerUnit: "1 cup" },
      ],
      steps: [
        "Boil water and let it cool slightly.",
        "Steep green tea leaves for 3 minutes.",
        "Serve warm.",
      ],
      estimatedTime: "5 minutes",
    },
    {
      id: 6,
      name: "Iced Lemon Tea",
      category: "Tea",
      ingredients: [
        { name: "Tea leaves", quantityPerUnit: "2 tsp" },
        { name: "Lemon juice", quantityPerUnit: "1 tbsp" },
        { name: "Sugar", quantityPerUnit: "1 tbsp" },
      ],
      steps: [
        "Brew tea leaves and cool the tea.",
        "Add lemon juice and sugar.",
        "Serve over ice.",
      ],
      estimatedTime: "10 minutes",
    },
    {
      id: 7,
      name: "Butter Cookies",
      category: "Snacks",
      ingredients: [
        { name: "Flour", quantityPerUnit: "1 cup" },
        { name: "Butter", quantityPerUnit: "0.5 cup" },
        { name: "Sugar", quantityPerUnit: "0.25 cup" },
      ],
      steps: [
        "Mix butter and sugar until creamy.",
        "Add flour and form dough.",
        "Shape into cookies and bake at 180°C for 15 minutes.",
        "Cool and serve.",
      ],
      estimatedTime: "20 minutes",
    },
    {
      id: 8,
      name: "Veg Sandwich",
      category: "Snacks",
      ingredients: [
        { name: "Bread", quantityPerUnit: "2 slices" },
        { name: "Vegetables", quantityPerUnit: "1 cup" },
        { name: "Butter", quantityPerUnit: "1 tbsp" },
      ],
      steps: [
        "Spread butter on bread slices.",
        "Add sliced vegetables and season with salt and pepper.",
        "Toast the sandwich until golden brown.",
        "Serve warm.",
      ],
      estimatedTime: "10 minutes",
    },
    {
      id: 9,
      name: "Paneer Tikka Sandwich",
      category: "Snacks",
      ingredients: [
        { name: "Bread", quantityPerUnit: "2 slices" },
        { name: "Paneer", quantityPerUnit: "50 g" },
        { name: "Spices", quantityPerUnit: "1 tsp" },
      ],
      steps: [
        "Grill marinated paneer cubes.",
        "Spread butter on bread and add grilled paneer.",
        "Toast the sandwich.",
        "Serve with chutney.",
      ],
      estimatedTime: "15 minutes",
    },
  ]);

  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filteredRecipes = recipes.filter(
    (recipe) =>
      recipe.name.toLowerCase().includes(search.toLowerCase()) &&
      (filter === "All" || recipe.category === filter)
  );

  const calculateIngredients = () => {
    if (!selectedRecipe) return [];
    return selectedRecipe.ingredients.map((ingredient) => {
      const [amount, unit] = ingredient.quantityPerUnit.split(" ");
      const calculatedAmount = parseFloat(amount) * quantity || amount;
      return {
        name: ingredient.name,
        calculatedQuantity: `${calculatedAmount} ${unit}`,
      };
    });
  };

  return (
    <div className="min-h-screen px-6 py-4 bg-gradient-to-b from-gray-100 to-gray-200">
      <h1 className="text-4xl font-bold text-gray-900 text-center mb-8">
        Recipes
      </h1>

      {/* Search and Filter */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search recipes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="All">All</option>
          <option value="Coffee">Coffee</option>
          <option value="Tea">Tea</option>
          <option value="Snacks">Snacks</option>
        </select>
      </div>

      {/* Recipe Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRecipes.map((recipe) => (
          <div
            key={recipe.id}
            onClick={() => setSelectedRecipe(recipe)}
            className="bg-white shadow-lg rounded-lg p-6 cursor-pointer hover:shadow-2xl transform hover:-translate-y-1 transition duration-300"
          >
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              {recipe.name}
            </h2>
            <p className="text-gray-600">Category: {recipe.category}</p>
            <p className="text-gray-600">Estimated Time: {recipe.estimatedTime}</p>
          </div>
        ))}
      </div>

      {/* Recipe Modal */}
      {selectedRecipe && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setSelectedRecipe(null)}
        >
          <div
            className="bg-white shadow-xl rounded-xl p-8 w-full max-w-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {selectedRecipe.name}
            </h2>
            <p className="text-lg font-medium text-gray-700">
              Category: {selectedRecipe.category}
            </p>
            <p className="text-gray-600 mb-4">
              Estimated Time: {selectedRecipe.estimatedTime}
            </p>

                       {/* Ingredient Calculator */}
                       <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Ingredient Calculator
              </h3>
              <div className="flex items-center gap-4">
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(Math.max(1, Number(e.target.value)))
                  }
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={() => setQuantity(1)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600"
                >
                  Reset
                </button>
              </div>
              <ul className="list-disc pl-6 mt-4">
                {calculateIngredients().map((ingredient, index) => (
                  <li key={index} className="text-gray-700">
                    {ingredient.name}:{" "}
                    <span className="font-semibold">
                      {ingredient.calculatedQuantity}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Preparation Method
              </h3>
              <ol className="list-decimal pl-6 space-y-2">
                {selectedRecipe.steps.map((step, index) => (
                  <li key={index} className="text-gray-700">
                    {step}
                  </li>
                ))}
              </ol>
            </div>

            <button
              onClick={() => setSelectedRecipe(null)}
              className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Recipes;
