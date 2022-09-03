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

// Button update
document.querySelector('#btn-update').addEventListener('click', () => {
  let formUpdateId = document.forms[1].elements[0].value
  let formUpdateTitle = document.forms[1].elements[1].value
  let formUpdateUrl = document.forms[1].elements[2].value
  const linkUpdate = {
    title: formUpdateTitle,
    url: formUpdateUrl
  }
  updateLink(linkUpdate, formUpdateId)
  setTimeout(function () {
    location.reload()
  }, 1000)
})

// Button delete
document.querySelector('#btn-delete').addEventListener('click', () => {
  let formDeleteId = document.forms[2].elements[0].value
  deleteLink(formDeleteId)
  setTimeout(function () {
    location.reload()
  }, 1000)
})

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
          `
              <div class="col">
                <div class="card">
                  <div class="card-body" >
                    <a class="text-decoration-none text-dark" target="_blank" href=${url}>
                      <h4 class="card-title d-flex justify-content-center text-dark">${title}</h4>
                    </a
                      <h6 class="card-title">ID: ${id}</h6>
                  </div>
                </div>
              </div>
              `
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
  console.log('delete entrou')
  axios
    .delete(`${urlApi}/delete/${id}`)
    .then(response => {
      console.log(response.data)
    })
    .catch(error => console.error(error))
}
