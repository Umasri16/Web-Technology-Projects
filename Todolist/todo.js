let ul=document.getElementById("unorderedlist-container")
let add_btn=document.getElementById("add-button")
let save_btn=document.getElementById("save-button")

function getTodoArrayFromLocalStroage(){
    let stringifydata=localStorage.getItem("todoArray")
    // console.log(stringifydata);
    let parseeddata=JSON.parse(stringifydata)
    // console.log(parseeddata);
    if(parseeddata === null){
        return []
    }
    else{
       return parseeddata;
    }
}
let todoArray=getTodoArrayFromLocalStroage()
let todoArrayLen=todoArray.length

add_btn.onclick=function(){
    createNewObj();
    console.log("hello");
}

save_btn.onclick=function(){
    localStorage.setItem("todoArray",JSON.stringify(todoArray))
}
function createListElement(todo){
let checkboxid="checkbox"+todo.uniqueNo;
let listid="list"+todo.uniqueNo;
let labelid="label"+todo.uniqueNo

let li=document.createElement("li")
li.classList.add("d-flex", "flex-row","list-container")
li.setAttribute("id",listid)
ul.appendChild(li)

let inpele=document.createElement("input")
inpele.setAttribute("type","checkbox")
inpele.setAttribute("id",checkboxid);
inpele.classList.add("checkbox")
li.appendChild(inpele)
inpele.checked=todo.isChecked;
inpele.onclick=function(){
    inputChecked(checkboxid,labelid,listid);
}


let labelContainer=document.createElement("div")
labelContainer.classList.add("label-cotainer","d-flex","flex-row")
li.appendChild(labelContainer)

let labelElement=document.createElement("label")
labelElement.setAttribute("for",checkboxid)
labelElement.setAttribute("id",labelid)
labelElement.classList.add("label-item")
labelElement.textContent=todo.text
if(todo.isChecked === true){
    labelElement.classList.add("line-through")
}
labelContainer.appendChild(labelElement)



let deleteContainer=document.createElement("div")
deleteContainer.classList.add("delete-icon-cotainer")
labelContainer.appendChild(deleteContainer)

let deleteIcon=document.createElement("i")
deleteIcon.classList.add("fa","fa-trash-alt","delete-icon")
deleteContainer.appendChild(deleteIcon)
deleteIcon.onclick=function(){
    deleteList(listid)
}



}
for(let eachitem of todoArray){
    createListElement(eachitem)
}
function deleteList(listid){
    let lie=document.getElementById(listid)
    ul.removeChild(lie);
   // console.log(todoArray);
    //console.log(listid);
    let deleteitemIndex=todoArray.findIndex(function(eachitem){
        // console.log(eachitem);
        let eachlistid="list"+eachitem.uniqueNo;
       if(eachlistid === listid){
       return true;
       }
       else{
        return false;
       }
        
    })
    console.log(deleteitemIndex);
    todoArray.splice(deleteitemIndex,1)
    console.log(todoArray);

}

function createNewObj() {
    let user_input=document.getElementById("user-input")

    if(user_input.value===""){
        alert("Please enter valid input")
        return
    }
   todoArrayLen=todoArrayLen+1
  let new_todo_item={
        text:user_input.value,
        uniqueNo: todoArrayLen,
        isChecked:false
    }
   todoArray.push(new_todo_item);
   console.log(todoArray);
    createListElement(new_todo_item)
    user_input.value=""
   
}
function inputChecked(checkboxid,labelid,listid){
    let i=document.getElementById(checkboxid)
    let l=document.getElementById(labelid)
    if(i.checked===true){
        l.classList.add("line-through")
    }
    else{
        l.classList.remove("line-through")
    }

    let listObjIndex=todoArray.findIndex(function(eachitem){
        let eachlistid="list"+eachitem.uniqueNo;
        if(eachlistid===listid){
            return true
        }
        else{
            return false;
        }
    })
    let listObj=todoArray[listObjIndex];
    console.log(listObj);
    console.log(listObj.isChecked);
    if(listObj.isChecked === true){
        listObj.isChecked=false;
    }
    else{
        listObj.isChecked=true;
    }

}







