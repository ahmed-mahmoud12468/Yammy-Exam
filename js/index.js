// * HTML Elements
let searchInputByWord = document.querySelector("#searchByWord");
let searchInputByFirstLetter = document.querySelector("#searchByFletter");

// * App Variables
let nameRegex = /^[a-zA-Z][a-zA-Z0-9_\.]{2,14}$/;
let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
let passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
let egyptianPhoneRegex = /^01[0125]\d{8}$/;
let ageRegex = /^(100|[1-9][0-9]?)$/;
let phoneRegex = /^01[0-9]{9}$/;

// * Functions

// function displayMealCard(mealsArray) {
//   let mealsContainer = "";
//   for (let meal of mealsArray) {
//     mealsContainer += `
//            <div class="image cursor-pointer col-md-6 col-lg-3  p-2 " onclick="displayMealDetails(${meal.idMeal})>
//             <div class="home-inner rounded-3 position-relative overflow-hidden cursor-pointer" ">
//               <img
//                 src="${meal.strMealThumb}"
//                 alt=""
//               />

//               <div
//                 class="w-100 h-100  d-flex justify-content-start align-items-center position-absolute overlay"
//               >
//                 <p class="mb-0 ms-2 me-2 fs-3">${meal.strMeal}</p>
//               </div>
//             </div>
//           </div>
//     `;
//   }

//   $("#meals").innerHTML = mealsContainer;
// }

async function getRandomMeals() {
  let mealsArray = [];
  for (let i = 0; i < 20; i++) {
    let respnse = await fetch(
      "https://www.themealdb.com/api/json/v1/1/random.php"
    );
    respnse = await respnse.json();
    mealsArray.push(respnse);
  }
  return mealsArray;
}

function closeAsideBar() {
  $("aside").animate({ left: "-260px" }, 700);

  document.getElementById("nav-right-side").innerHTML = `

      <i class="fa-solid fa-bars fs-2"onclick="openAsideBar() "></i>
  `;
  $(".nav-links").css({
    top: "300px",
    left: "-300px",
    transition: "top 0.7s ease, left 0.7s ease",
  });
}

function openAsideBar() {
  $("aside").animate({ left: "0" }, 700);
  $(".nav-links").css({
    top: "300px",
    left: "-300px",
    transition: "top 500s ease, left 500s ease",
  });
  $(".nav-links li").css({ top: "110%" });
  document.getElementById("nav-right-side").innerHTML = `
      <i class="fa-solid fa-x fs-2"onclick="closeAsideBar() "></i>
  `;
  $(".nav-links").css({
    top: "0%",
    left: "0%",
    transition: "top 0.7s ease, left 0.7s ease",
  });

  const listItems = document.querySelectorAll(".nav-links li");
  for (let i = 0; i < listItems.length; i++) {
    setTimeout(() => {
      listItems[i].style.top = "0";
      listItems[i].style.transition = "top 0.7s ease";
    }, i * 150);
  }
}

