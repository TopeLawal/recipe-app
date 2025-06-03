const mealsContainer = document.getElementById("meals-container");

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
    `www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
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

    clicked.classList.toggle("active");
  });
}

getRandomMeal();

function addMealToLS() {}

function getMealFromLS() {}

function removeMealFromLS() {}
