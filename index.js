for(let i=0;i<=9;i++){
    document.getElementById(""+i).addEventListener("click", ()=>{
        document.getElementById(""+i).value="";
       
    });
}

function onCountryCodeSelection(){
    let selectedCountry = document.getElementById("country-code-selection");
    document.getElementById("country-code").textContent = "(+"+selectedCountry.value+")"
}

function onKeyDownEvent(activeCell, event){
    if(event.key==="Backspace"){
        onBackspace(activeCell, event);
    }
}

let currentCellValues = ["","","","","","","","","",""];
function onMobileNumberChange(activeCell){
    let cellValue = document.getElementById(activeCell).value;
    if(cellValue!="" && (cellValue<"0" || cellValue>"9") ){
        document.getElementById(""+activeCell).value = "";
    }else{
        let currentCellValue = currentCellValues[activeCell];
        let newCellValue = document.getElementById(activeCell).value;

        if(currentCellValue!=="" && currentCellValue!==newCellValue 
            && newCellValue!="" && newCellValue>="0" && newCellValue<="9"){
                document.getElementById(activeCell).value = 
                    (newCellValue.substring(0,1)===currentCellValue) ? newCellValue.substring(1,2) : newCellValue.substring(0,1);
        }
        currentCellValues[activeCell] = document.getElementById(activeCell).value;


        moveToNextCell(activeCell);
    }
}

function validateSingleCell(activeCell, event){
    let cellValueValid = true;
    let enteredValue = ""+event.key;
    if(enteredValue!="" && (enteredValue<"0" || enteredValue>"9") ){
        cellValueValid=false;
    }
    return cellValueValid;
}

function moveToNextCell(activeCell){
    let nextCellIndex = parseInt(activeCell)+1;
    if(nextCellIndex<=9){
        document.getElementById(""+activeCell).blur();
        document.getElementById(""+nextCellIndex).focus();
    }
}

function onBackspace(activeCell, event){ 
    setTimeout(
        ()=>{
            if(event.key==="Backspace"){  
                currentCellValues[activeCell] = "";
                let previousCell = parseInt(activeCell)-1;
                if(previousCell>=0){
                    document.getElementById(""+activeCell).blur();
                    document.getElementById(""+previousCell).focus();
                    document.getElementById(""+previousCell).value="";
                }
            }
        }, 10
    );
}

function getMobileNumber(){
    let mobileNumber = "";
    mobileNumber += document.getElementById("country-code-selection").value;
    for(let i=0; i<=9; i++){
        let cellValueValid = true;
        let cellValue = ""+i;
        if(cellValue!="" && (cellValue<"0" || cellValue>"9") ){
            cellValueValid=false;
            document.getElementById(""+activeCell).value = "";
        }

        if(document.getElementById(""+i).value!="" && cellValueValid){
            mobileNumber += document.getElementById(""+i).value;;
        }else{
            mobileNumber=""; break;
        }
    }
    return mobileNumber;
}

function onSubmit(){
    let mobileNumber = getMobileNumber();
    if(mobileNumber!==""){
        window.open("https://wa.me/"+mobileNumber, "_self");
    }else{
        window.alert("Mobile number invalid");
    }
}