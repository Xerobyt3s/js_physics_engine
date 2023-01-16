

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

        //ball one
        let ball1Pos = [300, 400]
        let velocity1 = new Vector(0, 0);
        let acceleration = new Vector(0, 0);
        let accelerationConstant = 0.2
        let maxspeed = 8;
        let notterminalvelocity = false;

        //ball two
        let ball2Pos = [600, 400]
        let velocity2 = new Vector(0, 0);


        let balldistance;

        
        function update() {
            clearScreen();


            circle(ball1Pos[0], ball1Pos[1], 40, "red");
            velocity1.displayVector(ball1Pos[0], ball1Pos[1], 10, 2, "black")
            
            circle(ball2Pos[0], ball2Pos[1], 40, "blue");

            balldistance = distance(ball1Pos[0], ball1Pos[1], ball2Pos[0], ball2Pos[1]);

            //update actual position acording to velocity
            ball1Pos[0] += velocity1.x;
            ball1Pos[1] += velocity1.y;


            //calls in friction function
            friction(velocity1)
            friction(velocity2)

            //acceleration
            acceleration = new Vector(0, 0);
            notterminalvelocity = velocity1.magnitude() < maxspeed;
            if (keyboard.w && notterminalvelocity) {
                acceleration.y = -1
            }
            if (keyboard.s && notterminalvelocity) {
                acceleration.y = 1
            }
            if (keyboard.w && keyboard.s) {
                acceleration.y = 0
            }
            if (keyboard.d && notterminalvelocity) {
                acceleration.x = 1
            }
            if (keyboard.a && notterminalvelocity) {
                acceleration.x = -1
            }
            if (keyboard.d && keyboard.a) {
                acceleration.x = 0
            }
            acceleration = acceleration.normalise()
            acceleration = acceleration.multiply(accelerationConstant)
            velocity1 = velocity1.add(acceleration)
            console.log(velocity1, acceleration)


            //collicion
            if (balldistance < 80) {
                
            }
            
        }
        