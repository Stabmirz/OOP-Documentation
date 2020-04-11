// **** Prototype is essentially the parent of an Object **** 

// A prototype is a regular Object. Every Object in JavaScript has a Prototype or parent except the root Object ( ObjectBase); All functions in Javascript is an Object. It has properties and methods.

// every object we define has a ObjectBase.

let y = {};
// here we defined an Object y. We didn't inherit it from any object. But in JavaScript every Object we define has a ObjectBase and get access of it's all methods.

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

// Protptype Members

Circle.prototype.draw=function(){
    console.log(draw);
}

const c1 = new Circle(10);
const c2 = new Circle(10);

// now we can do this

c1.draw();
c1.toSring(); // "[Object Object]"

// we can also overwrite the implementation of a prototypical method. For example : 

Circle.prototype.toSring=function(){
    return('Circle with radius '+ this.radius);
}

c1.toSring() // "Circle with radius 1";

// we can call an Instance method in a Prototype method . In the example above inside of the Circle constructor : we have instance methode "move" and we can call the prototype methode "draw" inside of "move" methode.