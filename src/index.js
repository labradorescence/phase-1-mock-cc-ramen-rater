// write your code here
//html elements
const ramenMenu = document.querySelector("div#ramen-menu")

//detail html elements
const ramenDetailImg = document.querySelector("div#ramen-detail img.detail-image")
const ramenDetailName = document.querySelector("div#ramen-detail h2.name")
const ramenDetailRestaurant = document.querySelector("div#ramen-detail h3.restaurant")
const ramenDetailRating = document.querySelector("#rating-display")
const ramenDetailComment = document.querySelector(" #comment-display")

//form - post ramen html elements
const ramenForm = document.querySelector("form#new-ramen")
const formName = document.querySelector("input#new-name")
const formRestaurant = document.querySelector("input#new-restaurant")
const formImage = document.querySelector("input#new-image")
const formRating = document.querySelector("input#new-rating")
const formComment = document.querySelector("textarea#new-comment")

//url
const url = "http://localhost:3000/ramens"

//FETCH - GET
function getRamen(){
    fetch(url)
        .then(response=> response.json())
        .then(ramenData => {
            ramenData.map(eachRamen => displayRamenMenu(eachRamen))
            displayDetail(ramenData[0])
            })
}

//FETCH - POST
function postRamen(newRamen){
    return fetch(url, {
        method: "POST",
        headers: {
            "content-type":"application/json"
        },
        body: JSON.stringify(newRamen)
    })
        .then(response => response.json())
}

//Display menu
const displayRamenMenu = ( ramen ) => {
    const ramenImg = document.createElement("img")
    ramenImg.src = ramen.image
    ramenMenu.appendChild(ramenImg)

    ramenImg.addEventListener("click", () => {
        displayDetail(ramen)
    })
}

//Display detail
const displayDetail = (ramen) => {
    ramenDetailImg.src = ramen.image
    ramenDetailName.innerText = ramen.name
    ramenDetailRestaurant.innerText = ramen.restaurant
    ramenDetailRating.innerText = ramen.rating
    ramenDetailComment.innerText = ramen.comment

    const editRamenForm = document.getElementById("edit-ramen")
    editRamenForm.addEventListener("submit", (e) => {
        e.preventDefault()
        editRamen(ramen)
    })
  
}

//FORM : new ramen 
ramenForm.addEventListener("submit", (e) => {
    e.preventDefault()
    addNewRamen(e)
})


const addNewRamen = (e) => {

    //selecting form node, grabbing e.target.value
    // let newRamenE = {
    //     "name": e.target["new-name"].value,
    //     "restaurant" :e.target["new-restaurant"].value,
    //     "image": e.target["new-image"].value,
    //     "rating": e.target["new-rating"].value,
    //     "comment": e.target["new-comment"].value
    // }
    // displayRamenMenu(newRamen)

    //selecting input html node
    let newRamenInput = {
        "name": formName.value,
        "restaurant" :formRestaurant.value,
        "image": formImage.value,
        "rating": formRating.value,
        "comment": formComment.value
    }

    postRamen(newRamenInput)
        .then(newlyAddedRamen=> displayRamenMenu(newlyAddedRamen))

    e.target["new-name"].value = ""
    e.target["new-restaurant"].value = ""
    e.target["new-image"].value = ""
    e.target["new-rating"].value = ""
    e.target["new-comment"].value = ""
}

function editRamen ( ramen ){
    const editRatingInputVal = document.getElementById("new-rating").value
    const editCommentInputVal = document.getElementById("new-comment").value

    
    let newEditedRamen = {
        "name": ramen.name,
        "restaurant" :ramen.restaurant,
        "image": ramen.image,
        "rating": editRatingInputVal,
        "comment": editCommentInputVal
    }
    console.log(newEditedRamen)
    
    displayDetail(newEditedRamen)

}


//function invocations
getRamen()