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
    $('#tituloDescripcionNewPost').val('')
    $('#descripcionNewPost').val('')
    $('#btnUploadFile').val('')
    $('.determinate').attr('style', `width: 0%`)
    /*sessionStorage.setItem('imgNewPost', null)*/



    $('#modalPost').modal('show')
  }
  })

  $('#btnRegistroPost').click(() => {
    const post = new Post()

    const user = firebase.auth().currentUser
    const titulo = $('#tituloNewPost').val()
    const tituloDescripcion = $('#tituloDescripcionNewPost').val()
    const descripcion = $('#descripcionNewPost').val()
    const imagenLink = sessionStorage.getItem('imgNewPost') == 'null'
      ? null
      : sessionStorage.getItem('imgNewPost')

    post
      .crearPost(
        user.uid,
        user.email,
        titulo,
        tituloDescripcion,
        descripcion,
        imagenLink
      )
      .then(resp => {
       Swal.fire({
        position: 'center',
        icon: 'success',
        title: `Post creado correctamente`,
        showConfirmButton: false,
        timer: 1500
      })
        $('.modal').modal('hide')
      })
      .catch(err => {
      })
  })

  $('#btnUploadFile').on('change', e => {

    const file = e.target.files[0]

    const user = firebase.auth().currentUser

    const post = new Post()
    post.subirImagenPost(file, user.uid)

    // TODO: Referencia al storage
    
  }) 

  

  
  $('#PostActualizar').click(() =>{

    
    let id = $('#servicio').closets('.oldPost').attr('id')
    let titulo = $('#servicio').closets('.autor').text()
    let tituloDescripcion = $('#servicio').closets('h4').text()
    let descripcion = $('#servicio').closets('#descripcion').text()

    $('#tituloNewPost1').val(titulo)
    $('#tituloDescripcionNewPost1').val(tituloDescripcion)
    $('#descripcionNewPost1').val(descripcion)

    $('#modalPostActualizar').modal('show')


  })


  $('#btnActualizaPost').click(() =>{

      const db = firebase.database();
      colleccionServicios = db.ref().child('posts')

      let id = $('#id').val()
      let titulo = $('#tituloNewPost').val()
      let tituloDescripcion = $('#tituloDescripcionNewPost').val()
      let descripcion = $('#descripcionNewPost').val()
      let imagenLink = sessionStorage.getItem('imgNewPost') == 'null'
                        ? null
                        : sessionStorage.getItem('imgNewPost')

      let idFirebase = id
      if(idFirebase == ''){
        idFirebase = colleccionServicios.push().key
      }

      data = {titulo : titulo,
              tituloDescripcion : tituloDescripcion,
              descripcion : descripcion,
              imagenLink : imagenLink
            }

       actualizacionData = {}
       actualizacionData[`/${idFirebase}`] = data     
       colleccionServicios.update(actualizacionData)

       id = '';
          
       $('#modalPostActualizar').modal('hide')

  })  






})
