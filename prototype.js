// **** Prototype is essentially the parent of an Object **** 

// A prototype is a regular Object. Every Object in JavaScript has a Prototype or parent except the root Object ( ObjectBase); All functions in Javascript is an Object. It has properties and methods.

// every object we define has an ObjectBase.

let y = {};
// here we defined an Object y. We didn't inherit it from any object. But in JavaScript every Object we define has an ObjectBase and get access of it's all methods.

// when we try to access a property, method/member,  of an Object, javascript engine look for that method on that object itself. If it cant find that member then it looks at the Prototype (parent) of that object. All the way up to its root Object thats we call ObjectBase.


// ***** Multilevel Inheritance ******

let myArray = [];

// here we have defined an empty array. if we console.log(typeof(myArray)) we will see it is a Javascript Object. If we inspect it we will see that it has a prototype (ArrayBase) with multiple methods. And this ArrayBase has a Prototype (ObjectBase); 
// so wee see that myArray derives from ArrayBase and Arrabase derives from ObjectBase. This is what we call Multilevel inheritance.

function Circle(radius){
    this.radius=radius;
    this.draw=function(){
        console.log('draw');
    }
};

const circle = new Circle(10);

// Object created by a given Constructor will have the same prototype. Also all array created by array constructor will have the same prototype.

// in the example above circle object is created from the Circle constructor. So circle object inherits from circleBase (Circle) and circleBase inherits from ObjectBase.



//  ******* Property Descriptor **********


let Person = { name : Abi};

Object.defineProperty(Person, 'name',{
    //changing value of different Attribute

    writable:false, // this will make the name property read only. We will not be able to change the value of name property by "person.name = 'something else' ";
    enumerable:false, // the property of person object is no more itteratable by using 'foreach' or 'for in' loop. If we do console.log(Object.keys(person)) if will give us an empty array.
    configurable:false //  now we cant name property using 'delete person.name' ;
});

///    ********** Prototype vs Instance Member **********

function Circle(radius){
    this.radius=radius;
    this.draw=function(){
        console.log('draw');
    }
};

const c1 = new Circle(10);
const c2 = new Circle(10);

// if we create multiple object from a constructor, every object will get the properties of that contructor. In the example above we have 2 object c1 and c2. Both Objects will have the radius property and the draw methods. if we have many objects with these methods it will take more space in the memory. In these case we can set these methods as a Prototypical methods in the ObjectBase (Root Object) we can save these memories and all objects will be able to access those methods as well, as when we try to access a property, method/member,  of an Object, javascript engine look for that method on that object itself. If it cant find that member then it looks at the Prototype (parent) of that object. All the way up to its root Object thats we call ObjectBase.
 
function Circle(radius){
    //Instance members
    this.radius=radius;

    this.move=function(){
        this.draw();
    }
};

const c1 = new Circle(10);
const c2 = new Circle(10);

// Protptype Members

Circle.prototype.draw=function(){
    console.log(draw);
}

// now we can do this

c1.draw();
c1.toSring(); // "[Object Object]"

// we can also overwrite the implementation of a prototypical method. For example : 
// it does not matter where we change the Prototype. We can create an instrance of an object and then modified the prototype. the modified property will still be available to the new created object. In the example above,we created an Object c1 and then we modified the prototype. c1 can access the 'draw' method. 


Circle.prototype.toSring=function(){
    return('Circle with radius '+ this.radius);
}

c1.toSring() // "Circle with radius 1";

// we can call an Instance member in a Prototype member as well as a prototype member in a Instance member . In the example above inside of the Circle constructor : we have instance method "move" and we can call the prototype method "draw" inside of "move" method.

// To get the own/instance properties:
Object.keys(obj);

console.log(Object.keys(c1)); // ["move","radius"]

// To get all the properties (instance + prototype): 
for (let key in c1) {
    console.log(key);
    // radius
    // move
    // draw
}

// to find out if a property/method is instance member or prototype member we use : 

c1.hasOwnProperty('radius') // true;
c1.hasOwnProperty('draw') // false; because draw is a prototype member


//  *************** Prototypical Inheritance   **************************** 

function Shape(){
}

Shape.prototype.duplicate = function(){
    console.log("duplicate");
}

function Circle(radius){
    //Instance members
    this.radius=radius;
};

// Protptype Members

Circle.prototype.draw=function(){
    console.log(draw);
}

const s = new Shape();
const c = new Circle(10);

