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

function checkBallCollision(object1, object2) {
    let Distance = distance(object1.position.x, object1.position.y, object2.position.x, object2.position.y);
    if (Distance <= object1.radius + object2.radius) {
        return object1.radius + object2.radius - Distance
    } else {return 0}
}

function penetrationReselution(object1, object2) {
    let distanceVector = object1.position.substraction(object2.position)
    let penetrationRes = distanceVector.normalise().multiply(checkBallCollision(object1, object2)/2)
    object1.position = object1.position.add(penetrationRes)
    object2.position = object2.position.add(penetrationRes.multiply(-1))
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
        return new Vector(this.x - vector.x, this.y - vector.y);
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
        this.position = new Vector(x, y)
        this.radius = 40
        this.velocity = new Vector(0, 0);
        this.acceleration = new Vector(0, 0);
        this.accelerationConstant = 0.2;
        this.maxspeed = 8;

    }

    draw(color) {
        circle(this.position.x, this.position.y, this.radius, color);
    }

    showAccelerationVector(multiplyer, thickness, color){
        line(this.position.x, this.position.y, this.position.x + this.acceleration.x* multiplyer, this.position.y + this.acceleration.y* multiplyer, thickness, color)
    }

    //update actual position acording to velocity
    updatePosition() {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }

    //system for applying a force on the ball
    movement() {
        this.acceleration = new Vector(0, 0);
        if (keyboard.w && this.velocity.y > -this.maxspeed) {this.acceleration.y = -1}
        if (keyboard.s && this.velocity.y < this.maxspeed) {this.acceleration.y = 1}
        if (keyboard.w && keyboard.s) {this.acceleration.y = 0}
        if (keyboard.d && this.velocity.x < this.maxspeed) {this.acceleration.x = 1}
        if (keyboard.a && this.velocity.x > -this.maxspeed) {this.acceleration.x = -1}
        if (keyboard.d && keyboard.a) {this.acceleration.x = 0}
        //fixes the issue of the magnitude going over maxspeed in non cardinal directions by normalising the vectors
        this.acceleration = this.acceleration.normalise()
        this.acceleration = this.acceleration.multiply(this.accelerationConstant)
        this.velocity = this.velocity.add(this.acceleration)
        if (this.velocity.magnitude() > this.maxspeed) {
            this.velocity = this.velocity.normalise().multiply(this.maxspeed)
        }
    }

    

}

//ball one
let ball1 = new Ball(300, 400)

//ball two
let ball2 = new Ball(600, 400)

        
function update() {
    clearScreen();

    ball1.draw("red")
    ball1.velocity.displayVector(ball1.position.x, ball1.position.y, 20, 2, "blue")
    ball1.showAccelerationVector(500, 2, "green")
            
    ball2.draw("blue")

    friction(ball1.velocity)
    ball1.movement();
    ball1.updatePosition();

    if (checkBallCollision(ball1, ball2) > 0) {
        penetrationReselution(ball1, ball2);
    }
}
        