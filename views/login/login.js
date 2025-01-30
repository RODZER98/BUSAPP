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

formulario.addEventListener('submit',async e=>{
  e.preventDefault()

  if(datosLogin.email && datosLogin.password){
    const response = await axios.get('/api/users',datosLogin);
  }
})