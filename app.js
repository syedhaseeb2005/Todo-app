const inputarea = document.querySelector('input')
const submitbtn = document.querySelector('.submitbtn')
const itemlist = document.querySelector('.itemList')
const editbtn = document.querySelector('edit-btn')
const clearbtn = document.querySelector ('.clear')
const alertpara = document.querySelector('.para-alert')
const modal = document.querySelector('.modal')
const donebtn = document.querySelector('.done-btn')
const modalinput = document.querySelector('.modal-input')
const overlay = document.querySelector('.overlay')
// console.log(modal)
// console.log(donebtn)
// console.log(modalinput)
// console.log(overlay)
// console.log(alertpara)

// idher humny khali array is liy chora taky is me value store kar sakhy
let item = []
// console.log(item)
let editedUID = null

itemlist.innerHTML = item.join("")
// Yah par hamny aik alert ka function chalya jis me humny index ki file par aik msg likha hai <p> ky tag me taky javasript ky zariy hum usko show karsaky or is settimeout lagya taky inty second me msg show hoty rahy
const alertshow = (alerttext) => {
    alertpara.innerHTML = alerttext
    alertpara.style.visibility = 'visible'
    
    setTimeout(()=>{
        alertpara.style.visibility = 'hidden'
        
    }, 2000)

}
// idher hum ny edit ka fucntion chalya taky hum koi bhi item asani sy add kar sakhy
const edititem = (uid)=>{
    // submitbtn.innerText = `Edit`
    
    const mylist = Array.from(itemlist.childNodes)

    editedUID = uid
    modal.classList.remove("hidden")
    
    overlay.classList.remove("hidden")
    
    const filtereddata = mylist.filter((singleitem)=>singleitem.id === uid)
    
    inputarea.value = filtereddata[0].querySelector('p').innerText
    
    modalinput.value = filtereddata[0].querySelector('p').innerText
    
    submitbtn.removeEventListener('click',submission)
    
    // submitbtn.addEventListener('click',()=> editprocess(uid))
    editbtn.addEventListener('click' , editprocess)
    // crossbtn.addEventListener('click',()=>{
    //     modal.classList.toggle('hidden')
    // })
}




// or idher humny edit ka process is liy chalaya taky hum kisi ko bhi easily change kar sakhy kabhi bhi
const editprocess = () =>{

    modal.classList.add("hidden") 
    // modalinput=== ''

    overlay.classList.add("hidden")

    const indexnumber = item.findIndex((singleitem)=> singleitem.includes(editedUID))
    item.splice(indexnumber, 1 ,`<div id="${editedUID}" class="item">
                                    <p>${modalinput.value}</p>
                                    <div class="btn">
                                        <button onclick="edititem('${editedUID}')">Edit</button>
                                        <button onclick="deleteitem('${editedUID}')">Delete</button>
                                    </div>
                                </div>`)
    itemlist.innerHTML = item.join("")
    submitbtn.innerText = 'Submit'
    // submitbtn.innerText = 'Submit'
    // editbtn.style.display = 'none'
    // submitbtn.style.display = 'inline-block'
    setTimeout(()=>{
        inputarea.value = ''

    },1000)
    
    
    submitbtn.removeEventListener('click', editprocess)
    
    submitbtn.addEventListener('click', submission)
    
    // localStorage.setItem('myList', JSON.stringify(item))
}



// idher delete item ka fuction chalaya taky koi bhi cheez ko hum kabhi bhi delete kar sakhty hai 
const deleteitem = (uid) => {
    // console.log(`dlelte chla raha`, uid)
    const indexnumber = item.findIndex((singleitem)=> singleitem.includes(uid))
    item.splice(indexnumber , 1)
    itemlist.innerHTML = item.join("")
    alertshow(`Your item is deleted`)
    if(itemlist.innerHTML === ''){
        clearbtn.classList.add("hidden")
    }

    // localStorage.setItem('myList' , JSON.stringify(item))
}

// Submit button me submission ka function chalaya hai taky hum input ky zariy item ko add kar sakhy
const submission = () => {
    if(inputarea.value === ""){
        alertshow(`Please enter Item?`)
        return
    }
    const uniqueid = new Date().getTime()
    const itemdate =   `<div id="${uniqueid}" class="item">
                            <p>${inputarea.value}</p>
                            <div class="btn">
                                <button onclick="edititem('${uniqueid}')">Edit</button>
                                <button onclick="deleteitem('${uniqueid}')">Delete</button>
                            </div>    
                        </div>`
        clearbtn.classList.remove("hidden")
        
        item.push(itemdate)
        
        itemlist.innerHTML = item.join("")
        
        alertshow(`${inputarea.value} is added to your list`)
        
        inputarea.value = ""
        
        // localStorage.setItem('myList' , JSON.stringify(item))
}
// idher hym ny clear ka fuction chalya hai taky hum item ko aik saath sab ko delete kar sakhy
const clear = () => {
    item = []
    itemlist.innerHTML = ``
    alertshow(`All item are cleared`)
        clearbtn.classList.add('hidden')
    
}
clearbtn.addEventListener('click', clear)
submitbtn.addEventListener('click', submission)         
donebtn .addEventListener("click", editprocess);

