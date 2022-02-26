const code = document.querySelector('.code')
const input = document.querySelector('.input')
const hidden = document.querySelectorAll('.hidden')

const alphabet = [...'abcdefghijklmnopqrstuvwxyz']

function addNewLine(letter) {
  return `${letter === 'z' ? '\n' : ''}`
}

function iterateLetters(letter, i) {
  const others = `[@not${letter.toUpperCase()} @NOT${letter} @Etc]`
  return `sub ${letter} ${others.repeat(i).replaceAll('][','] [')} ${letter}' by ${letter.toUpperCase()}
          sub ${letter.toUpperCase()} ${others.repeat(i).replaceAll('][','] [')} ${letter.toUpperCase()}' by ${letter}; ${addNewLine(letter)}`
}

function makeFeature(iterations) {
  let i = 1
  let output = alphabet.map(letter => 
    `sub ${letter} ${letter}' by ${letter.toUpperCase()}
     sub ${letter.toUpperCase()} ${letter.toUpperCase()}' by ${letter}; ${addNewLine(letter)}`
    ).join('\n')
    while (i <= iterations) {
      output += alphabet.map(letter => 
        iterateLetters(letter, i)
    ).join('\n')
    i++
  }
  code.innerText = `
# ${iterations} iterations
${output}`
}

function handleSubmit(e) {
  e.preventDefault()
  makeFeature(input.iteration.value)
  hidden.forEach(hider => {
    hider.classList.toggle('hidden')
  })
}

input.addEventListener('submit', handleSubmit)
