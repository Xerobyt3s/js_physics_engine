//a function that reduces velocity over time
function friction(velocity) {
    if (velocity.x < 0 && !keyboard.a) {
        if (velocity.x < -0.3){
            velocity.x += 0.2;
        } else velocity.x = 0;
    }
    if (velocity.x > 0 && !keyboard.d) {
        if (velocity.x > 0.3){
            velocity.x -= 0.2;
        } else velocity.x = 0;
    }
    if (velocity.y > 0 && !keyboard.s) {
        if (velocity.y > 0.3){
            velocity.y -= 0.2;
        } else velocity.y = 0;
    }
    if (velocity.y < 0 && !keyboard.w) {
        if (velocity.y < -0.3){
            velocity.y += 0.2;
        } else velocity.y = 0;
    }
}

//a class representing vectors and adds functions for vector operations
class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    add(vector) {
        return new Vector(this.x + vector.x, this.y + vector.y);
    }

    substraction(vector) {
        return new Vector(thisx - vector.x, this.y - vector.y);
    }

    magnitude() {
        return Math.sqrt(this.x**2 + this.y**2);
    }

    multiply(multiplyer) {
        return new Vector(this.x * multiplyer, this.y * multiplyer);
    }

    normalise() {
        if (this.magnitude() === 0) { 
            return new Vector(0, 0)
        } else {
            return new Vector(this.x/this.magnitude(), this.y/this.magnitude());
        }
    }
                

    //displayes the vector from a costom origo for trubbleshooting purposes
    displayVector(pos_x, pos_y, multiplyer, thickness, color) {
        line(pos_x, pos_y, pos_x + this.x* multiplyer, pos_y + this.y* multiplyer, thickness, color)
    }

    

}

class Ball {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.velocity = new Vector(0, 0);
        this.acceleration = new Vector(0, 0);
        this.accelerationConstant = 0.2;
        this.maxspeed = 8;

    }

    draw(radius, color) {
        circle(this.x, this.y, radius, color);
    }

    showAccelerationVector(multiplyer, thickness, color){
        line(this.x, this.y, this.x + this.acceleration.x* multiplyer, this.y + this.acceleration.y* multiplyer, thickness, color)
    }

    //update actual position acording to velocity
    updatePosition() {
        this.x += this.velocity.x;
        this.y += this.velocity.y;
    }

    acceleration() {
        this.acceleration = new Vector(0, 0);
        if (keyboard.w && this.velocity.y > -this.maxspeed) {this.acceleration.y = -1}
        if (keyboard.s && this.velocity.y < this.maxspeed) {this.acceleration.y = 1}
        if (keyboard.w && keyboard.s) {this.acceleration.y = 0}
        if (keyboard.d && this.velocity.x < this.maxspeed) {this.acceleration.x = 1}
        if (keyboard.a && this.velocity.x > -this.maxspeed) {this.acceleration.x = -1}
        if (keyboard.d && keyboard.a) {this.acceleration.x = 0}
        this.acceleration = this.acceleration.normalise()
        this.acceleration = this.acceleration.multiply(this.accelerationConstant)
        this.velocity = this.velocity.add(acceleration)
        if (this.velocity.magnitude() > this.maxspeed) {
            this.velocity = this.velocity.normalise().multiply(this.maxspeed)
        }
    }

}

//ball one
let ball1 = new Ball(300, 400)

//ball two
let ball2Pos = [600, 400]
let velocity2 = new Vector(0, 0);

        
function update() {
    clearScreen();


    ball1.draw(40, "red")
    ball1.velocity.displayVector(ball1.x, ball1.y, 20, 2, "blue")
    ball1.showAccelerationVector(500, 2, "green")
            
    
    circle(ball2Pos[0], ball2Pos[1], 40, "blue");


    ball1.updatePosition();


    //calls in friction function
    friction(ball1.velocity)
    friction(velocity2)

    //acceleration
    ball1.acceleration = new Vector(0, 0);
    if (keyboard.w && ball1.velocity.y > -ball1.maxspeed) {ball1.acceleration.y = -1}
    if (keyboard.s && ball1.velocity.y < ball1.maxspeed) {ball1.acceleration.y = 1}
    if (keyboard.w && keyboard.s) {ball1.acceleration.y = 0}
    if (keyboard.d && ball1.velocity.x < ball1.maxspeed) {ball1.acceleration.x = 1}
    if (keyboard.a && ball1.velocity.x > -ball1.maxspeed) {ball1.acceleration.x = -1}
    if (keyboard.d && keyboard.a) {ball1.acceleration.x = 0}
    ball1.acceleration = ball1.acceleration.normalise()
    ball1.acceleration = ball1.acceleration.multiply(ball1.accelerationConstant)
    ball1.velocity = ball1.velocity.add(ball1.acceleration)
    if (ball1.velocity.magnitude() > ball1.maxspeed) {
        ball1.velocity = ball1.velocity.normalise().multiply(ball1.maxspeed)
    }


               
}
        