// write your code here

//1. Select HTML element
//2. Retrieve data from the server
//3. Connect 1 and 2

//HTML DOM Node Elements
const ramenMenu = document.getElementById("ramen-menu") //1
// const ramenDetailImage = document.getElementsByClassName("detail-image")[0]
// const ramenDetailName = document.getElementsByClassName("name")[0]
// const ramenDetailRestaurant = document.getElementsByClassName("restaurant")[0]
// const ramenDetailRating = document.getElementById("rating-display")
// const ramenDetailComment = document.getElementById("comment-display")


//query selector 
//# id  
//. class

//simplified
const ramenDetailImage = document.querySelector(".detail-image")
const ramenDetailName = document.querySelector(".name")
const ramenDetailRestaurant = document.querySelector(".restaurant")
const ramenDetailRating = document.querySelector("#rating-display")
const ramenDetailComment = document.querySelector("#comment-display")

//detailed
// const ramenDetailImage = document.querySelector("div#ramen-detail img.detail-image")
//const ramenDetailName = document.querySelector("div#ramen-detail h2.name")

//form html elements
const ramenForm = document.querySelector("#new-ramen")

const newRamenName = document.querySelector("#new-name")
const newRamenRestaurant = document.querySelector("#new-restaurant")
const newRamenImage = document.querySelector("#new-image")
const newRamenRating = document.querySelector("#new-rating")
const newRamenComment = document.querySelector("#new-comment")


//url
const url = "http://localhost:3000/ramens" //2

//FETCH - GET //2
function getRamen(){
    fetch(url) 
    .then(response => response.json())
    .then(ramenData => {
        //console.log(ramenData) //[]
        
        ramenData.map( eachRamen => {
            //console.log(eachRamen) //{}
            displayRamenMenu(eachRamen)
        } )
    })

}


const  displayRamenMenu = (ramen) => {
    const ramenImg = document.createElement("img") //1
    ramenImg.src = ramen.image //3

    ramenMenu.appendChild(ramenImg)

    ramenImg.addEventListener("click", () => {
        displayDetail(ramen)
    })
}

const displayDetail = (ramen) => { //3
    console.log(ramen)
    ramenDetailImage.src = ramen.image
    ramenDetailName.textContent = ramen.name
    ramenDetailRestaurant.innerText = ramen.restaurant
    ramenDetailRating.textContent = ramen.rating
    ramenDetailComment.textContent = ramen.comment
}


//FORM
//1. select html form 
//2. select input element
//3. add event listener
//4. get the new ramen obj
//5. send that obj to the menu

ramenForm.addEventListener("submit", (event) => {
    event.preventDefault()
    //EVENT's target VALUE
    // let newRamen = {
    //     "name":  event.target["new-name"].value, 
    //     "restaurant": event.target["new-restaurant"].value,
    //     "image": event.target["new-image"].value,
    //     "rating": event.target["new-rating"].value,
    //     "comment": event.target["new-comment"].value
    //  }

    //INPUT VALUE
    let newRamen = {
        "name" : newRamenName.value,
        "restaurant": newRamenRestaurant.value,
        "image": newRamenImage.value,
        "rating": newRamenRating.value,
        "comment": newRamenComment.value
    }

    console.log(newRamen)

    displayRamenMenu(newRamen)

    event.target["new-name"].value = "" 
    event.target["new-restaurant"].value = ""
    event.target["new-image"].value = ""
    event.target["new-rating"].value = ""
    event.target["new-comment"].value = ""
})

//function invocation
getRamen()