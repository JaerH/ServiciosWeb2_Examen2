$(() => {
  $('.tooltipped').tooltip({ delay: 50 })
  $('.modal').modal()

  // TODO: Adicionar el service worker

  // Init Firebase nuevamente
   // Initialize Firebase
   firebase.initializeApp(varConfig);
   firebase.analytics();

  // TODO: Registrar LLave publica de messaging

  // TODO: Solicitar permisos para las notificaciones

  // TODO: Recibir las notificaciones cuando el usuario esta foreground

  // TODO: Recibir las notificaciones cuando el usuario esta background

  // TODO: Listening real time
  const post = new Post();
  post.consultarTodosPost();


  // TODO: Firebase observador del cambio de estado

  firebase.auth().onAuthStateChanged(user => {

      if(user){
          $('#btnInicioSesion').text('Cerrar Sesión')

          if(user.photoURL){
              $('#avatar').attr('src', user.photoURL)
          }else{
              $('#avatar').attr('src', 'imagenes/usuario_auth.png')
          }
      }else{
          $('#btnInicioSesion').text('Iniciar Sesión')
          $('#avatar').attr('src', 'imagenes/usuario.png')
      }
  })





  //$('#btnInicioSesion').text('Salir')
  //$('#avatar').attr('src', user.photoURL)
  //$('#avatar').attr('src', 'imagenes/usuario_auth.png')
  //$('#btnInicioSesion').text('Iniciar Sesión')
  //$('#avatar').attr('src', 'imagenes/usuario.png')

  // TODO: Evento boton inicio sesion
  $('#btnInicioSesion').click(() => {

      const user = firebase.auth().currentUser
      const post = new Post();
      if(user){
        $('#btnInicioSesion').text('Iniciar Sesión')
        
        post.consultarTodosPost();

        return firebase.auth().signOut()
        .then(() => {
            $('#avatar').attr('src', 'imagenes/usuario.png')
           /* Materialize.toast(`Realizó un SignOut correcto`, 4000)*/
           Swal.fire({
            position: 'center',
            icon: 'success',
            title: `Has Cerrado Sesión`,
            showConfirmButton: false,
            timer: 1500
          })
        })
        .catch(error => {
          /*Materialize.toast(`Error al realizar el SignOut ${error}`, 4000)*/
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `Error al Cerrar Sesión`,
          })
        })

      }



    //$('#avatar').attr('src', 'imagenes/usuario.png')
    // Materialize.toast(`Error al realizar SignOut => ${error}`, 4000)
    

    $('#emailSesion').val('')
    $('#passwordSesion').val('')
    $('#modalSesion').modal('show')
  })

  $('#avatar').click(() => {
      firebase.auth().signOut()
      .then(() => {
          $('#avatar').attr('src', 'imagenes/usuario.png')
          /*Materialize.toast(`SignOut correcto`, 4000)*/
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: `Has Cerrado Sesión`,
            showConfirmButton: false,
            timer: 1500
          })
      })
      .catch(error => {
        /*Materialize.toast(`Error al realizar el SignOut ${error}`, 4000)*/
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `Error al Cerrar Sesión`,
        })
      })

    //$('#avatar').attr('src', 'imagenes/usuario.png')
    //Materialize.toast(`SignOut correcto`, 4000)
  })

  $('#btnTodoPost').click(() => {
   /* $('#tituloPost').text('Posts de la Comunidad') */
    
    const post = new Post();
    post.consultarTodosPost();
  })

  $('#btnMisPost').click(() => {
      const user = firebase.auth().currentUser
     
      if(user){ 
        const post = new Post()
        post.consultarPostxUsuario(user.email)
        $('#tituloPost').text('Mis Posts')
        
      }else{
        /*Materialize.toast(`Debes estar autenticado para ver tus posts`, 4000) */
        Swal.fire({
          title: 'No estas Registrado',
          text: `Debes estar autenticado para ver tus Servicios`,
          icon: 'warning',
        })
      }

    //$('#tituloPost').text('Mis Posts')
    //Materialize.toast(`Debes estar autenticado para ver tus posts`, 4000)    
  })
})