// in the example above we have a 'Shape' constructor that has a protptype member "duplicate" and we have a 'Circle' constructor that has a protptype member "draw".We have two objects "s" that inherits from "Shape" constructor and "c" that inherits from "Circle" constructor. now if we want to have same "duplicate" method in 'c' object thats has the same implementation like the prototype member of "Shape" constructor, we dont want to redefine a 'duplicate' method for "c" object like this :

Circle.prototype.duplicate = function(){
    console.log("duplicate");
}

// rather we want top do a prototypical inheritance.
// our 'c' object inherits from 'CircleBase' and 'CircleBase' inherits from 'ObjectBase'. on the other hand 's' object inherits from 'ShapeBase' and 'ShapeBase' inherits from 'ObjectBase'. So if we want that out 'c' object will have access to all instance and prototypical member of 'CircleBase' as well as 'Shapebase' we can easily do the prototypical inheritance. Our 'CircleBase' will inherits from 'ShapeBase'. so at the end we will have an 'c' object that inherits from 'CircleBase', 'CircleBase' inherits from 'ShapeBase' and 'ShapeBase' inherits from 'ObjectBase'.
// in jevascript we have the function 'Object.create()' that create an new object base on the given prototype.

Circle.prototype = Object.create(Object.prototype) // 'CircleBase' inherits from 'ObjectBase'
new Circle.prototype.constructor() // Circle{}

Circle.prototype = Object.create(Shape.prototype) // 'CircleBase' inherits from 'ShapeBase'  it calls prototypical inheritance.

// now we have to reset the constructor of 'Circle' by writing

new Circle.prototype.constructor() // it will return Shape{} because we didn't reset the constructor of Circle

// so whenever we reset the prototype of an object as best practice  we should also reset the constructor of that object.

Circle.prototype.constructor = Circle;


//  *************** Calling the Super Constructor   **************************** 

// if we want that all shape will have a color so we have to modify the Shape Constructor like this :

function Shape(color){
    this.color = color;
}

Shape.prototype.duplicate = function(){
    console.log("duplicate");
}

// so if we want that our 'c' object will also have the color , so we have to call the super constructor (Shape constructor) in the Circle constructor

function Circle(radius, color){
    //Instance members
    this.radius=radius;

    // ****  call the super constructor *****
    
    // we remember that when we create an object using "new" operator , this 'new' operator create an empty object in the memory and set 'this' to pointing that new object. below we created a 'c' object using 'new' operator, so it set the 'radius' property to that 'c' object and finally 'c' object is returned from 'Circle' constructor. If we would not use 'new' operator, 'c' object would be returned from 'Circle' constructor but 'this' would be pointing to the global object (window object) that means 'radius' property would be set to the window object. 
    
    Shape(color) // it will not work. as this will set the color property to the window object so we cant call it like this 

    new Shape(color); // we also cant do that because it will create another new object and set color property to that new object

    // so to call the super constructor we have to follow the following method : 
    // we call the Shape function and set 'this' to point to the new instance to new object ( 'c' object or any object that we will create using 'Circle' constructor ) 

    Shape.call(this,color); // now if we do console.log(c), we will get a Circle{color:'red', radius:10}
};

// Protptype Members

Circle.prototype.draw=function(){
    console.log(draw);
}

const s = new Shape('blue');
const c = new Circle(10, 'red');


//  *************** Intermediate Function Inheritance   ****************************

// in the example above in prototypical inheriitance we created an object 'c' that inherits from 'CircleBase' and we wanted to have the instance of "Shape" constractor so our 'CircleBase' (Circle Constructor) inherits from 'ShapeBase' (Shape Constructor) and 'ShapeBase' inherits from 'ObjectBase' (root object) and then reset the Constructor of 'Circle' . If we have another constructor like :

function Square(size){
    this.size = size;
}

let sq = new Square(10)

// and we want inherits 'SquareBase' frome 'ShapeBase' we have to rewrite the following code 

Square.prototype = Object.create(Shape.prototype);
Square.prototype.constructor = Square;

// every time we want to do a protptypical inheritance we have to write this code. We can encapsulate this code (logic) and create a Function so that we can reuse it every time we want to do a prototypical inheritance 

function extend(Child, Parent){
    Child.prototype = Object.create(Parent.prototype);
    Child.prototype.constructor = Child;
}

// the first letter of the parameter is uppercase because we expect this to be the constructor function. now we can just call the function and do the protptypical inheritance that call Intermediate Function Inheritance

extend(Square, Shape); 


//  **************** Method Overriding **********************


function extend(Child, Parent){
    Child.prototype = Object.create(Parent.prototype);
    Child.prototype.constructor = Child;
}

function Shape(){
}

Shape.prototype.duplicate = function(){
    console.log("duplicate");
}

