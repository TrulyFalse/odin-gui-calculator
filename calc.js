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
