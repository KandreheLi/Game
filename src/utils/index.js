export const drawBall = (x, y, radius, context) => {
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2, false);
    context.fillStyle = "#FF0000";
    context.fill();
    context.closePath();
}



