//local storage and event delegation with ES6


const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
const items = JSON.parse(localStorage.getItem('items')) || []; //information stored here and if there isn't, goes to empty array

function addItem(e) {
    e.preventDefault(); //prevents refresh
    const text = (this.querySelector('[name=item]')).value//do this to specify what is inside the form in this case. 
    const food = {
        text,  //text = text from ES5 in ES6. 
        done: false //so that it doesn't checked on by default
    };
    
    items.push(food); //push to items
    populateList(items, itemsList);
    localStorage.setItem('items', JSON.stringify(items));
    this.reset(); //form element to reset. 
}

                        //this makes functions more resilient, and the platesList will be connected to the HTML element. 
                        //even if there are two different lists, you can just pass different array elements and the function will still work. 
function populateList(plates = [], platesList) { //to pass in the food setting plate to default object so that it doesn't break the JS and map function will work fine.
    //note that this will make it recreate the entire list (fast but just a heads up no performance)

    platesList.innerHTML = plates.map((plate, i) => { //map will take inner array's raw data and give back an array of a different raw data. 
        return `
        <li>
            <input type="checkbox" data-index=${i} id="item${i}" ${plate.done ? 'checked' : ''} />
            <label for="item${i}">${plate.text}</label>
        </li>
        `;
    }).join(''); //to make into one big string instead of individual strings. 
}

function toggleDone(e) {
   if(!e.target.matches('input')) return; //skip unless it is an input, event delegation. Listen for something higher, then check when it is.
    console.log(e.target);  //shows what are being called with target 
    const changeDataIndex = e.target;
    console.log(changeDataIndex.dataset.index); //to see where the dataset index is
    const index = changeDataIndex.dataset.index;
        items[index].done = !items[index].done; //flipflopping between true and false;
        localStorage.setItem('items', JSON.stringify(items)); //set the items array into the localstorage and when it stores first, it is stored as a key not a string. 
        populateList(items, itemsList);
}



addItems.addEventListener('submit', addItem)//listen for submit and not click event so that even when someone presses enter, it would be accepted. 
itemsList.addEventListener('click', toggleDone); //the plates class wlil now listen for a click to run function.
populateList(items, itemsList) //allows for the event to persist on the page. 


