//Prototypal Inheritance
//myPerson --> Person.prototype --> Object.prototype --> null

class Person {
    constructor(firstName, lastName, age, likes = []) {
        this.firstName = firstName
        this.lastName = lastName
        this.age = age
        this.likes = likes
    }
    getBio() {
        let bio = `${this.firstName} is ${this.age}.`

        this.likes.forEach((like) => {
            bio += ` ${this.firstName} likes ${like}.`
        })

        return bio
    }
    set fullname(fullname) {
        const names = fullname.split(' ')
        this.firstName = names[0]
        this.lastName = names[1]
    }
    get fullname() {
        return `${this.firstName} ${this.lastName}`
    }
}

class Employee extends Person {
    constructor (firstName, lastName, age, position, likes) {
        super(firstName, lastName, age, likes)
        this.position = position
    }

    getBio() {
        // Alan is a ${Position}
        return `${this.firstName} ${this.lastName} is a ${this.position}.`
    }

    getYearsLeft() {
        return 65 - this.age
    }
}

class Student extends Person {
    constructor(firstName, lastName, age, grade, likes) {
        super(firstName, lastName, age, likes)
        this.grade = grade
    }

    getBio() {
        const status = this.grade >= 70 ? 'passing' : 'failing'
        return `${this.firstName} is ${status} the class`
    }

    updateGrade(newGrade) {
        this.grade += newGrade
    }
}



const me = new Employee('Alan', 'Anaya', 25, 'Developer', ['Coding', 'Football'])
console.log(me.getYearsLeft())

const person1 = new Person('Abel', 'Anaya', 55)
console.log(person1.getBio())

const student = new Student('Alan', 'Anaya', 25, 85)
console.log(student.getBio())
student.updateGrade(-30)
console.log(student.getBio())