function Particle(color = [1,1,1], position = [0,0,0], velocity = [0,0,0], force = [0,0,0], pointSize = 5.0, friction = 0.2, bounciness = 0.7) {
    this.mass = 1;
    this.position = position;
    this.color = color;
    this.velocity = velocity;
    this.force = force;
    this.pointSize = pointSize;
    this.bounciness = bounciness;
    this.friction = friction;

    this.update = function(groundHeight){

        this.applyGravity();
        this.collisionWithGround(groundHeight);

        add(this.position, scaleArray(k*dt,this.velocity));
        add(this.velocity, scaleArray(k*dt/this.mass,this.force));
    } 

    this.applyGravity = function(){
        this.force[1] = - this.mass * g;            
    }

    this.collisionWithGround = function(groundHeight){
        if(this.position[1] + k*dt*this.velocity[1] < groundHeight){
            if(this.velocity[1] > -0.5){
                this.velocity = [0,0,0];
                this.position[1] = groundHeight ;
            }else{
                this.velocity[1] *= -bounciness;
                this.velocity[0] *= (1.0-friction);   
                this.velocity[2] *= (1.0-friction);                    
            }
        }
    }
}

var epsilon = 0.05;