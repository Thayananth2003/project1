let mealsContainer = document.getElementById("meals-id");
let search = document.getElementById("search-btn");
let mealsDetails = document.querySelector(".details-content");
let closeButton = document.querySelector(".recipe-close");

search.addEventListener("click", getList);
mealsContainer.addEventListener("click", getRecipe);
closeButton.addEventListener("click", () => {
  mealsDetails.parentElement.classList.remove("showRecipe");
});
function getList() {
  let searchInput = document.getElementById("meals").value.trim();
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInput}`)
    .then((res) => res.json())
    .then((data) => {
      let html = "";
      if (data.meals) {
        data.meals.forEach((meal) => {
          html += `<div class="meals-item" data-id="${meal.idMeal}">
              <div class="meals-imgs">
                <img src="${meal.strMealThumb}" />
              </div>
              <div class="meals-name">
                <h3>${meal.strMeal}</h3>
                <a href="#" class="Recipe-btn">Get Recipe</a>
              </div>
            </div>`;
        });
      } else {
        html = "sorry, we didn't find any meals!";
        mealsContainer.classList.add("notFound");
      }
      mealsContainer.innerHTML = html;
      // console.log(meal);
    });
}

function getRecipe(e) {
  e.preventDefault();
  if (e.target.classList.contains("Recipe-btn")) {
    let MealItem = e.target.parentElement.parentElement;

    fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${MealItem.dataset.id}`
    )
      .then((res) => res.json())
      .then((data) => RecipeModel(data.meals));
  }
}

function RecipeModel(meal) {
  // console.log(meal);
  meal = meal[0];
  let html = `<h3>${meal.strMeal}</h3>
            <p class="category">${meal.strCategory}</p>
            <div class="instruct">
              <h3>Instructions:</h3>
              <p id="content">${meal.strInstructions}</p>

            </div>
            <div class="recipe-img">
              <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
            </div>
            <div class="video">
              <a href="${meal.strYoutube}" target="_blank">Watch Video</a>
            </div>`;
  mealsDetails.innerHTML = html;
  mealsDetails.parentElement.classList.add("showRecipe");
}
