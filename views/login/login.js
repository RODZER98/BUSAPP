const emailInput = document.querySelector('#email-input');
const passwordInput = document.querySelector('#password-input');
const formulario = document.querySelector('#formulario');

const datosLogin={
  email:'',
  password:''
}

//console.log(email);
emailInput.addEventListener('input',e=>{
  //valemail = e.target.value;
  datosLogin.email=e.target.value;
  console.log(datosLogin.email);
});

//console.log(email);
passwordInput.addEventListener('input',e=>{
  //valemail = e.target.value;
  datosLogin.password=e.target.value;
  console.log(datosLogin.password);
});

formulario.addEventListener('submit', async e => {
  e.preventDefault();

  if (datosLogin.email && datosLogin.password) {
    try {
      console.log('Enviando datos de login:', datosLogin);
      const response = await axios.get('/api/users/lista-users', datosLogin);
      console.log('Respuesta del servidor:', response.data);

      const arreglo = response.data.data;
      console.log(arreglo);
      const {password,rol} = arreglo;
      console.log(password,rol);
      const usuario = arreglo.some(usuario => usuario.email === datosLogin.email);
      console.log('Usuario encontrado:', usuario);




      
      
     // const { email } = response.data.data;
      
      //console.log('Usuario recibido:', email);

      if (usuario) {
        // Almacenar el token en localStorage
        //localStorage.setItem('authToken', token);

        if (arreglo.some(usuario => usuario.email === datosLogin.email)){       
        //const usuario = arreglo.map(usuario => usuario.email === datosLogin.email && usuario.password)              
          //console.log(usuario.rol)

          const usuario = arreglo.map(usuario =>{
            
                if(usuario.email === datosLogin.email){

                    if (usuario.rol === 'admin') {

                      window.location.href = '/admin/';

                    } else {

                      window.location.href = '/perfil/';

                    }

                  }

              });

        } else {

          alert('Usuario o contraseña incorrectos');

        }

      }

    } catch (error) {

      console.error('Error al iniciar sesión:', error.response ? error.response.data : error.message);

      alert('Error al iniciar sesión. Por favor, inténtelo de nuevo más tarde.');

    }

  } else {

    alert('Por favor, complete todos los campos');

  }

});
