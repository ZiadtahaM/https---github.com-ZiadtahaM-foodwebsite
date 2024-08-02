let rowData = document.getElementById("rowData");
let datasearch = document.getElementById("datasearch");
let submitBtn;




document.getElementById('sercfeat').addEventListener('click', /**
 * Displays the search input fields for searching meals by name or first letter.
 * This function is called when the 'Search' button in the navigation bar is clicked.
 * It also closes the side navigation bar.
 *
 * @returns {void}
 */
function() {
    showSearchInputs();
    closeSideNav();
});

document.getElementById('categoriesfeat').addEventListener('click', function() {
    mealscateg();
    closeSideNav();
});

document.getElementById('arrea').addEventListener('click', function() {
    mealsbyarea();
    closeSideNav();
});

document.getElementById('recipyfeat').addEventListener('click', function() {
    mealsing();
    closeSideNav();
});

document.getElementById('contc').addEventListener('click', function() {
    showContacts();
    closeSideNav();
});
$(document).ready(() => {
    searchByName("").then(() => {
        $(".loading-screen").fadeOut(500)
        $("body").css("overflow", "visible")

    })
})

function open() {
    $(".siddmenu").animate({
        left: 0
    }, 500)

$(".open-close-icon").removeClass("fa-align-justify").addClass("fa-x");


    for (let i = 0; i < 5; i++) {
        $(".features li").eq(i).animate({
            top: 0
        }, (i + 5) * 100)
    }
}

function closeSideNav() {
    let boxWidth = $(".siddmenu .siddnav").outerWidth()
    $(".siddmenu").animate({
        left: -boxWidth
    }, 500)

   $(".open-close-icon").toggleClass("fa-align-justify fa-x");


    $(".features li").animate({
        top: 300
    }, 500)
}

closeSideNav()
$(".siddmenu i.open-close-icon").click(() => {
    if ($(".siddmenu").css("left") == "0px") {
        closeSideNav()
    } else {
        open()
    }
})




function dismeals(arr) {
    let cont = "";

    for (let i = 0; i < arr.length; i++) {
        cont += `
        <div class="col-md-3">
                <div onclick="getMealDetails('${arr[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${arr[i].strMealThumb}" alt="" srcset="">
                    <div class="meals position-absolute d-flex align-items-center text-black p-2">
                        <h3>${arr[i].strMeal}</h3>
                    </div>
                </div>
        </div>
        `
    }

    rowData.innerHTML = cont
}



async function mealscateg() {
    rowData.innerHTML = ""
    $(".loadscren").fadeIn(300)
    datasearch.innerHTML = "";

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    response = await response.json()

    displaymealscat(response.categories)
    $(".loadscren").fadeOut(300)

}

function displaymealscat(arr) {
    let cont = "";

    for (let i = 0; i < arr.length; i++) {
        cont += `
        <div class="col-md-3">
                <div onclick="getCategoryMeals('${arr[i].strCategory}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${arr[i].strCategoryThumb}" alt="" srcset="">
                    <div class="meals position-absolute text-center text-black p-2">
                        <h3>${arr[i].strCategory}</h3>
                        <p>${arr[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
                    </div>
                </div>
        </div>
        `
    }

    rowData.innerHTML = cont
}


async function mealsbyarea() {
    rowData.innerHTML = ""
    $(".loadscren").fadeIn(300)

    datasearch.innerHTML = "";

    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    respone = await respone.json()
    console.log(respone.meals);

    mealareadisplay(respone.meals)
    $(".loadscren").fadeOut(300)

}


function mealareadisplay(arr) {
    let cont = "";

    for (let i = 0; i < arr.length; i++) {
        cont += `
        <div class="col-md-3">
                <div onclick="mealsbyareaMeals('${arr[i].strArea}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${arr[i].strArea}</h3>
                </div>
        </div>
        `
    }

    rowData.innerHTML = cont
}


async function mealsing() {
    rowData.innerHTML = ""
    $(".loadscren").fadeIn(300)

    datasearch.innerHTML = "";

    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    respone = await respone.json()
    console.log(respone.meals);

    displaymealing(respone.meals.slice(0, 20))
    $(".loadscren").fadeOut(300)

}


function displaymealing(arr) {
    let cont = "";

    for (let i = 0; i < arr.length; i++) {
        cont += `
        <div class="col-md-3">
                <div onclick="mealsingMeals('${arr[i].strIngredient}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${arr[i].strIngredient}</h3>
                        <p>${arr[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
                </div>
        </div>
        `
    }

    rowData.innerHTML = cont
}


async function getCategoryMeals(category) {
    rowData.innerHTML = ""
    $(".loadscren").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    response = await response.json()


    dismeals(response.meals.slice(0, 20))
    $(".loadscren").fadeOut(300)

}



async function mealsbyareaMeals(area) {
    rowData.innerHTML = ""
    $(".loadscren").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    response = await response.json()


    dismeals(response.meals.slice(0, 20))
    $(".loadscren").fadeOut(300)

}