async function displayMealDetails(mealId) {
  let mealDetailsContainer = "";
  document.querySelector(".loading-screen").style.display = "flex";
  document.querySelector("#meals").innerHTML = "";
  let mealResponse = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
  );
  mealResponse = await mealResponse.json();
  document.querySelector(".loading-screen").style.display = "none";

  console.log(mealResponse);

  let recipe = [];
  for (let i = 1; ; i++) {
    if (mealResponse.meals[0][`strIngredient${i}`] == "") {
      break;
    } else {
      recipe.push(
        `${mealResponse.meals[0][`strMeasure${i}`]} ${
          mealResponse.meals[0][`strIngredient${i}`]
        }`
      );
    }
  }

  let recipesContainer = "";
  for (let i = 0; i < recipe.length; i++) {
    recipesContainer += `
     <span class="text-dark p-1 rounded-2 ">${recipe[i]}</span>
    `;
  }
  console.log(recipe);

  let tagsContainer = "";
  let allTags = mealResponse.meals[0].strTags;
  if (allTags != null) {
    let tags = allTags.split(",");

    for (let i = 0; i < tags.length; i++) {
      tagsContainer += `
        <span class="text-dark p-1 rounded-2">${tags[i]}</span>
    `;
    }
    console.log(tags);
  }

  // strMealThumb , strMeal, strInstructions, strArea, strCategory, strSource,strYoutube, strTags ==> split function(,)

  // strIngredient1, strMeasure1

  document.querySelector("#search-content").innerHTML = "";

  document.querySelector("#meals").innerHTML += `
   <div class="image  col-md-4">
          <div class="img p-2">
            <div class="inner-img rounded-2 overflow-hidden">
              <img
                src="${mealResponse.meals[0].strMealThumb}"
                class="w-100"
                alt=""
              />
            </div>
            <h2 class="text-white">${mealResponse.meals[0].strMeal}</h2>
          </div>
        </div>
        <div class="details col-md-8 text-white">
          <h3 class="h2">Instructions</h3>
          <p class="instructions">
          ${mealResponse.meals[0].strInstructions}
          </p>
          <p class="h2">Area : <span>${mealResponse.meals[0].strArea}</span></p>
          <p class="h2">Category : <span>${mealResponse.meals[0].strCategory}</span></p>
          <p class="h2">Recipes :</p>
          <div class="recipes p-3 d-flex justify-content-start flex-wrap gap-2">
           ${recipesContainer}
          </div>

          <p class="h2">Tags :</p>
          <div class="tags p-3 d-flex justify-content-start flex-wrap gap-2">
            ${tagsContainer}
          </div>

          <div class="tags pt-3">
            <a href="${mealResponse.meals[0].strSource}" class="btn btn-success me-2" target="_blank">Source</a>
            <a href="${mealResponse.meals[0].strYoutube}" class="btn btn-danger" target="_blank">Youtube</a>
          </div>
        </div>
  `;

  // console.log(mealDetailsContainer);
  document.querySelector("#contactus").classList.remove("h-70vh");
}

// ^ Categories
async function displayCategories() {
  closeAsideBar();
  document.querySelector("#meals").innerHTML = "";
  document.querySelector(".loading-screen").style.display = "flex";
  let allCategories = await fetch(
    "https://www.themealdb.com/api/json/v1/1/categories.php"
  );
  allCategories = await allCategories.json();

  let categoriesContainer = "";
  for (let i = 0; i < allCategories.categories.length; i++) {
    categoriesContainer += `
           <div class="image col-md-6 col-lg-3  p-2  ">   
              <div class="home-inner rounded-3 h-auto position-relative overflow-hidden" onclick="diplayCategoryMeals('${
                allCategories.categories[i].strCategory
              }')">
              <img
                src="${allCategories.categories[i].strCategoryThumb}"
                alt=""
              />

              <div
                class="w-100 h-100  d-flex flex-column justify-content-start align-items-center position-absolute overlay"
              >
               <h2 class="mt-2">${allCategories.categories[i].strCategory}</h2>
                <p class="mb-0 ms-2 me-2 text-center">${allCategories.categories[
                  i
                ].strCategoryDescription
                  .split(" ")
                  .slice(0, 15)
                  .join(" ")}</p>
              </div>
            </div>

          </div>
    `;
  }

  document.querySelector("#meals").innerHTML = categoriesContainer;
  document.querySelector(".loading-screen").style.display = "none";
  document.querySelector("#contactus").classList.remove("h-70vh");
}

async function diplayCategoryMeals(categoryName) {
  let mealsContainer = "";
  document.querySelector(".loading-screen").style.display = "flex";
  let categoryMeals =
    await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}
