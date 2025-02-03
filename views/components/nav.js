const navegacion = document.querySelector('#navegacion');

const crearNavHome = () => {
    navegacion.innerHTML = `
     <div class="max-w-7xl h-16 mx-auto flex items-center px-4 justify-between bg-black">

            <a href="/" class="text-white font-bold text-xl">BUSAPP</a>
    
            <!--movil-->
            <svg id="menu-toggle" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10 md:hidden text-white cursor-pointer p-2 rounded-lg hover:bg-gray-700">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
    

            <!--pc-->
            <div class="hidden md:flex flex-row gap-4">
                <a href="/login/" class="text-white font-bold px-4 py-2 rounded-lg hover:bg-gray-700 transition ease-in-out">Login</a>
                <a href="/registro/" class="text-black bg-white font-bold hover:bg-gray-700 px-4 py-2 rounded-lg transition ease-in-out">Registro</a>
            </div>

            <!--movil-->
            <div id="mobile-menu" class="bg-black/60 fixed top-16 right-0 left-0 bottom-0 justify-center text-center flex-col gap-4 hidden">
                <a href="/login/" class="text-white font-bold py-2 px-4 hover:bg-gray-700 rounded-lg transition ease-in-out">Login</a>
                <a href="/registro/" class="bg-white text-black font-bold py-2 px-4 hover:bg-gray-700 rounded-lg transition ease-in-out">Registro</a>
            </div>

    </div>
`

    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
}

const crearNavRegistro = () => {
    navegacion.innerHTML = `
     <div class="max-w-7xl h-16 mx-auto flex items-center px-4 justify-between bg-black">

            <a href="/" class="text-white font-bold text-xl">BUSAPP</a>
    
            <!--movil-->
            <svg id="menu-toggle" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10 md:hidden text-white cursor-pointer p-2 rounded-lg hover:bg-gray-700">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
    

            <!--pc-->
            <div class="hidden md:flex flex-row gap-4">
                <a href="/login/" class="text-white font-bold px-4 py-2 rounded-lg hover:bg-gray-700 transition ease-in-out">Login</a>
                
            </div>

            <!--movil-->
            <div id="mobile-menu" class="bg-black/60 fixed top-16 right-0 left-0 bottom-0 justify-center text-center flex-col gap-4 hidden">
            <a href="/login/" class="text-white font-bold py-2 px-4 hover:bg-gray-700 rounded-lg transition ease-in-out">Login</a>
            
            </div>

    </div>
`

    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
}

const crearNavLogin = () => {
    navegacion.innerHTML = `
     <div class="max-w-7xl h-16 mx-auto flex items-center px-4 justify-between bg-black">

            <a href="/" class="text-white font-bold text-xl">BUSAPP</a>
    
            <!--movil-->
            <svg id="menu-toggle" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10 md:hidden text-white cursor-pointer p-2 rounded-lg hover:bg-gray-700">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
    

            <!--pc-->
            <div class="hidden md:flex flex-row gap-4">
                
                <a href="/registro/" class="text-black bg-white font-bold hover:bg-gray-700 px-4 py-2 rounded-lg transition ease-in-out">Registro</a>
            </div>

            <!--movil-->
            <div id="mobile-menu" class="bg-black/60 fixed top-16 right-0 left-0 bottom-0 justify-center text-center flex-col gap-4 hidden">
            
            <a href="/registro/" class="bg-white text-black font-bold py-2 px-4 hover:bg-gray-700 rounded-lg transition ease-in-out">Registro</a>
            </div>

    </div>
`

    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
}

const crearNavPagos = () => {
    navegacion.innerHTML = `
     <div class="max-w-7xl h-16 mx-auto flex items-center px-4 justify-between bg-black">

            <a href="/" class="text-white font-bold text-xl">BUSAPP</a>
    
            <!--movil-->
            <svg id="menu-toggle" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10 md:hidden text-white cursor-pointer p-2 rounded-lg hover:bg-gray-700">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
    

            <!--pc-->
            <div class="hidden md:flex flex-row gap-4">
            <a href="/perfil/" class="text-black bg-white font-bold hover:bg-gray-700 px-4 py-2 rounded-lg transition ease-in-out">Perfil</a>  
            <a href="/geo/" class="text-black bg-white font-bold hover:bg-gray-700 px-4 py-2 rounded-lg transition ease-in-out">Geolocalizacion</a>
            </div>

            <!--movil-->
            <div id="mobile-menu" class="bg-black/60 fixed top-16 right-0 left-0 bottom-0 justify-center text-center flex-col gap-4 hidden">
            <a href="/perfil/" class="bg-white text-black font-bold py-2 px-4 hover:bg-gray-700 rounded-lg transition ease-in-out">Perfil</a>
            <a href="/geo/" class="bg-white text-black font-bold py-2 px-4 hover:bg-gray-700 rounded-lg transition ease-in-out">Geolocalizacion</a>
            </div>

    </div>
`

    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
}

