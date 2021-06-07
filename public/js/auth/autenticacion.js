class Autenticacion {
  autEmailPass (email, password) {

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((result) => {       
        if (result.user.emailVerified){
          $('#avatar').attr('src', 'imagenes/usuario_auth.png')
          /*Materialize.toast(`Bienvenido ${result.user.displayName}`, 5000)*/
          console.log("se ha registrado");
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: `Bienvenido ${result.user.displayName}`,
            showConfirmButton: false,
            timer: 1500
          })
          
        }
        else{
          firebase.auth().signOut();
          /*Materialize.toast(`¡Debes realizar el proceso de verificación!`, 5000)*/
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `¡Debes realizar el proceso de verificación!`,
          })
          console.log()
        }    
      })
      .catch((error) => {
        /*var errorCode = error.code;
        var errorMessage = error.message;*/
        Swal.fire({
          icon: 'error',
          title: 'Email inválido',
          text: error.code,
        })
    });

   /* $('.modal').modal('hide')*/

    //$('#avatar').attr('src', 'imagenes/usuario_auth.png')
    //Materialize.toast(`Bienvenido ${result.user.displayName}`, 5000)
    //$('.modal').modal('close')
   
  }

  crearCuentaEmailPass (email, password, nombres) {

   firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(result => {
                result.user.updateProfile({
                  displayName: nombres
                })     
                
                const configuracion = {
                  url: "http://localhost/Smart-Agency/public/"
                }               

               result.user.sendEmailVerification(configuracion)
               .catch(error => {
                 console.error(error)
                 /*Materialize.toast(error.message, 4000)*/
                 Swal.fire({
                  icon: 'error',
                  title: 'Error al enviar el email de verificación',
                  text: 'error.message',
                })
                })

                 firebase.auth().signOut()
                 /*Materialize.toast(`Bienvenido ${nombres}, debes realizar el proceso de verificación!`, 4000)*/

                 Swal.fire(
                  'Usuario Registrado!',
                  `Bienvenido ${nombres}, debes realizar el proceso de verificación!`,
                  'success'
                )

                 $('.modal').modal('hide')
              
            })
            .catch(error => {
                console.error(error)
               /* Materialize.toast(error.message, 4000)*/
               Swal.fire({
                icon: 'error',
                title: 'Usuario no Registrado',
                text: error.message,
              })
            })

           
    /*Materialize.toast(
      `Bienvenido ${nombres}, debes realizar el proceso de verificación`,
      4000
    )

    $('.modal').modal('close')*/
    
  }

  authCuentaGoogle () {

      const provider = new firebase.auth.GoogleAuthProvider()

      firebase.auth().signInWithPopup(provider)
      .then(result => {
         $('#avatar').attr('src', result.user.photoURL)
         $('.modal').modal('hide')
         /*Materialize.toast(`Bienvenido ${result.user.displayName} !! `, 4000)*/
         Swal.fire({
          position: 'center',
          icon: 'success',
          title: `Bienvenido ${result.user.displayName}`,
          showConfirmButton: false,
          timer: 1500
        })
      })
      .catch(error => {
        console.error(error);
        /*Materialize.toast(`Error al autenticarse con Google: ${error}` , 4000)*/
        Swal.fire({
          icon: 'error',
          title: `Error al autenticarse con Google: ${error}`,
          text: 'error.message',
        })
      })

    //$('#avatar').attr('src', result.user.photoURL)
    //$('.modal').modal('close')
    //Materialize.toast(`Bienvenido ${result.user.displayName} !! `, 4000)
  }

  authCuentaFacebook () {

    const provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider)
    .then(result => {
      //$('#avatar').attr('src', result.additionalUserInfo.profile.picture.data.url); en caso no se muestre la imagen al autenticarse con facebook
      $('#avatar').attr('src', result.user.photoURL)
      $('.modal').modal('hide')
      /*Materialize.toast(`Bienvenido ${result.user.displayName} !! `, 4000)*/
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: `Bienvenido ${result.user.displayName}`,
        showConfirmButton: false,
        timer: 1500
      })
   })
   .catch(error => {
    console.error(error);
    /*Materialize.toast(`Error al autenticarse con Facebook: ${error}` , 4000)*/
    Swal.fire({
      icon: 'error',
      title: `Error al autenticarse con Facebook: ${error}`,
      text: 'error.message',
    })
  })
    //$('#avatar').attr('src', result.user.photoURL)
    //$('.modal').modal('close')
    //Materialize.toast(`Bienvenido ${result.user.displayName} !! `, 4000)
  }

  authTwitter () {
    // TODO: Crear auth con twitter
  }
}
