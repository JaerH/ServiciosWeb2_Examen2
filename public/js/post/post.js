class Post {
  constructor () {
      // TODO inicializar firestore y settings

      this.db = firebase.firestore()

     // const settings = { timestampsInSnapshot : true}
      //this.db.settings(settings)


  }

  crearPost (uid, emailUser, titulo, descripcion, imagenLink, videoLink) {

        return this.db.collection('posts').add({
            uid : uid,
            autor : emailUser,
            titulo : titulo,
            descripcion : descripcion,
            imagenLink : imagenLink,
            videoLink : videoLink,
            fecha : firebase.firestore.FieldValue.serverTimestamp()
        })
        .then( refDoc => {
            console.log(`Id del post => ${refDoc.id}`);
        })
        .catch(error => {
            console.error(`Error creando el post => ${error}`)
        })
  }

  consultarTodosPost () {

    this.db.collection(`posts`).onSnapshot(querySnapshot => {
        $('#posts').empty()
        if (querySnapshot.empty){
            $('#posts').append(this.obtenerTemplatePostVacio())
        }else{
            querySnapshot.forEach(post => {
                let postHtml = this.obtenerPostTemplate(
                    post.data().autor,
                    post.data().titulo,
                    post.data().descripcion,
                    post.data().videoLink,
                    post.data().imagenLink,
                    Utilidad.obtenerFecha(post.data().fecha.toDate())
                    
                )
                $('#posts').append(postHtml)
            })
        }
    })
  }

  consultarPostxUsuario (emailUser) {
    this.db.collection(`posts`)
    .where('autor' , '==' , emailUser)
    .onSnapshot(querySnapshot => {
        $('#posts').empty()
        if (querySnapshot.empty){
            $('#posts').append(this.obtenerTemplatePostVacio())
        }else{
            querySnapshot.forEach(post => {
                let postHtml = this.obtenerPostTemplate(
                    post.data().autor,
                    post.data().titulo,
                    post.data().descripcion,
                    post.data().videoLink,
                    post.data().imagenLink,
                    Utilidad.obtenerFecha(post.data().fecha.toDate())
                    
                )
                $('#posts').append(postHtml)
            })
        }
    })
  }



  obtenerTemplatePostVacio () {
    return `<article class="post">
      <div class="post-titulo">
          <h5>Crea el primer Post a la comunidad</h5>
      </div>
      <div class="post-calificacion">
          <a class="post-estrellita-llena" href="*"></a>
          <a class="post-estrellita-llena" href="*"></a>
          <a class="post-estrellita-llena" href="*"></a>
          <a class="post-estrellita-llena" href="*"></a>
          <a class="post-estrellita-vacia" href="*"></a>
      </div>
      <div class="post-video">
          <iframe type="text/html" width="500" height="385" src='https://www.youtube.com/embed/bTSWzddyL7E?ecver=2'
              frameborder="0"></iframe>
          </figure>
      </div>
      <div class="post-videolink">
          Video
      </div>
      <div class="post-descripcion">
          <p>Crea el primer Post a la comunidad</p>
      </div>
      <div class="post-footer container">         
      </div>
  </article>`
  }

  obtenerPostTemplate (
    autor,
    titulo,
    descripcion,
    videoLink,
    imagenLink,
    fecha
  ) {
    if (imagenLink) {
      return 
    }

    /*return `<article class="post">
                <div class="post-titulo">
                    <h5>${titulo}</h5>
                </div>
                <div class="post-calificacion">
                    <a class="post-estrellita-llena" href="*"></a>
                    <a class="post-estrellita-llena" href="*"></a>
                    <a class="post-estrellita-llena" href="*"></a>
                    <a class="post-estrellita-llena" href="*"></a>
                    <a class="post-estrellita-vacia" href="*"></a>
                </div>
                <div class="post-video">
                    <iframe type="text/html" width="500" height="385" src='${videoLink}'
                        frameborder="0"></iframe>
                    </figure>
                </div>
                <div class="post-videolink">
                    Video
                </div>
                <div class="post-descripcion">
                    <p>${descripcion}</p>
                </div>
                <div class="post-footer container">
                    <div class="row">
                        <div class="col m6">
                            Fecha: ${fecha}
                        </div>
                        <div class="col m6">
                            Autor: ${autor}
                        </div>        
                    </div>
                </div>
            </article>`*/
            
     return  `
     <div class="col-md-6" style="margin-bottom: 20px" >
     <div  style="background-color:#f5f5f5; border: 2px solid #f5f5f5; border-radius: 15px; padding: 50px;">
                       
     <div class="portfolio-container">
         <div class="portfolio-details">
             <a href="#">
                 <h2>Keep Calm and Eat</h2>
             </a>
             <a href="#">
                 <p>— App/Digital Product</p>
             </a>
         </div> 
         <div>
             <img  class="img-fluid" style="border-radius: 10px;" src="assets/images/pexel3.jpg" alt="">
         </div>
        
     </div>
     <div>
         <h3>Mejorando la UI en la web</h3>
         <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci optio fugit voluptate quas quibusdam, sed, inventore, dicta cupiditate fugiat libero deserunt facere tempore voluptates laudantium voluptatum? Ullam rem atque quis.</p>
     </div>
 </div>
 </div>
 `
       
  }

 /* `<div class="col-md-6" style="border: 3px black">
     
  <div class="portfolio-container">
      <div class="portfolio-details">
      
          <a href="#">
              <h2>${titulo}</h2>
          </a>
          <a href="#">
              <p>— Autor: ${autor}</p>
          </a>
          <p>${descripcion}</p>
      </div>
      
      <img src="assets/images/pexel3.jpg" class="img-fluid" alt="JavaScript">
  </div>
  
</div>`*/




  obtenerPostPersonalizado(){

  }
}
