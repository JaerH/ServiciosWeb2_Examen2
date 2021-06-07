$(() => {
  $('#btnModalPost').click(() => {

    const user = firebase.auth().currentUser

    if(user == null){

      Swal.fire({
        title: 'No estas Registrado',
        text: `Debes estar autenticado para añadir un Servicio`,
        icon: 'warning',
      })

      $("#btnRegistroPost").attr("id","btnModalPost");
      return
    }else{
      
      $('#tituloNewPost').val('')
    $('#descripcionNewPost').val('')
    $('#linkVideoNewPost').val('')
    $('#btnUploadFile').val('')
    $('.determinate').attr('style', `width: 0%`)
    sessionStorage.setItem('imgNewPost', null)

    // TODO: Validar que el usuario esta autenticado

    // Materialize.toast(`Para crear el post debes estar autenticado`, 4000)

    $('#modalPost').modal('show')
  }
  })

  $('#btnRegistroPost').click(() => {
    const post = new Post()

    // TODO: Validar que el usuario esta autenticado
    //const user = firebase.auth().currentUser

    /*if(user == null){
      Swal.fire({
        title: 'No estas Registrado',
        text: `Debes estar autenticado para añadir un Servicio`,
        icon: 'warning',
      })

      $("#btnRegistroPost").attr("id","btnModalPost");
      return 
    }*/

    // Materialize.toast(`Para crear el post debes estar autenticado`, 4000)
    const user = firebase.auth().currentUser
    const titulo = $('#tituloNewPost').val()
    const descripcion = $('#descripcionNewPost').val()
    const videoLink = $('#linkVideoNewPost').val()
    const imagenLink = sessionStorage.getItem('imgNewPost') == 'null'
      ? null
      : sessionStorage.getItem('imgNewPost')

    post
      .crearPost(
        user.uid,
        user.email,
        titulo,
        descripcion,
        imagenLink,
        videoLink
      )
      .then(resp => {
       // Materialize.toast(`Post creado correctamente`, 2000)
       Swal.fire({
        position: 'center',
        icon: 'success',
        title: `Post creado correctamente`,
        showConfirmButton: false,
        timer: 1500
      })
        $('.modal').modal('close')
      })
      .catch(err => {
      //  Materialize.toast(`Error => ${err}`, 4000)
      })
  })

  $('#btnUploadFile').on('change', e => {
    // TODO: Validar que el usuario esta autenticado

    // Materialize.toast(`Para crear el post debes estar autenticado`, 4000)

    const file = e.target.files[0]

    // TODO: Referencia al storage
    
  })
})