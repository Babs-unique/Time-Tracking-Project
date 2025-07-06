let jsonData;
let colorCatalog = {
    "Work":" hsl(15, 100%, 70%)e",
    "Play":"hsl(195, 74%, 62%)",
    "Study":"hsl(348, 100%, 68%)",
    "Exercise":" hsl(145, 58%, 55%)",
    "Social":"hsl(264, 64%, 52%)",
    "Self Care":"hsl(43, 84%, 65%)"
}
function showData(type){
        const userContainer = document.getElementById("user-actions");
        userContainer.innerHTML = '';
        let label= "";
        if(type === "daily"){
            label = "day";
        }else{
            label = type.slice(0,-2);
        }
        jsonData.forEach(item => {
        const userData = document.createElement("div");
        userData.className = "user_action_details";
        userData.style.backgroundColor = colorCatalog[item.title]
        userData.innerHTML = `<div class="user_action_img">
                    <img src="./images/icon-${item.title}.svg" alt="Work Image" width="40">
                </div>
                <div class="user_action_time">
                    <div class="flex-work">
                        <p>${item.title}</p>
                        <span>
                            <img src="./images/icon-ellipsis.svg" alt="Ellipsis" width="15">
                        </span>
                    </div>
                    <div class="data-used">
                        <h3>${item.timeframes[type].current}hrs</h3>
                        <p class="last-week">Last-${label} - ${item.timeframes[type].previous}hrs</p>
                    </div>
                </div>`
                userContainer.appendChild(userData);
        });
};


fetch("data.json")
.then(response =>{
    if(!response.ok){
        throw new Error("Unable to fetch Json Data");
    }
    return response.json();
})
.then(data =>{
    jsonData  = data;
    showData("daily");
})
.catch(error=>{
    console.error("Error fetching data:",error);
});
document.querySelectorAll(".time-info button").forEach( button=>{
        button.addEventListener('click',()=>{
            const selectedType = button.dataset.type;
            console.log(selectedType);
            showData(selectedType);
            console.log("Button clicked")
        })
})