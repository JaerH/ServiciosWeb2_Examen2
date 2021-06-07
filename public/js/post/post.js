class Post {
  constructor() {
    // TODO inicializar firestore y settings

    this.db = firebase.firestore();
  }

  crearPost(uid, emailUser, titulo, descripcion, imagenLink, videoLink) {
    return this.db
      .collection("posts")
      .add({
        uid: uid,
        autor: emailUser,
        titulo: titulo,
        descripcion: descripcion,
        imagenLink: imagenLink,
        videoLink: videoLink,
        /* fecha : firebase.firestore.FieldValue.serverTimestamp()*/
      })
      .then((refDoc) => {
        console.log(`Id del post => ${refDoc.id}`);
      })
      .catch((error) => {
        console.error(`Error creando el post => ${error}`);
      });
  }

  consultarTodosPost() {
    this.db.collection(`posts`).onSnapshot((querySnapshot) => {
      $("#posts").empty();
      if (querySnapshot.empty) {
        $("#posts").append(this.obtenerTemplatePostVacio());
      } else {
        querySnapshot.forEach((post) => {
          let postHtml = this.obtenerPostTemplate(
            post.data().autor,
            post.data().titulo,
            post.data().descripcion,
            post.data().videoLink,
            post.data().imagenLink
            /*  Utilidad.obtenerFecha(post.data().fecha.toDate())*/
          );
          $("#posts").append(postHtml);
        });
      }
    });
  }

  consultarPostxUsuario(emailUser) {
    this.db
      .collection(`posts`)
      .where("autor", "==", emailUser)
      .onSnapshot((querySnapshot) => {
        $("#posts").empty();
        if (querySnapshot.empty) {
          $("#posts").append(this.obtenerTemplatePostVacio());
        } else {
          querySnapshot.forEach((post) => {
            let postHtml = this.obtenerPostTemplatexUsuario(
              post.data().autor,
              post.data().titulo,
              post.data().descripcion,
              post.data().videoLink,
              post.data().imagenLink
              /*    Utilidad.obtenerFecha(post.data().fecha.toDate())*/
            );
            $("#posts").append(postHtml);
          });
        }
      });
  }

  obtenerTemplatePostVacio() {
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
  </article>`;
  }

  obtenerPostTemplate(
    autor,
    titulo,
    descripcion,
    videoLink,
    imagenLink,
    fecha
  ) {
    if (imagenLink) {
      return;
    }

    return ` <div class="col-md-6 content-main">
     <div class="content-sec">                
         <div class="portfolio-container">
             <div class="portfolio-details">
                 <a href="#">
                    <h2>${titulo}</h2>
                 </a>
                 <a href="#">
                    <p>— Autor: ${autor}</p>
                 </a>
             </div> 
             <div>
                 <img  class="img-fluid img-content" src="assets/images/post.jpeg" alt="">
             </div>
             
         </div>
         <div>
             <h4>Mejorando la UI en la web</h4>
             <p>${descripcion}</p>
         </div>    
     </div>
 </div>
 `;
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

  obtenerPostTemplatexUsuario(
    autor,
    titulo,
    descripcion,
    videoLink,
    imagenLink,
    fecha
  ) {
    if (imagenLink) {
      return;
    }

    return ` <div class="col-md-6 content-main">
    <div class="content-sec">                
        <div class="portfolio-container">
            <div class="portfolio-details">
                <a href="#">
                   <h2>${titulo}</h2>
                </a>
                <a href="#">
                   <p>— Autor: ${autor}</p>
                </a>
            </div> 
            <div>
                <img  class="img-fluid img-content" src="assets/images/pexel3.jpg" alt="">
            </div>
            
        </div>
        <div>
            <h4>Mejorando la UI en la web</h4>
            <p>${descripcion}</p>
        </div>
        <div class="content-miBoton">
            <button type="button" class="miBoton btn btn-outline-primary">Actualizar</button>
            <button type="button" class="miBoton btn btn-outline-light btn-delete">Eliminar</button>
           <!-- <a class="btn-sm miBoton boton-Actualizar"  href="#" role="button">Actualizar</a>
            <a class="btn-sm miBoton btn-light"  href="#" role="button">Eliminar</a> -->
        </div>
        
    </div>
</div>
`;
  }

  obtenerPostPersonalizado() {}
}
