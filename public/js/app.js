//this app.js is for client side javascript
console.log('Client side javscript file is loaded!')


// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })


const weatherForm = document.querySelector('form')     
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')          //printing output in client ui
const messageTwo = document.querySelector('#message-2')




weatherForm.addEventListener('submit', (e) => {    //lining the search form and fetch data at client side
    e.preventDefault()                //prevent the default function of refreshing a page at client side

    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('/weather?address=' + location).then((response) => { //the url where we try to fetch from
      response.json().then((data) => {       //callback function for fetch is abit different, we use the then method for callback         
        if(data.error){
            messageOne.textContent = data.error
            // console.log(data.error)
        } else{
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
            // console.log(data.location)                //browser http request with fetch,fetch data to client side
            // console.log(data.forecast)
        }
    })
})
 
})