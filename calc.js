// arithmetic functions and unified operate function
function add(a, b) {return a + b;}
function subtract(a, b) {return a - b;}
function multiply(a, b) {return a * b;}
function divide(a, b) {return (b !== 0) ? a / b : "I'm sorry Dave, I am afraid I can't do that.";}

const display = document.querySelector('.display');

//global calculator object
let calculator = {
    accumulator: 0,
    operator: null,
    b: 0,
    
    states:{
        START: true,
        INPUT_A: false,
        OPERATOR: false,
        INPUT_B: false,
        RESULT: false,
    },
    setState(stateName){
        for(let key in this.states)
            if(this.states[key]) this.states[key] = false;
        this.states[stateName.toUpperCase()] = true;
    },
    getState() {
        for(let key in this.states) if(this.states[key]) return key;
    },

    operate() {
        switch(this.operator){
            case '+':
                this.accumulator = add(this.accumulator, this.b);
                break;
            case '-':
                this.accumulator = subtract(this.accumulator, this.b);
                break;
            case '×':
            case '*':
                this.accumulator = multiply(this.accumulator, this.b);
                break;
            case '÷':
            case '/':
                this.accumulator = divide(this.accumulator, this.b);
                break;
            default:
                this.accumulator = "unknown operator";
        }
        this.showingResult = true;
        display.value = calculator.accumulator;
    },
}

display.value = calculator.accumulator;

//containerDiv dragging event-handler
const containerDiv = document.querySelector(".container");
containerDiv.addEventListener("mousedown", (e) => {
    let grabPoint = {
        yDelta: e.clientY - containerDiv.getBoundingClientRect().top,
        xDelta: e.clientX - containerDiv.getBoundingClientRect().left,
    };
    const drag = (e) => {
        containerDiv.style.left = `${e.clientX - grabPoint.xDelta}px`;
        containerDiv.style.top = `${e.clientY - grabPoint.yDelta}px`;
    };
    window.addEventListener("mousemove", drag);
    window.addEventListener("mouseup", () => {
        window.removeEventListener("mousemove", drag);
    }, {once: true});
});

// adding event-handlers to num keys
const numKeys = document.querySelectorAll('.nums > button:not(#op-equals)');
numKeys.forEach((numBtn) => {
    numBtn.addEventListener('click', () => {
        if(["START", "RESULT"].includes(calculator.getState())){
            calculator.setState("INPUT_A");
            display.value = numBtn.textContent;
        } else if(["INPUT_A", "INPUT_B"].includes(calculator.getState())){
            if(numBtn.textContent === '.') {
                if(!display.value.includes('.')) display.value += '.';
            } else display.value += numBtn.textContent;
        } else if(calculator.getState() === "OPERATOR"){
            calculator.setState("INPUT_B");
            display.value = numBtn.textContent;

            // removing op-key "pressed" effect css class
            opKeys.forEach((btn) => {
                    if(btn.classList.contains("active")) btn.classList.remove("active");
            });
        }
    });
})



// adding event handlers to operation keys
const opKeys = document.querySelectorAll('.operators > button');
opKeys.forEach((opBtn) => {
    opBtn.addEventListener('click', () => {
        if(["START", "OPERATOR"].includes(calculator.getState())){
            calculator.setState("OPERATOR");
            calculator.operator = opBtn.textContent;
            display.value = calculator.accumulator;

            // removing op-key "pressed" effect css class
            if(calculator.getState() === "OPERATOR"){
                opKeys.forEach((btn) => {
                    if(btn.classList.contains("active")) btn.classList.remove("active");
                });
            }
        } else if(["INPUT_A"].includes(calculator.getState())){
            calculator.setState("OPERATOR");
            calculator.accumulator = +display.value;
            display.value = calculator.accumulator;
            calculator.operator = opBtn.textContent;
        } else if(["INPUT_B"].includes(calculator.getState())){
            calculator.setState("OPERATOR");
            calculator.b = +display.value;
            calculator.operate();
            display.value = calculator.accumulator;
            calculator.operator = opBtn.textContent;
        } else if(["RESULT"].includes(calculator.getState())){
            calculator.setState("OPERATOR");
            calculator.operator = opBtn.textContent;
        }
        opBtn.classList.add("active");
    });
});


const equalsKey = document.querySelector('#op-equals');
equalsKey.addEventListener('click', () => {
    if(["INPUT_A"].includes(calculator.getState())){
        calculator.setState("RESULT");
        calculator.accumulator = +display.value;
        calculator.operate();
        display.value = calculator.accumulator;
    } else if(["OPERATOR"].includes(calculator.getState())){
        calculator.setState("RESULT");
        calculator.accumulator = +display.value; //test commenting out
        calculator.b = calculator.accumulator;
        calculator.operate();
        display.value = calculator.accumulator;
        // removing op-key "pressed" effect css class
        opKeys.forEach((btn) => {
            if(btn.classList.contains("active")) btn.classList.remove("active");
        });
    } else if(["INPUT_B"].includes(calculator.getState())){
        calculator.setState("RESULT");
        calculator.b = +display.value;
        calculator.operate();
        display.value = calculator.accumulator;
    } else if(["RESULT"].includes(calculator.getState())){
        calculator.operate();
        display.value = calculator.accumulator;
    }
});


const clearKey = document.querySelector('#clr');
clearKey.addEventListener('click', () => {
    calculator.setState('START');
    calculator.accumulator = 0;
    calculator.b = 0;
    calculator.operator = null;
    display.value = calculator.accumulator;

    // removing op-key "pressed" effect css class
    opKeys.forEach((btn) => {
        if(btn.classList.contains("active")) btn.classList.remove("active");
    });
});