async function mealsingMeals(ingredients) {
    rowData.innerHTML = "";
    document.querySelector(".loadscren").classList.add("d-block");
    document.querySelector(".loadscren").style.opacity = 1;

    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`);
        const data = await response.json();
        dismeals(data.meals.slice(0, 20));
    } catch (error) {
        console.error(error);
    } finally {
        document.querySelector(".loadscren").classList.remove("d-block");
        document.querySelector(".loadscren").style.opacity = 0;
    }
}

async function getMealDetails(mealID) {
    closeSideNav();
    rowData.innerHTML = "";
    document.querySelector(".loadscren").classList.add("d-block");
    document.querySelector(".loadscren").style.opacity = 1;

    datasearch.innerHTML = "";
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
        const data = await response.json();
        details(data.meals[0]);
    } catch (error) {
        console.error(error);
    } finally {
        document.querySelector(".loadscren").classList.remove("d-block");
        document.querySelector(".loadscren").style.opacity = 0;
    }
}


function details(meal) {
    datasearch.innerHTML = "";

    const ingredients = Array.from({ length: 20 }, (_, i) => {
        const ingredient = meal[`strIngredient${i + 1}`];
        const measure = meal[`strMeasure${i + 1}`];
        if (ingredient) {
            return `<li class="alert alert-info m-2 p-1">${measure} ${ingredient}</li>`;
        }
        return "";
    }).filter(Boolean).join("");

    const tags = meal.strTags?.split(",")?? [];
    const tagsStr = tags.map(tag => {
        return `<li class="alert alert-danger m-2 p-1">${tag}</li>`;
    }).join("");

    const cont = `
    <div class="col-md-4">
        <img class="w-100 rounded-3" src="${meal.strMealThumb}" alt="">
        <h2>${meal.strMeal}</h2>
    </div>
    <div class="col-md-8">
        <h2>Instructions</h2>
        <p>${meal.strInstructions}</p>
        <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
        <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
        <h3>Recipes :</h3>
        <ul class="list-unstyled d-flex g-3 flex-wrap">
            ${ingredients}
        </ul>

        <h3>Tags :</h3>
        <ul class="list-unstyled d-flex g-3 flex-wrap">
            ${tagsStr}
        </ul>

        <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
        <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
    </div>`;

    rowData.innerHTML = cont;
}


function showSearchInputs() {
    datasearch.innerHTML = `
    <div class="row py-4">
        <div class="col-md-6">
            <input id="searchByNameInput" class="form-control bg-transparent text-white" type="text" placeholder="Search By Name">
        </div>
        <div class="col-md-6">
            <input id="searchbyfirstletter" maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
        </div>
    </div>`

    rowData.innerHTML = ""

    document.getElementById("searchByNameInput").addEventListener("keyup", () => {
        searchByName(document.getElementById("searchByNameInput").value)
    })

    document.getElementById("searchbyfirstletter").addEventListener("keyup", () => {
        searchByFLetter(document.getElementById("searchbyfirstletter").value)
    })
}
async function searchByName(term) {
    closeSideNav()
    rowData.innerHTML = ""
    $(".loadscren").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
    response = await response.json()

    response.meals ? dismeals(response.meals) : dismeals([])
    $(".loadscren").fadeOut(300)

}

async function searchByFLetter(term) {
    closeSideNav()
    rowData.innerHTML = ""
    document.querySelector(".loadscren").style.display = "block"

    term = term.trim() === "" ? "a" : term.trim()
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`)
        const data = await response.json()
        data.meals ? dismeals(data.meals) : dismeals([])
    } catch (error) {
        console.error(error)
        dismeals([])
    } finally {
        document.querySelector(".loadscren").style.display = "none"
    }
}


function showContacts() {
    rowData.innerHTML = `<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input id="nameInput" onkeyup="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed
                </div>
            </div>
            <div class="col-md-6">
                <input id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control " placeholder="Enter Your Email">
                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *exemple@yyy.zzz
                </div>
            </div>
            <div class="col-md-6">
                <input id="phoneInput" onkeyup="inputsValidation()" type="text" class="form-control " placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="ageInput" onkeyup="inputsValidation()" type="number" class="form-control " placeholder="Enter Your Age">
                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6">
                <input  id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div class="col-md-6">
                <input  id="revalidation" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Repassword">
                <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid repassword 
                </div>
            </div>
        </div>
        <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
    </div>
</div> `
const inputFields = {
    name: {
        id: 'nameInput',
        touched: false,
        validation: /^[a-zA-Z ]+$/,
        alertId: 'nameAlert'
    },
    email: {
        id: 'emailInput',
        touched: false,
        validation: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        alertId: 'emailAlert'
    },
    phone: {
        id: 'phoneInput',
        touched: false,
        validation: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
        alertId: 'phoneAlert'
    },
    age: {
        id: 'ageInput',
        touched: false,
        validation: /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/,
        alertId: 'ageAlert'
    },
    password: {
        id: 'passwordInput',
        touched: false,
        validation: /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/,
        alertId: 'passwordAlert'
    },
    repassword: {
        id: 'revalidation',
        touched: false,
        validation: (value) => value === document.getElementById('passwordInput').value,
        alertId: 'repasswordAlert'
    }
};

const submitBtn = document.getElementById('submitBtn');

function initInputListeners() {
    Object.values(inputFields).forEach(field => {
        document.getElementById(field.id).addEventListener('focus', () => {
            field.touched = true;
            validateInputs();
        });
    });
}

function validateInputs() {
    Object.values(inputFields).forEach(field => {
        if (field.touched) {
            const isValid = typeof field.validation === 'function' ? field.validation(document.getElementById(field.id).value) : field.validation.test(document.getElementById(field.id).value);
            const alertElement = document.getElementById(field.alertId);
            alertElement.classList.toggle('d-block', !isValid);
            alertElement.classList.toggle('d-none', isValid);
        }
    });

    submitBtn.disabled = !Object.values(inputFields).every(field => field.touched && typeof field.validation === 'function' ? field.validation(document.getElementById(field.id).value) : field.validation.test(document.getElementById(field.id).value));
}

initInputListeners();
}