`);
  categoryMeals = await categoryMeals.json();
  for (let i = 0; i < categoryMeals.meals.length; i++) {
    mealsContainer += `
    <div class="image col-md-6 col-lg-3  p-2  ">   
            <div class="home-inner rounded-3 position-relative overflow-hidden" onclick="displayMealDetails(${categoryMeals.meals[0].idMeal})" >
            <img
              src="${categoryMeals.meals[i].strMealThumb}"
              alt=""
            />

            <div
              class="w-100 h-100  d-flex justify-content-start align-items-center position-absolute overlay"
            >
              <p class="mb-0 ms-2 me-2 fs-3">${categoryMeals.meals[i].strMeal}</p>
            </div>
          </div>

        </div>
  `;
  }
  document.querySelector("#meals").innerHTML = mealsContainer;

  document.querySelector(".loading-screen").style.display = "none";
}

// ^ Area

async function displayAreas() {
  closeAsideBar();
  let areaContainer = "";
  document.querySelector("#meals").innerHTML = "";
  document.querySelector(".loading-screen").style.display = "flex";
  let allAreas = await fetch(
    "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
  );
  allAreas = await allAreas.json();
  for (let i = 0; i < allAreas.meals.length; i++) {
    areaContainer += `
      <div class="image  col-md-3  p-3">   
              <div class="home-inner rounded-3 h-auto position-relative overflow-hidden text-center" onclick="diplayAreaMeals('${allAreas.meals[i].strArea}')" >
              <i class="fa-solid fa-house-laptop text-white    fs-1"></i>
              <h2 class="text-white">${allAreas.meals[i].strArea}</h2>
            </div>
      </div>
     
     `;
  }

  document.querySelector("#meals").innerHTML = areaContainer;
  document.querySelector(".loading-screen").style.display = "none";
  document.querySelector("#contactus").classList.remove("h-70vh");
}

async function diplayAreaMeals(areaName) {
  let mealsContainer = "";
  document.querySelector(".loading-screen").style.display = "flex";
  let areaMeals = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${areaName}`
  );
  areaMeals = await areaMeals.json();
  for (let i = 0; i < areaMeals.meals.length; i++) {
    mealsContainer += `
    <div class="image col-md-6 col-lg-3  p-2  ">   
            <div class="home-inner rounded-3 position-relative overflow-hidden" onclick="displayMealDetails(${areaMeals.meals[0].idMeal})" >
            <img
              src="${areaMeals.meals[i].strMealThumb}"
              alt=""
            />

            <div
              class="w-100 h-100  d-flex justify-content-start align-items-center position-absolute overlay"
            >
              <p class="mb-0 ms-2 me-2 fs-3">${areaMeals.meals[i].strMeal}</p>
            </div>
          </div>

        </div>
  `;
  }
  document.querySelector("#meals").innerHTML = mealsContainer;

  document.querySelector(".loading-screen").style.display = "none";
  document.querySelector("#contactus").classList.remove("h-70vh");
}

// ^ Ingredients
async function displayIngredients() {
  closeAsideBar();
  let ingredientsContainer = "";
  document.querySelector("#meals").innerHTML = "";
  document.querySelector(".loading-screen").style.display = "flex";
  let allIngredients = await fetch(
    "https://www.themealdb.com/api/json/v1/1/list.php?i=list"
  );
  allIngredients = await allIngredients.json();
  // for (let i = 0; i < allIngredients.meals.length; i++) {
  for (let i = 0; i < 20; i++) {
    ingredientsContainer += `
      <div class="image  col-md-3  p-3">   
              <div class="home-inner rounded-3 h-auto position-relative overflow-hidden text-center" onclick="displayIngredientsMeals('${
                allIngredients.meals[i].strIngredient
              }')">
              <i class="fa-solid fa-drumstick-bite text-white fs-1"></i>
              <h2 class="text-white">${
                allIngredients.meals[i].strIngredient
              }</h2>
              <p class="text-white">${allIngredients.meals[i].strDescription
                .split(" ")
                .slice(0, 15)
                .join(" ")}</p>
            </div>
      </div>
     
     `;

    document.querySelector("#meals").innerHTML = allIngredients;
    document.querySelector(".loading-screen").style.display = "none";
    document.querySelector("#contactus").classList.remove("h-70vh");
  }

  document.querySelector("#meals").innerHTML = ingredientsContainer;
  document.querySelector(".loading-screen").style.display = "none";
}

