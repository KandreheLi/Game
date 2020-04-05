import React from 'react';
import { drawBall } from './utils/index'

export default class Game extends React.Component {
    constructor(props) {
        super(props)
        this.canvasRef = React.createRef();
        this.context = {}
        this.x = 0;
        this.y = 0;
        this.dx = 2;
        this.dy = -2;
        this.ballRadius = 10;
        this.paddleHeight = 10;
        this.paddleWidth = 75;
        this.paddleX = 0;
        this.rightPressed = false;
        this.leftPressed = false;
        this.keyDownHandler = this.keyDownHandler.bind(this);
        this.keyUpHandler = this.keyUpHandler.bind(this);
        document.addEventListener("keydown", this.keyDownHandler, false);
        document.addEventListener("keyup", this.keyUpHandler, false);
        this.interval = {};
    }
    componentDidMount() {
        this.context = this.canvasRef.current.getContext('2d');
        this.x = this.canvasRef.current.width / 2;
        this.y = this.canvasRef.current.height - 30;
        this.paddleX = (this.canvasRef.current.width - this.paddleWidth) / 2;
        setTimeout(() => {
            this.interval = setInterval(() => {
                this.draw();
            }, 10);
        }, this.props.delay);
        
    }
    render() {
        return (
            <div style={{border:'solid', display: 'inline-block'}}>
                <canvas style={{ background: 'aquamarine' }} width='300' height='300'
                    ref={this.canvasRef}>
                </canvas>
            </div>
        );
    }


    keyDownHandler(e) {
        if (e.key == "Right" || e.key == "ArrowRight") {
            this.rightPressed = true;
        }
        else if (e.key == "Left" || e.key == "ArrowLeft") {
            this.leftPressed = true;
        }
    }

    keyUpHandler(e) {
        if (e.key == "Right" || e.key == "ArrowRight") {
            this.rightPressed = false;
        }
        else if (e.key == "Left" || e.key == "ArrowLeft") {
            this.leftPressed = false;
        }
    }
    draw() {
        this.context.clearRect(0, 0, this.canvasRef.current.width, this.canvasRef.current.height);
        drawBall(this.x, this.y, this.ballRadius, this.context);
        this.drawPaddle();
        if (this.x + this.dx > this.canvasRef.current.width - this.ballRadius || this.x + this.dx < this.ballRadius) {
            this.dx = -this.dx;
        }
        if (this.y + this.dy < this.ballRadius) {
            this.dy = -this.dy;
            this.canvasRef.current.height -= this.props.reduceHeight||0;
        }
        else if (this.y + this.dy > this.canvasRef.current.height - this.ballRadius - this.paddleHeight) {
            if (this.x > this.paddleX && this.x < this.paddleX + this.paddleWidth) {
                this.dy = -this.dy;
                this.paddleWidth+=10;
            }
            else {
                //this.props.done();
                alert("GAME OVER");
                document.location.reload();
                clearInterval(this.interval); // Needed for Chrome to end game
            }
        }

        if (this.rightPressed && this.paddleX < this.canvasRef.current.width - this.paddleWidth) {
            this.paddleX += 3;
        }
        else if (this.leftPressed && this.paddleX > 0) {
            this.paddleX -= 3;
        }

        this.x += this.dx;
        this.y += this.dy;
    }
    drawPaddle() {
        this.context.beginPath();
        this.context.rect(this.paddleX, this.canvasRef.current.height - this.paddleHeight, this.paddleWidth, this.paddleHeight);
        this.context.fillStyle = "#0095DD";
        this.context.fill();
        this.context.closePath();
    }
}