// write your code here
let ramens = []

//html elements
//1
const ramenMenu = document.querySelector("#ramen-menu")


//run app / function invocation
//1
fetchRamen()
//2
listenMenu()



//1 fetch GET request 

//function declaration
function fetchRamen(){
    fetch("http://localhost:3000/ramens")
        .then(resp => resp.json())
        .then(data => {
            ramens = data

            resetMenu()

            selectedRamenId = String(ramens[0].id) //2 place holder
            //selectedRamenDetail(selectedRamenId) //2
            })
}

function resetMenu() {
    ramens.forEach(ramen => {
        addRamenMenu(ramen)
        })
}

function addRamenMenu(ramen){
    const ramenMenuImg = document.createElement("img")
    ramenMenuImg.src = ramen.image
    ramenMenuImg.alt = ramen.name
   
    ramenMenuImg.dataset.id = ramen.id //2
    ramenMenu.append(ramenMenuImg)
}


//2 addEventListener to display ramen detail
const detailImg = document.querySelector("#ramen-detail>.detail-image")
const detailName = document.querySelector("#ramen-detail>.name")
const detailRestaurant = document.querySelector("#ramen-detail>.restaurant")
const ratingDisplay = document.querySelector("#rating-display")
const commentDisplay = document.querySelector("#comment-display")

function listenMenu(){
    ramenMenu.addEventListener("click", (e) => {
        if(e.target.tagName === "IMG"){
            selectedRamenId = e.target.dataset.id
            setRamenDetailsById(selectedRamenId)
        }
    })
}

function setRamenDetailsById(id){
    // console.log(typeof(id))
    const selected = ramens.find(r => r.id === parseInt(id))
    //console.log(selected)
    detailImg.src = selected.image
    detailName.innerText = selected.name
    detailRestaurant.innerText = selected.restaurant
    ratingDisplay.innerText = selected.rating
    commentDisplay.innerText = selected.comment
}

//3 POST request
//html elements
const newRamenForm = document.querySelector("#new-ramen")
const newRamenNameInput = document.querySelector("#new-ramen>#new-name")
const newRamenRestaurantInput = document.querySelector("#new-ramen>#new-restaurant")
const newRamenImageInput = document.querySelector("#new-ramen>#new-image")
const newRamenRatingInput = document.querySelector("#new-ramen>#new-rating")
const newRamenCommentInput = document.querySelector("#new-ramen>#new-comment")

//invoke the function
listenNewRamenForm()

function listenNewRamenForm(){
        newRamenForm.addEventListener("submit", (e) => {
            e.preventDefault()
            let newRamen = {
                name: newRamenNameInput.value,
                restaurant: newRamenRestaurantInput.value,
                image: newRamenImageInput.value,
                rating: parseInt(newRamenRatingInput.value),
                comment: newRamenCommentInput.value
            }
            postRamen(newRamen)
        })
}

function postRamen(ramenData){
    fetch("http://localhost:3000/ramens", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ramenData),
      })
    .then(resp => resp.json())
    .then(data => {
        ramens.push(data)
        addRamenMenu(data)
    })
    .catch(err => console.error(err))
}