const API_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const searchInput = document.getElementById('search');
const searchButton = document.getElementById('searchBtn');
const resultsContainer = document.getElementById('results');

// Event listener for the search button
searchButton.addEventListener('click', () => {
  const query = searchInput.value.trim();
  if (query) {
    fetchRecipes(query);
  }
});

// Function to fetch recipes from TheMealDB API
async function fetchRecipes(query) {
  resultsContainer.innerHTML = '<p>Loading...</p>'; // Show loading message
  try {
    const res = await fetch(`${API_URL}${encodeURIComponent(query)}`);
    const data = await res.json();

    if (data.meals) {
      displayRecipes(data.meals);
    } else {
      resultsContainer.innerHTML = '<p>No recipes found. Try another search!</p>';
    }
  } catch (error) {
    console.error('Error fetching recipes:', error);
    resultsContainer.innerHTML = '<p>Something went wrong. Please try again later.</p>';
  }
}

// Function to display recipes in cards
function displayRecipes(meals) {
  resultsContainer.innerHTML = ''; // Clear the results container

  meals.forEach(meal => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
      <div class="card-body">
        <h3>${meal.strMeal}</h3>
        <p><strong>Category:</strong> ${meal.strCategory}</p>
        <span><strong>Area:</strong> ${meal.strArea || 'Unknown'}</span>
      </div>
    `;

    // Add event listener to open recipe details when clicked
    card.addEventListener('click', () => {
      window.open(meal.strSource || `https://www.themealdb.com/meal/${meal.idMeal}`, '_blank');
    });

    resultsContainer.appendChild(card);
  });

  // Scroll to the results section after loading
  resultsContainer.scrollIntoView({ behavior: 'smooth' });
}