const crearNavGeo = () => {
    navegacion.innerHTML = `
     <div class="max-w-7xl h-16 mx-auto flex items-center px-4 justify-between bg-black">

            <a href="/" class="text-white font-bold text-xl">BUSAPP</a>
    
            <!--movil-->
            <svg id="menu-toggle" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10 md:hidden text-white cursor-pointer p-2 rounded-lg hover:bg-gray-700">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
    

            <!--pc-->
            <div class="hidden md:flex flex-row gap-4">
                <a href="/perfil/" class="text-black bg-white font-bold hover:bg-gray-700 px-4 py-2 rounded-lg transition ease-in-out">Perfil</a>
                <a href="/pagos/" class="text-black bg-white font-bold hover:bg-gray-700 px-4 py-2 rounded-lg transition ease-in-out">Pagos</a>
            </div>

            <!--movil-->
            <div id="mobile-menu" class="bg-black/60 fixed top-16 right-0 left-0 bottom-0 justify-center text-center flex-col gap-4 hidden">
            
            <a href="/pagos/" class="bg-white text-black font-bold py-2 px-4 hover:bg-gray-700 rounded-lg transition ease-in-out">Pagos</a>
            <a href="/perfil/" class="bg-white text-black font-bold py-2 px-4 hover:bg-gray-700 rounded-lg transition ease-in-out">Perfil</a>
            </div>

    </div>
`

    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
}

const crearNavPerfil = () => {
    navegacion.innerHTML = `
     <div class="max-w-7xl h-16 mx-auto flex items-center px-4 justify-between bg-black">

            <a href="/" class="text-white font-bold text-xl">BUSAPP</a>
    
            <!--movil-->
            <svg id="menu-toggle" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10 md:hidden text-white cursor-pointer p-2 rounded-lg hover:bg-gray-700">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
    

            <!--pc-->
            <div class="hidden md:flex flex-row gap-4">
            <a href="/pagos/" class="text-black bg-white font-bold hover:bg-gray-700 px-4 py-2 rounded-lg transition ease-in-out">Pagos</a>
            <a href="/geo/" class="text-black bg-white font-bold hover:bg-gray-700 px-4 py-2 rounded-lg transition ease-in-out">Geolocalizacion</a>
            </div>

            <!--movil-->
            <div id="mobile-menu" class="bg-black/60 fixed top-16 right-0 left-0 bottom-0 justify-center text-center flex-col gap-4 hidden">
            
            <a href="/pagos/" class="bg-white text-black font-bold py-2 px-4 hover:bg-gray-700 rounded-lg transition ease-in-out">Pagos</a>
            <a href="/geo/" class="bg-white text-black font-bold py-2 px-4 hover:bg-gray-700 rounded-lg transition ease-in-out">Geolocalizacion</a>
            </div>

    </div>
`

    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
}

//crearNavHome();
//agregar las validaciones para generar la barra de navegacion

if(window.location.pathname === '/'){
    //crear barra de navegacion para la pagina del home
    crearNavHome();
}else if(window.location.pathname === '/registro/'){
    //crear barra de navegacion para la pagina de registro
    crearNavRegistro();
}else if(window.location.pathname === '/login/'){
    //crear barra de navegacion para la pagina de login
    crearNavLogin();
}else if(window.location.pathname === '/pagos/'){
    //crear barra de navegacion para la pagina de pagos
    crearNavPagos();
}else if(window.location.pathname === '/geo/'){
    //crear barra de navegacion para la pagina de geolocalizacion
    crearNavGeo();
}else if(window.location.pathname === '/perfil/'){
    //crear barra de navegacion para la pagina de geolocalizacion
    crearNavPerfil();
}