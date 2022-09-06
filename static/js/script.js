const urlApi = 'https://api-links-tech.herokuapp.com/links'

getAllLinks()

// Button create
document.querySelector('#btn-create').addEventListener('click', () => {
  let testFormCreate = 0
  let formCreateTitle = document.forms[0].elements[0].value
  let formCreateUrl = document.forms[0].elements[1].value

  if (formCreateTitle == '' || formCreateUrl == '') {
    testFormCreate = 1
    alert('Preencha os campos Titulo e Url')
  }

  if (testFormCreate == 0) {
    const newLink = {
      title: formCreateTitle,
      url: formCreateUrl
    }

    createLink(newLink)
    setTimeout(function () {
      location.reload()
    }, 1000)
  }
})

//button Update
function btnUpdate(id) {
  let testFormUpdate = 0
  let formUpdateTitle = document.forms[0].elements[0].value
  let formUpdateUrl = document.forms[0].elements[1].value

  if (formUpdateTitle == '' || formUpdateUrl == '') {
    testFormUpdate = 1
    alert('Preencha os campos Titulo e Url')
  }

  if (testFormUpdate == 0) {
    const linkUpdate = {
      title: formUpdateTitle,
      url: formUpdateUrl
    }

    updateLink(linkUpdate, id)
    setTimeout(function () {
      location.reload()
    }, 1000)
  }
}

//Button Delete
function btnDelete(id) {
  deleteLink(id)
  setTimeout(function () {
    location.reload()
  }, 1000)
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
                  <h4 class="card-title d-flex justify-content-center text-dark">${title}</h4>
                  <div class="row">
                    <div class="col-md-12 pt-2 text-center">
                      <a class="btn btn-secondary" target="_blank" href=${url}>Visitar</a>
                      <button onclick="btnUpdate(id)" class="btn btn-primary" id="${id}">Atualizar</button>
                      <button onclick="btnDelete(id)" class="btn btn-danger" id="${id}">Deletar</button>
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
