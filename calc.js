const calculator = document.querySelector(".container");
calculator.addEventListener("mousedown", (e) => {
    let grabPoint = {
        yDelta: e.clientY - calculator.getBoundingClientRect().top,
        xDelta: e.clientX - calculator.getBoundingClientRect().left,
    };
    const drag = (e) => {
        calculator.style.left = `${e.clientX - grabPoint.xDelta}px`;
        calculator.style.top = `${e.clientY - grabPoint.yDelta}px`;
    };
    window.addEventListener("mousemove", drag);
    window.addEventListener("mouseup", () => {
        window.removeEventListener("mousemove", drag);
    }, {once: true});
});

const numKeys = document.querySelectorAll('.nums > button:not(#op-equals, #decimal)');
const display = document.querySelector('.display');
numKeys.forEach((numBtn) => {
    numBtn.addEventListener('click', () => {
        display.value += numBtn.textContent;
    });
})

const decimalKey = document.querySelector("#decimal");
decimalKey.addEventListener('click', () => {
    if(!display.value.includes('.')) display.value += '.';
})
