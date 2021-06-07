$(() => {
  $('.tooltipped').tooltip({ delay: 50 })
  /*$('.modal').modal()*/

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

  firebase.auth().onAuthStateChanged(user => {

      if(user){
          $('#btnInicioSesion').text('Cerrar Sesión')

          if(user.photoURL){
              $('#avatar').attr('src', user.photoURL)
          }else{
              $('#avatar').attr('src', 'assets/images/usuario_auth.png')
          }
      }else{
          $('#btnInicioSesion').text('Iniciar Sesión')
          $('#avatar').attr('src', 'assets/images/usuario_auth.png')
      }
  })

  $('#btnInicioSesion').click(() => {

      const user = firebase.auth().currentUser
      const post = new Post();
      if(user){
        $('#btnInicioSesion').text('Iniciar Sesión')
        
        post.consultarTodosPost();

        return firebase.auth().signOut()
        .then(() => {
            $('#avatar').attr('src', 'imagenes/usuario.png')
           Swal.fire({
            position: 'center',
            icon: 'success',
            title: `Has Cerrado Sesión`,
            showConfirmButton: false,
            timer: 1500
          })
        })
        .catch(error => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `Error al Cerrar Sesión`,
          })
        })

      }

    $('#emailSesion').val('')
    $('#passwordSesion').val('')
    $('#modalSesion').modal('show')
  })

  $('#avatar').click(() => {
      firebase.auth().signOut()
      .then(() => {
          $('#avatar').attr('src', 'imagenes/usuario.png')
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: `Has Cerrado Sesión`,
            showConfirmButton: false,
            timer: 1500
          })
      })
      .catch(error => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `Error al Cerrar Sesión`,
        })
      })
  })

  $('#btnTodoPost').click(() => {

    const post = new Post();
    post.consultarTodosPost();

    $('#comentarios').show()
    $('#contactanos').show()
    $('#aniadir').hide()
    $('#testimonial').show()
    $('#contact').show()
 
  })

  $('#btnMisPost').click(() => {
      const user = firebase.auth().currentUser
      
      if(user){ 
 
        $('#aniadir').show()
        $('#tituloPost').text('Mis Servicios')
        
        const post = new Post()
        post.consultarPostxUsuario(user.email)
        
        $('#comentarios').hide()
        $('#contactanos').hide()
        $('#testimonial').hide()
        $('#contact').hide()
        
      }else{
       
        Swal.fire({
          title: 'No estas Registrado',
          text: `Debes estar autenticado para ver tus Servicios`,
          icon: 'warning',
        })
      }  
  })
})
