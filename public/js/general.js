$(() => {
  $('.tooltipped').tooltip({ delay: 50 })

   firebase.initializeApp(varConfig);
   firebase.analytics();
  const post = new Post();
  post.consultarTodosPost();

  firebase.auth().onAuthStateChanged(user => {

      if(user){
          $('#btnInicioSesion').text('Cerrar Sesión')

          if(user.photoURL){
              $('#avatar').attr('src', user.photoURL)
          }else{
              $('#avatar').attr('src', 'assets/images/usuario_auth.jpg')                    
          }
      }else{
          $('#btnInicioSesion').text('Iniciar Sesión')
          $('#avatar').attr('src', 'assets/images/usuario_auth.jpg')
      }
  })

  $('#btnInicioSesion').click(() => {

      const user = firebase.auth().currentUser
      const post = new Post();
      if(user){

        $('#comentarios').show()
        $('#contactanos').show()
        $('#btnInicioSesion').text('Iniciar Sesión')
        const h2 = document.querySelector("#tituloPost");
        h2.innerHTML = 'Trabajamos con marcas interesantes <b>y creamos excelentes productos</b>'
        


        post.consultarTodosPost();

        return firebase.auth().signOut()
        .then(() => {
            $('#avatar').attr('src', 'assets/images/usuario.jpg')
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
          $('#avatar').attr('src', 'assets/images/usuario.jpg')
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

    const h2 = document.querySelector("#tituloPost");
    h2.innerHTML = 'Trabajamos con marcas interesantes <b>y creamos excelentes productos</b>'
    

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
