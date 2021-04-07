const ul = document.querySelector("ul")
const input = document.querySelector("input")
const form = document.querySelector('form')

async function load() {
   const res = await fetch("http://localhost:3000")
   .then((data) => data.json())

   console.log(res.urls)
   
   res.urls.map(({name, url}) => addElement({name, url}))
}

load()


function addElement({ name, url }) {
    const li = document.createElement('li')
    const a = document.createElement("a")
    const trash = document.createElement("span")

    a.href = url
    a.innerHTML = name
    a.target = "_blank"

    trash.innerHTML = "x"
    trash.onclick = () => removeElement(trash, url, name)

    li.append(a)
    li.append(trash)
    ul.append(li)
}

async function removeElement(el, url, name) {
    if (confirm('Tem certeza que deseja deletar?')) {
        el.parentNode.remove()
        // await fetch(`http://localhost:3000/?name=${a.innerHTML}&url=${a.href.slice(0, a.href.length - 1)}&del=1`)
        await fetch(`http://localhost:3000/?name=${name}&url=${url}&del=1`)
    }

}

// async function createElementJSON({name, url}) {
//     await fetch(`http://localhost:3000/?name=${name}&url=${url}`)
// }

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    let { value } = input

    if (!value) 
        return alert('Preencha o campo')

    const [name, url] = value.split(",")

    if (!url) 
        return alert('formate o texto da maneira correta')

    if (!/^http/.test(url)) 
        return alert("Digite a url da maneira correta")

    addElement({ name, url })
    // createElementJSON({name, url})
    
    await fetch(`http://localhost:3000/?name=${name}&url=${url}`)

    input.value = ""
})