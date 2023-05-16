const inputarea = document.querySelector('input')
const submitbtn = document.querySelector('.submitbtn')
const itemlist = document.querySelector('.itemList')
const clearbtn = document.querySelector ('.clear')
const alertpara = document.querySelector('.para-alert')
// console.log(input)
// console.log(submitbtn)
// console.log(itemlist)
// console.log(clearbtn)
// console.log(alertpara)

// idher humny khali array is liy chora taky is me value store kar sakhy
let item = []


// Yah par hamny aik alert ka function chalya jis me humny index ki file par aik msg likha hai <p> ky tag me taky javasript ky zariy hum usko show karsaky or is settimeout lagya taky inty second me msg show hoty rahy
const alertshow = (alerttext) => {
    alertpara.innerHTML = alerttext
    alertpara.style.visibility = 'visible'
    
    setTimeout(()=>{
        alertpara.style.visibility = 'hidden'
        
    }, 3000)

}
// idher hum ny edit ka fucntion chalya taky hum koi bhi item asani sy add kar sakhy
const edititem = (uid)=>{
    submitbtn.innerText = `Edit`
    const mylist = Array.from(itemlist.childNodes)

    const filtereddata = mylist.filter((singleitem)=>singleitem.id === uid)
    inputarea.value = filtereddata[0].querySelector('p').innerText

    submitbtn.removeEventListener('click',submission)
    submitbtn.addEventListener('click',()=> editprocess(uid))
}




// or idher humny edit ka process is liy chalaya taky hum kisi ko bhi easily change kar sakhy kabhi bhi
const editprocess = (uid) =>{
    const indexnumber = item.findIndex((singleitem)=> singleitem.includes(uid))
    item.splice(indexnumber, 1 ,`<div id="${uid}" class="item">
    <p>${inputarea.value}</p>
    <div class="btn">
        <button onclick="edititem('${uid}')">Edit</button>
        <button onclick="deleteitem('${uid}')">Delete</button>
    </div>`)
    itemlist.innerHTML = item.join("")
    inputarea.value = ''
    
    submitbtn.innerText = 'Submit'
    submitbtn.removeEventListener('click', editprocess)

    submitbtn.addEventListener('click', submission)
}



// idher delete item ka fuction chalaya taky koi bhi cheez ko hum kabhi bhi delete kar sakhty hai 
const deleteitem = (uid) => {
    // console.log(`dlelte chla raha`, uid)
    const indexnumber = item.findIndex((singleitem)=> singleitem.includes(uid))
    item.splice(indexnumber , 1)
    itemlist.innerHTML = item.join("")
    alertshow(`Your item is deleted`)
}

// Submit button me submission ka function chalaya hai taky hum input ky zariy item ko add kar sakhy
const submission = () => {
    if(inputarea.value === ""){
        alertshow(`Please enter Item?`)
        return
    }
    const uniqueid = new Date().getTime()
    
    const itemdate = `<div id="${uniqueid}" class="item">
        <p>${inputarea.value}</p>
        <div class="btn">
            <button onclick="edititem('${uniqueid}')">Edit</button>
            <button onclick="deleteitem('${uniqueid}')">Delete</button>
        </div>`
        item.push(itemdate)
        itemlist.innerHTML = item.join("")
        alertshow(`${inputarea.value} is added to your list`)
        inputarea.value = ""
    
}
// idher hym ny clear ka fuction chalya hai taky hum item ko aik saath sab ko delete kar sakhy
const clear = () => {
    if(inputarea.value === ""){
        clearbtn.classList.toggle= 'clear'
        return
    }
    item = []
    itemlist.innerHTML = ``
    alertshow(`All item are cleared`)
   

}
clearbtn.addEventListener('click', clear)
submitbtn.addEventListener('click', submission)         