const mealsContainer = document.getElementById("meals-container");

const favMealContainer = document.getElementById("fav_meal-container");

async function getRandomMeal() {
  const resp = await fetch(
    "https://www.themealdb.com/api/json/v1/1/random.php"
  );

  const data = await resp.json();
  const randomMeal = data.meals[0];
  console.log(randomMeal);

  displayMeal(randomMeal);
}

async function getMealById(id) {
  const resp = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );

  const data = await resp.json();

  const mealById = data.meals[0];

  return mealById;
}

async function getMealBySearch(name) {
  const resp = await fetch(
    `www.themealdb.com/api/json/v1/1/search.php?s=${name}`
  );
}

function displayMeal(randomMeal) {
  const mealData = `
    <div class="meal-header">
          <span>Recipe of the day</span>
          <img
            src="${randomMeal.strMealThumb}"
            alt="${randomMeal.strMeal}"
          />
        </div>
        <div class="meal-description">
          <h5>${randomMeal.strMeal}</h5>
          <button class="fav-btn"><i class="fas fa-heart"></i></button>
        </div>
      </div>
    
    `;

  mealsContainer.insertAdjacentHTML("beforeend", mealData);

  const mealDescription = mealsContainer.querySelector(".meal-description");

  mealDescription.addEventListener("click", (e) => {
    const clicked = e.target.closest(".fav-btn");

    if (!clicked) return;

    if (clicked.classList.contains("active")) {
      clicked.classList.remove("active");
      removeMealFromLS(randomMeal.idMeal);
    } else {
      clicked.classList.add("active");
      addMealToLS(randomMeal.idMeal);
    }
    favMealContainer.innerHTML = "";
    fetchFavMeals();
  });
}

getRandomMeal();

function addMealToLS(mealId) {
  const mealIdArr = getMealFromLS();

  localStorage.setItem("mealIdArr", JSON.stringify([...mealIdArr, mealId]));
}

function getMealFromLS() {
  const storedMealId = JSON.parse(localStorage.getItem("mealIdArr"));

  return storedMealId === null ? [] : storedMealId;
}

function removeMealFromLS(mealId) {
  const storedMealId = getMealFromLS();

  localStorage.setItem(
    "mealIdArr",
    JSON.stringify(storedMealId.filter((id) => id !== mealId))
  );
}

async function fetchFavMeals() {
  const favMealIds = getMealFromLS();

  console.log(favMealIds);

  for (let i = 0; i < favMealIds.length; i++) {
    const favMealId = favMealIds[i];
    const favMeal = await getMealById(favMealId);

    addMealToFav(favMeal);
  }
}

function addMealToFav(favMeal) {
  const mealData = `
        <li>
            <img
              src="${favMeal.strMealThumb}"
              alt="${favMeal.strMeal}"
            />
            <span>${favMeal.strMeal}</span>
        </li>
  `;

  favMealContainer.insertAdjacentHTML("beforeend", mealData);
}