function Circle(){
}

extend(Circle,Shape);

const c = new Circle();

console.log(c.duplicate()) // 'duplicate';

// in some case may be the methods implementation that we have defined in the parent Object may not work or be ideal for the child object. In that case we do the method override . So we override the method that we defined in the parent object like this :


function extend(Child, Parent){
    Child.prototype = Object.create(Parent.prototype);
    Child.prototype.constructor = Child;
}

function Shape(){
}

Shape.prototype.duplicate = function(){
    console.log("duplicate");
}

function Circle(){
}

extend(Circle,Shape);


Circle.prototype.duplicate = function(){
    console.log("duplicate circle");
}

// although we have 2 implementation of duplicate method, if we call that method now, the implementation in the child Objetct will work.

const c = new Circle();

console.log(c.duplicate()) // 'duplicate method'; 

// we have to keep in mind that we override the method after resetting the constructor because if we override the method and then reset the constructor then if we call the 'duplicat' method the implementation of the parent object will work. we can also call the implementation of parent object in the child object like that 

Circle.prototype.duplicate = function(){
    Shape.prototype.duplicate.call(this);
    console.log("duplicate circle");
}


//   ************  Polymorphism ************** 


function extend(Child, Parent){
    Child.prototype = Object.create(Parent.prototype);
    Child.prototype.constructor = Child;
}

function Shape(){
}

Shape.prototype.duplicate = function(){
    console.log("duplicate");
}

function Circle(){
}

extend(Circle,Shape);


Circle.prototype.duplicate = function(){
    console.log("duplicate circle");
}

function Square(){
}

extend(Square,Shape);


Square.prototype.duplicate = function(){
    console.log("duplicate square");
}

const shapes = [
    new Circle(),
    new Square
];

// now if we itterare over 'shapes' and call the 'duplicate' method, based on the shape a different implementation of the 'duplicate' method will be call. 

for (let shape of shapes){
    shape.duplicate(); 
};
//  duplicate circle 
//  duplicate square

// so we have many forms of the 'duplicate' method and 


// ************** mixins *******************

// Don't create large inheritance hierarchies. 
// One level of inheritance is fine. 

// if we have an 'Animal'  (constructor) with 2 methods 'canWalk' and 'canEat', we can create a new 'person' object using inheritance from 'Animal' , we can also create an 'Dog' object in the same way. But we can not create a 'Goldfish' because a Goldfish 'canEat' but can't walk. So if we want to use inheritance we have to create an 'Animal' Object with 'canEat' method then create 2 new objects 'mammals' ( canWalk ) and 'fish' (canSwim) from 'Animal' and the wen can create a 'Person' and a 'Dog' object derive from 'Mammals' and 'Goldfish' derives from 'Fish'. so we see it will get more complex if we have different types of animal. So we should avoid creating inheritance hierarchies.
// In this case we can use 'composition' . With composition we can compose few objects together to create a new object.

// Use mixins to combine multiple objects 
// and implement composition in JavaScript. 

const canEat = { 
    eat: function() {
        this.hunger--;
        console.log(eating);
    }
};

const canWalk = {
    walk: function() {
        console.log('walking');
    }
};

const canSwim= {
    swim: function() {
        console.log('swim');
    }
};

// in ES6 we have a method called 'assign'; We can use this to copy properties and methods from one object to another. So we pass an 'empty object' as target and pass one or more object as 'source objects'. So all the properties and methods of those 'source objects' will bt copied into the empty object. 

const person = Object.assign({}, canEat, canWalk);

// so our person object will have all the methods and properties of 'canEat' and 'canWalk' objects.

console.log(person); //  {eat:f, walk:f}

// we can also create a constructor 'Person' modify the prototype and add 'eat' and 'walk' capability to it like this :

function Person(){
};

Object.assign(Person.prototype, canEat, canWalk);

const person = new Person();

// so this 'person' will have 'eat' and 'walk' methods in the prototype.

// we can also create a goldfish object like this :

function GoldFi(){
};

Object.assign(Goldfish.prototype, canEat, canSwim);

const goldfish = new Goldfish();

// we can extract 'Object.assign(target, ...sources)' into a funtion to make the code reusable. 

function mixin(target, ...sources) { // '...' called 'rest operator' in ES6 it will collect all the argument and turned them into an array
    // Copies all the properties from all the source objects to the target object. 
    Object.assign(target, ...sources); // this time '...' its called 'spread operator' . it spreads an array into multiple objects
}

function Person() {}

mixin(Person.prototype, canEat, canWalk);
mixin(Goldfish.prototype, canEat, canSwim);


