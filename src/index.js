// write your code here
//html elements
const ramenMenu = document.querySelector("div#ramen-menu")

//detail html elements
const ramenDetailImg = document.querySelector("div#ramen-detail img.detail-image")
const ramenDetailName = document.querySelector("div#ramen-detail h2.name")
const ramenDetailRestaurant = document.querySelector("div#ramen-detail h3.restaurant")
const ramenDetailRating = document.querySelector("#rating-display")
const ramenDetailComment = document.querySelector(" #comment-display")

//form html elements
const ramenForm = document.querySelector("form#new-ramen")
const formName = document.querySelector("input#new-name")
const formRestaurant = document.querySelector("input#new-restaurant")
const formImage = document.querySelector("input#new-image")
const formRating = document.querySelector("input#new-rating")
const formComment = document.querySelector("textarea#new-comment")

console.log(formComment)

//url
const url = "http://localhost:3000/ramens"

//FETCH - GET
function getRamen(){
    fetch(url)
        .then(response=> response.json())
        .then(ramenData => {
            ramenData.map(eachRamen => displayRamenMenu(eachRamen))
           
        })
}

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
}

//post
ramenForm.addEventListener("submit", (e) => {
    e.preventDefault()
    addNewRamen(e)
})

const addNewRamen = (e) => {
    console.log(e.target["new-comment"].value)

    const newRamen = {
        
    }
    
}



//Invoke function
getRamen()