const fs = require('fs/promises')
const path = require('path')

async function readData() {
    let data = await fs.readFile(path.join(__dirname, 'data.json'), 'utf-8')
    return data
}

async function addData(name, age) {
    let data = await readData()
    data = await JSON.parse(data)
    let user = data.users.find(user => name === user.name)
    if (!user) {
        try {
            let newUser = {
                name: name,
                age: age
            }
            data.users.push(newUser)
            return await fs.writeFile('data.json', JSON.stringify(data))
        } catch (error) {
            console.log(error)
        }
    } else {
        console.log('user bor')
    }
}

async function userLength() {
    let data = await readData()
    data = await JSON.parse(data)
    console.log(data.users.length)
}

let name = process.argv[2]
name = name.slice(5, name.length)
let age = process.argv[3]
age = age.slice(4, age.length)


addData(name, age) // user qo`shadi
console.log(userLength()) // userlar sonini aniqlaydi

