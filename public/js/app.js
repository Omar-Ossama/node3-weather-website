
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const meassageTwo = document.querySelector('#message-2')




weatherForm.addEventListener('submit', (e) =>{
    e.preventDefault()
    const location = search.value
    messageOne.textContent = 'Loading...'
    fetch('/weather?address=' + location).then((Promise) =>{
    Promise.json().then((data) =>{
        if(data.error){
            messageOne.textContent = data.error 
        } else {
           
            messageOne.textContent = data.location
            meassageTwo.textContent =data.forecast
        }
    })
})


    console.log(location)
})