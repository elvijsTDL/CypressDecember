//Showcasing Cypress running unit tests of fizz buzz

function fizzBuzz(number) {
  if(number % 3 === 0 && number % 5 === 0) {
    return "FizzBuzz"
  }
  if(number % 3 === 0) {
    return "Fizz"
  }
  if(number % 5 === 0) {
    return "Buzz"
  }
  return "Not a multiple of 3 or 5 :("
}

function fizzBuzzChecker(array , expectedResult) {
  array.forEach((number) => {
    expect(fizzBuzz(number)).to.eq(expectedResult)
  })
}

describe('First day unit test cases example for fizz buzz', () => {
  it('Returns Fizz if the number is a multiple of 3', () => {
    fizzBuzzChecker([3,6,9,12,18],"Fizz")
  })

  it('Returns Buzz if the number is a multiple of 5', () => {
    fizzBuzzChecker([5,10,20,25,35],"Buzz")
  })

  it('Returns FizzBuzz if the number is a multiple of 3 and 5', () => {
    fizzBuzzChecker([15,30,45,60,75],"FizzBuzz")
  })

  it('Returns a sad string if its not a multiple of 3 or 5', () => {
    fizzBuzzChecker([1,2,4,7,8],"Not a multiple of 3 or 5 :(")
  })

})