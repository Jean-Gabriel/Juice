# Juice
[![Build Status](https://travis-ci.org/Jean-Gabriel/Juice.svg?branch=master)](https://travis-ci.org/Jean-Gabriel/Juice)

Juice is the name of the project/programming language for my [virtual machine](https://github.com/Jean-Gabriel/JuiceVM).

## Why
After writing my [virtual machine](https://github.com/Jean-Gabriel/JuiceVM), I figured out it would be nice if I could write a program in a human readable language, output it to bytecode and run it with the vm.
This project also represents a good challenge for me which is a motivating factor. 

## Roadmap
* Write the emitter.
* Add `if`, `for`, `while` statement support.
* Add type checking.

## Example of Juice code
```
obj Person {
    string fullName
    uint age
    boolean canDrive
}

fun canDriveAt(uint age): boolean {
    return age >= 17
}

fun welcomeName(string message, string name): nothing {
    print(message)
    print(name)
}

fun main(): nothing {
    val welcomeMessage = "Wow hi"
    val john = new Person

    john.fullName = "John Pablo"
    john.age = 21
    john.canDrive = canDriveAt(john.age)

    welcomeName(welcomeMessage, john.fullName)

    print(john.age) # 21
    print(john.canDrive) # 1
}

```
