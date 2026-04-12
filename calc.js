let grabPoint;

const calculator = document.querySelector(".container");
calculator.addEventListener("mousedown", (e) => {
    grabPoint = {
        yDelta: e.clientY - calculator.getBoundingClientRect().top,
        xDelta: e.clientX - calculator.getBoundingClientRect().left,
    };
});

calculator.addEventListener("mousemove", (e) => {
    if(e.buttons === 1){
        e.preventDefault();
        calculator.style.left = `${e.clientX - grabPoint.xDelta}px`;
        calculator.style.top = `${e.clientY - grabPoint.yDelta}px`;
    }
})