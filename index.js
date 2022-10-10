const currentDate = document.querySelector(".current-date");
const daysTag = document.querySelector(".days");
const prevNextIcon = document.querySelectorAll(".icons span");

//getting new date, cutrrent year, month; 
let date = new Date(),
currYear = date.getFullYear();
currMonth = date.getMonth();

const months = [ "January", "Febuary", "March", "April", "May", "June",
                 "July", "August", "September", "October", "November", "December"];

const renderCalendar = () => {
    let lastDateofMonth = new Date(currYear, currMonth + 1 , 0).getDate(); //get last day of month
    let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(); //get first day of month
    let lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(); // get Last date of prev month
    let lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay();// get last dat of next month
    let liTag = "";

    //previous month days
    for(let i = firstDayofMonth; i > 0; i-- ) {
        liTag +=`<li class="inactive">${lastDateofLastMonth - i +1}</li>`
    }

    //current month days
    for (let i = 1; i <= lastDateofMonth; i++) {
        let isToday = i === date.getDate() && currMonth === new Date().getMonth() && currYear === new Date().getFullYear() ? "active" : "";
        liTag += `<li class=${isToday}>${i}</li>`
        
    }

    //next month days
    for (let i = lastDayofMonth; i < 6; i++) {
        liTag +=`<li class="inactive">${i - lastDayofMonth +1}</li>`    
    }

    currentDate.innerHTML = `${months[currMonth]} ${currYear}`;
    daysTag.innerHTML = liTag;
}

renderCalendar();

//select month

prevNextIcon.forEach(icon =>{
    icon.addEventListener("click", () => {
        currMonth = icon.id === "prev" ? currMonth-1 : currMonth+1 ;

        if(currMonth < 0 || currMonth > 11) {
            date = new Date(currYear,currMonth);
            currYear = date.getFullYear();
            currMonth = date.getMonth();
        } else {
            date = new Date()
        }
        renderCalendar();
    })
});