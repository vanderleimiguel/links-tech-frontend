const urlApi = 'https://api-links-tech.herokuapp.com/links'

getAllLinks()

// Button create
document.querySelector('#btn-create').addEventListener('click', () => {
  let formCreateTitle = document.forms[0].elements[0].value
  let formCreateUrl = document.forms[0].elements[1].value
  const newLink = {
    title: formCreateTitle,
    url: formCreateUrl
  }
  createLink(newLink)
  setTimeout(function () {
    location.reload()
  }, 1000)
})

//button Update
function btnUpdate() {
  const buttonsUpdate = document.querySelectorAll('#btn-update')
  for (let buttonUpdate of buttonsUpdate) {
    buttonUpdate.addEventListener('click', () => {
      const textUpdate = buttonUpdate.parentElement.innerText.split('ID: ')
      const text2Update = textUpdate[1]
        .replace('Visitar', '')
        .replace('Deletar', '')
        .replace('Atualizar', '')
        .trim()
      const updateId = text2Update

      let formUpdateTitle = document.forms[0].elements[0].value
      let formUpdateUrl = document.forms[0].elements[1].value
      const linkUpdate = {
        title: formUpdateTitle,
        url: formUpdateUrl
      }

      updateLink(linkUpdate, updateId)
      setTimeout(function () {
        location.reload()
      }, 1000)
    })
  }
}

//Button Delete
function btnDelete() {
  console.log('1clique')
  const buttonsDelete = document.querySelectorAll('#btn-delete')
  for (let buttonDelete of buttonsDelete) {
    buttonDelete.addEventListener('click', () => {
      console.log('2clique')
      const textDelete = buttonDelete.parentNode.innerText.split('ID: ')
      const text2Delete = textDelete[1]
        .replace('Visitar', '')
        .replace('Deletar', '')
        .replace('Atualizar', '')
        .trim()
      const deleteId = text2Delete
      deleteLink(deleteId)
      setTimeout(function () {
        location.reload()
      }, 1000)
    })
  }
}

function getAllLinks() {
  axios
    .get(urlApi)
    .then(response => {
      const data = response.data
      for (i = 0; i < data.length; i++) {
        let id = data[i]._id
        let title = data[i].title
        let url = data[i].url
        document.querySelector('#cards').insertAdjacentHTML(
          'beforeend',
          `<div class="col">
              <div class="card">
                <div class="card-body" >
                  <a class="text-decoration-none text-dark" target="_blank" href=${url}>
                  <h4 class="card-title d-flex justify-content-center text-dark">${title}</h4>
                  </a
                  <div class="row">
                    <div class="col-md-12 pt-2 text-center">
                      <p class="card-title">ID: ${id}</p>
                      <a class="btn btn-secondary" target="_blank" href=${url}>Visitar</a>
                      <button onclick="btnUpdate()" class="btn btn-primary" id="btn-update">Atualizar</button>
                      <button onclick="btnDelete()" class="btn btn-danger" id="btn-delete">Deletar</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>`
        )
      }
    })
    .catch(error => console.log(error))
}

function createLink(newLink) {
  axios
    .post(`${urlApi}/create`, newLink)
    .then(response => {
      console.log(response.data)
    })
    .catch(error => console.error(error))
}

function updateLink(linkUpdate, id) {
  axios
    .put(`${urlApi}/update/${id}`, linkUpdate)
    .then(response => {
      console.log(response.data)
    })
    .catch(error => console.error(error))
}

function deleteLink(id) {
  axios
    .delete(`${urlApi}/delete/${id}`)
    .then(response => {
      console.log(response.data)
    })
    .catch(error => console.error(error))
}
