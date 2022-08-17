// write your code here
console.log("hello world")

//state
let ramens = []

//1 fetch GET request
const ramenMenu = document.getElementById("ramen-menu")

 fetch("http://localhost:3000/ramens")
    .then(resp => resp.json())
    .then(data => {
        ramens = data
        //console.log(ramens)
        selectedRamenId = data[0].id //2 place holder 
        //console.log(selectedRamenId)

        resetMenu()

        //setMenu(data)
    })

function resetMenu(){
    ramens.forEach(ramen => {
        addRamenMenu(ramen)
    })
}

function addRamenMenu(ramen){
        const ramenMenuImg = document.createElement("img")
        ramenMenuImg.src = ramen.image

        ramenMenuImg.dataset.id = ramen.id //2 <- adding the id as a dataset in the html element
        ramenMenu.append(ramenMenuImg)
}


//2 
// 2 Click on an image from the `#ramen-menu` div and see all the info about that
//   ramen displayed inside the `#ramen-detail` div and where it says
//   `insert comment here` and `insert rating here`.

//html elements
//id querySelector("#ramen-detail")
const detailImg = document.querySelector("#ramen-detail img.detail-image")
//const detailImg = document.querySelector("#ramen-detail>.detail-image")
const detailName = document.querySelector("#ramen-detail>.name")
const detailRestaurant = document.querySelector("#ramen-detail>.restaurant")
const ratingDisplay = document.querySelector("#rating-display")
const commentDisplay = document.querySelector("#comment-display")

console.log(detailImg)


ramenMenu.addEventListener("click", (e) => {
    if(e.target.tagName === "IMG"){
        console.log(selectedRamenId)
        selectedRamenId = e.target.dataset.id
        console.log(selectedRamenId)
        setRamenDetailsById(selectedRamenId)

    }
} )

function setRamenDetailsById(id){

    const selected = ramens.find(r => r.id === parseInt(id))
    console.log(selected)

    detailImg.src = selected.image
    detailName.textContent = selected.name
    detailRestaurant.innerText = selected.restaurant
    ratingDisplay.textContent = selected.rating
    commentDisplay.textContent = selected.comment

}


//3
//- 3 Create a new ramen after submitting the `new-ramen` form. The new ramen should
// be added to the`#ramen-menu` div. The new ramen does not need to persist; in
// other words, if you refresh the page, it's okay that the new ramen is no
// longer on the page.

// id #
// class . 

//html elements
const newRamenForm = document.querySelector("#new-ramen")
const newRamenNameInput = document.querySelector("#new-ramen>#new-name")
const newRamenRestaurantInput = document.querySelector("#new-ramen>#new-restaurant")
const newRamenImageInput = document.querySelector("#new-ramen>#new-image")
const newRamenRatingInput = document.querySelector("#new-ramen>#new-rating")
const newRamenCommentInput = document.querySelector("#new-ramen>#new-comment")

listenNewRamenForm()
//
function listenNewRamenForm(){
    newRamenForm.addEventListener("submit", (event) => {
        event.preventDefault()
        let newRamen = {
            name: newRamenNameInput.value,
            restaurant: newRamenRestaurantInput.value,
            image: newRamenImageInput.value,
            rating: newRamenRatingInput.value,
            comment: newRamenCommentInput.value
        }
        postRamen(newRamen)
    })
}



function postRamen(ramenData){
    fetch('http://localhost:3000/ramens', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(ramenData),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log('Success:', data)
            ramens.push(data)
            addRamenMenu(data)
            ;
    })
        .catch((error) => {
            console.error('Error:', error);
        });
}