async function displayIngredientsMeals(ingredientName) {
  let ingredientContainer = "";
  document.querySelector(".loading-screen").style.display = "flex";
  let ingredientsMeals = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredientName}`
  );
  ingredientsMeals = await ingredientsMeals.json();
  for (let i = 0; i < ingredientsMeals.meals.length; i++) {
    ingredientContainer += `
    <div class="image col-md-6 col-lg-3  p-2  ">   
            <div class="home-inner rounded-3 position-relative overflow-hidden" onclick="displayMealDetails(${ingredientsMeals.meals[0].idMeal})" >
            <img
              src="${ingredientsMeals.meals[i].strMealThumb}"
              alt=""
            />

            <div
              class="w-100 h-100  d-flex justify-content-start align-items-center position-absolute overlay"
            >
              <p class="mb-0 ms-2 me-2 fs-3">${ingredientsMeals.meals[i].strMeal}</p>
            </div>
          </div>

        </div>
  `;
  }
  document.querySelector("#meals").innerHTML = ingredientContainer;
  document.querySelector(".loading-screen").style.display = "none";
  document.querySelector("#contactus").classList.remove("h-70vh");
}

// ^ Search

async function showSearchInputs() {
  closeAsideBar();
  document.querySelector("#search-content").innerHTML = "";
  document.querySelector("#contact-us").innerHTML = "";
  document.querySelector("#meals").innerHTML = `
     <div class=" col-md-6 my-3">
        <input type="text" class="form-control text-white bg-dark searchInputs" placeholder="Search By Name" id="searchByWord" oninput="searchByWord(this.value)"/>
       </div>
       <div class=" col-md-6  my-3">
        <input type="text" class="form-control text-white bg-dark  searchInputs" maxlength="1" placeholder="Search By First Letter" id="searchByFletter" oninput="searchByFirstLetter(this.value)"/>
       </div>
  `;
  document.querySelector("#contactus").classList.remove("h-70vh");
}

async function searchByWord(searchByWord) {
  let searchContainer = "";
  let searchData =
    await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchByWord}
`);
  searchData = await searchData.json();
  if (searchData.meals == null) {
    document.querySelector(
      "#search-content"
    ).innerHTML = ` <h1 class=" display-3 text-center fw-bold text-danger mt-3">Opps !! This meal does not exist ...</h1>`;
  }

  if (searchByWord === "") {
    console.log("ahmed mahmoud");
    document.querySelector(
      "#search-content"
    ).innerHTML = ` <h1 class="text-white display-4 mt-3 text-center">Search for any meal by its name or first letter...</h1>`;
  } else {
    for (let i = 0; i < searchData.meals.length; i++) {
      searchContainer += `
             <div class="image   col-md-6 col-lg-3  p-2  ">   
                <div class="home-inner home-inner-search  rounded-3 h-auto position-relative overflow-hidden" onclick="displayMealDetails('${searchData.meals[i].idMeal}')">
                <img
                  src="${searchData.meals[i].strMealThumb}"
                  alt=""
                  class = " h-400px"
                />
  
                <div
                  class="w-100 h-100  d-flex justify-content-center align-items-center position-absolute overlay"
                >
                 <p class=" h2 ">${searchData.meals[i].strMeal}</p>
                </div>
              </div>
  
            </div>
        `;
    }

    document.querySelector("#search-content").innerHTML = searchContainer;
  }

  document.querySelector("#contactus").classList.remove("h-70vh");
}

