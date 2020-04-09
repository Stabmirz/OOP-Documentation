// *** In OOP we combined a groups of related variables and functions into an unit. we call this unit an object. We refer to this variable as Properties and the Functions as method.

// **** Four Piller of Object oriented Programming *****

//  1. Encapsulation : using encapsulation we group related variable variables and functions together. Encapsulation reduces complexity and increase reusability.

// 2. Abtraction : we hide the details and complexity and shows only the essentials. Abtraction reduces complexity and increase reusability.

// 3. Inheritance : Inheritance helps us eliminate redunded code. We can build an generic Object and help other Object inherite the Propertice and Method.


// Polimorphism : Polimorphism means Many Form. This is a technik to get rid of long if / else or switch / catch statement. In Polimorphism method we can implement a render method for each of the Object and the methode will behave differently depending on the type of the object we are referencing. 

//  *** Value vs Reference type

//  Value / Primitives Types : Number, String , Boolean, Symbol, undefine, null 
// Primitives are copied by the value

// ** example 1 **

let x = 10; // value is stored in variable
let y = x; // x and y are independent from each other
x = 20

console.log(x) // 20

console.log(y) // 10

// ** example 2 **

let number = 10;
function increase(number){
    number++;
}
increase(number);
console.log(number); // 10


// Reference Type : Object, Function, Array
// Objects are copied by the reference

//  ** example 1 **

let x1 = {value:10};

// Object is not stored in variable. An object is stored somewhere in the memory and the address of that memory location is stored in that Variable. 

let y1 = x1;
x1.value = 20

console.log(x1) // {value:20}
console.log(y1) // {value:20}

// ** example 2 ** 

let obj = {value:10};

function increaseValue(obj){
   obj.value++;
}
increase.value(obj);
console.log(obj); // {value: 11}


// adding property to an Object in Javascript

function Circle(radius){
    this.radius=radius;
    this.draw=function(){
        console.log('draw');
    }
};

const circle = new Circle(10);

// we can use dot notation or bracket notation to add properties to an object in Javascript. If we know the name of the property we can use dot notation to an object. But if we don't know the name of the property, i.e. to add a dynamic property to an object we us bracket notation. Also If the property name has space or dash in between, we cant usedot notation.

circle.location = {x:1}; // dot notation

// const propertyName = 'center location'; 
const propertyName = 'center-location';  // property name includes space or dash in between

// circle['center location'] = {x:1};

circle[propertyName]= {x:1};

// *** delete a property from an Object ****

// we use 'delete operator' to delete a property from an Object

delete circle.location;
// delete circle['center location'];
delete circle[propertyName];


// Itterate over or Enumerating Properties in an object

//  we can do that using an "for in loop"

for (let key in circle){
    console.log(key); 
    // radius
    // draw
}


// if you want to get the value of the property 

for (let key in circle){
    console.log(key, circle[key]); 
    //  radius 10
    //  draw f(){ console.log('draw')}
}

// if you want to get the value of the properties excluding mathode , you can use "typeof" methode in an if condition


for (let key in circle){
    if (typeof circle[key] !== 'function')
        console.log(key, circle[key]); 
    //  radius 10
}

// if you want to get all the keys of an Object

const keys = Object.keys(circle);
console.log(keys);// it will return an array of keys .... in our example it will give => ["radius","draw"]

