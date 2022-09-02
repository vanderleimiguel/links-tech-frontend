async function link() {
  let response = await fetch(`https://api-links-tech.herokuapp.com/links`)
  let data = await response.json()
  for (i = 0; i < data.length; i++) {
    let title = data[i].title
    let url = data[i].url

    document.querySelector('#cards').insertAdjacentHTML(
      'beforeend',
      `
    <div class="col">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title d-flex justify-content-center">${title}</h5>
            <p class="card-text d-flex justify-content-center">
              <a href=${url}>Link</a
            </p>
            <div class="d-grid gap-2 d-md d-flex justify-content-center">
            <button class="btn btn-primary" type="button">Editar</button>
            <button class="btn btn-primary" type="button">Deletar</button>
          </div>
        </div>
      </div>
    </div>
    `
    )
  }
}

link()