async function searchByFirstLetter(item) {
  console.log(item);
  let searchContainer = "";
  let searchData =
    await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${item}
`);
  searchData = await searchData.json();
  if (searchData.meals == null) {
    document.querySelector(
      "#search-content"
    ).innerHTML = ` <h1 class=" display-3 text-center fw-bold text-danger mt-3">Opps !! This meal does not exist ...</h1>`;
  }

  if (searchByWord === "") {
    console.log("ahmed mahmoud");
    document.querySelector(
      "#search-content"
    ).innerHTML = ` <h1 class="text-white display-4 mt-3 text-center">Search for any meal by its name or first letter...</h1>`;
  } else {
    for (let i = 0; i < searchData.meals.length; i++) {
      searchContainer += `
             <div class="image   col-md-6 col-lg-3  p-2  ">   
                <div class="home-inner home-inner-search  rounded-3 h-auto position-relative overflow-hidden" onclick="displayMealDetails('${searchData.meals[i].idMeal}')">
                <img
                  src="${searchData.meals[i].strMealThumb}"
                  alt=""
                  class = " h-400px"
                />
  
                <div
                  class="w-100 h-100  d-flex justify-content-center align-items-center position-absolute overlay"
                >
                 <p class=" h2 ">${searchData.meals[i].strMeal}</p>
                </div>
              </div>
  
            </div>
        `;
    }

    document.querySelector("#search-content").innerHTML = searchContainer;
  }
  document.querySelector("#contactus").classList.remove("h-70vh");
}

let nameInput = document.getElementById("nameInput");
let emailInput = document.getElementById("emailInput");
let phoneInput = document.getElementById("phoneInput");
let ageInput = document.getElementById("ageInput");
let passwordInput = document.getElementById("passwordInput");
let repasswordInput = document.getElementById("repasswordInput");
function showContact() {
  closeAsideBar();
  document.querySelector("#search-content").innerHTML = "";
  document.querySelector("#contactus").classList.add("h-70vh");

  document.getElementById("meals").innerHTML = "";
  document.getElementById("contact-us").innerHTML = `
       <div class=" col-md-6 my-2">
        <input type="text" class="form-control" placeholder="Enter Your Name" " id="nameInput" oninput="validate(${nameRegex},this)"/>
        <p class="error d-none">
            * Username must be 3-15 characters long, start with a letter, and
            can only contain letters,numbers, underscores (_) or dots (.)
          </p>
       </div>
       <div class=" col-md-6  my-2">
        <input type="text" class="form-control "  placeholder="Enter Your Email" id="emailInput" oninput="validate(${emailRegex},this)"/>
         <p class="error d-none">
            * Please enter a valid email address (e.g., example@example.com)
          </p>
       </div>
       <div class=" col-md-6  my-2">
        <input type="text" class="form-control "  placeholder="Enter Your Phone" id="phoneInput" oninput="validate(${phoneRegex},this)"/>
        <p class="error d-none">
             * Invalid phone number. Please enter an 11-digit Egyptian mobile number starting with '01'.
        </p>
       </div>
       <div class=" col-md-6  my-2">
        <input type="number" class="form-control " max="100" min="0"  placeholder="Enter Your Age" id="ageInput" oninput="validate(${ageRegex},this)"/>
        <p class="error d-none">
            *Invalid age. Please enter a valid age between 1 and 100.
          </p>
       </div>
       <div class=" col-md-6  my-2">
        <input type="password" class="form-control "  placeholder="Enter Your Password" id="passwordInput" oninput="validate(${passwordRegex},this)"/>
        <p class="error d-none">
              * ensure your password is at least 8 characters long, includes an
              uppercase letter, a lowercase letter, a number, and a special
              characte
        </p>
       </div>
       <div class=" col-md-6  my-2">
        <input type="password" class="form-control "  placeholder="Repassword" id="repasswordInput" oninput="validate(${passwordRegex},this)"/>
         <p class="error d-none">
              * ensure your password is at least 8 characters long, includes an
              uppercase letter, a lowercase letter, a number, and a special
              characte
        </p>
       </div>

       <button type="button" class="btn btn-outline-danger w-fit d-block mx-auto mt-3">Submit</button>
  `;
}

async function displayContact() {
  await showContact();
  // nameInput.oninput(validate(nameRegex, this.value))
}

function validate(regex, element) {
  if (regex.test(element.value)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    element.nextElementSibling.classList.add("d-none");
    return true;
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    element.nextElementSibling.classList.remove("d-none");
    return false;
  }
}

// ! Events

window.onload = async () => {
  document.querySelector(".loading-screen").style.display = "flex";
  let rondomMeals = await getRandomMeals();
  document.querySelector(".loading-screen").style.display = "none";
  // console.log(rondomMeals);
  for (let i = 0; i < rondomMeals.length; i++) {
    // console.log(rondomMeals[i].meals[0].strMealThumb);
    // console.log(rondomMeals[i].meals[0].strMeal);
    // console.log("#".repeat(10));

    document.querySelector("#meals").innerHTML += `
      <div class="image col-md-6 col-lg-3  p-2  ">   
              <div class="home-inner rounded-3 position-relative overflow-hidden" onclick="displayMealDetails(${rondomMeals[i].meals[0].idMeal})" >
              <img
                src="${rondomMeals[i].meals[0].strMealThumb}"
                alt=""
              />

              <div
                class="w-100 h-100  d-flex justify-content-start align-items-center position-absolute overlay"
              >
                <p class="mb-0 ms-2 me-2 fs-3">${rondomMeals[i].meals[0].strMeal}</p>
              </div>
            </div>

          </div>
    `;
  }
};

// ??????? TEST

async function test() {
  let data = await fetch(
    "https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772"
  );
  data = await data.json();
  console.log(data);
}

// test();
