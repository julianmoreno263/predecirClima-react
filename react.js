/*
Este proyecto sera una app echa en react para consultar el clima d euna determinada ciudad, para esto la app consumira una API que proporciona el clima llamada https://openweathermap.org/api, ademas contara con un formulario el cual tendra su respectiva validacion.(v114)

Para usar esta API debo logearme en la pagina, mis contraseñas son: 
user: correo gmail
passw: scorpion

Una vez logeado entro a la parte de API KEYS y creo una key para el proyecto clima.

Esta llave s egenera porque esta API es publica hasta cierto modo, si los dueños d ela API ven que nuestra app tiene varias visitas y usamos su API pues nos cobraran, para esto es la llave, para que ellos vayan viendo la cantidad de request de nuestro sitio y asi ir viendo si nos cobran o no.

1- como siempre, creamos el proyecto con npx create-react-app clima y realizamos limpieza de sus archivos para dejar el proyecto listo para trabajar. Primero en el index.html del public utilizaremos un cdn a materialize para unos estilos css, este enlace lo copiamos del gist del profe, tambien el script que nos deja lo pegamos al final del body. Tambien eliminamos App.css, el de test y el logo,en App.js eliminamos los imports de esos archivos, colocamos el de react y en elreturn ponemos un h1 con un titulo. Reemplazamos en el index.css por el codigo que nos deja el profe,(v114) LISTO LA PARTE INICIAL DE LIMPIEZA!!!!!!

-----------------------------------------------------------------------------------------

ahora, vamos a comenzar a crear nuestros componentes para la app, para esto primero le importamos un Fragment a App.js pues se pasaran varios componentes en este fragment.(v115)

1- creamos el componente Header.js para el header de nuestra app, se lo importamos a App.js.
En App.js llamamos a este Header y le pasamos via prop un titulo de una vez para que se muestre en pantalla, en el componente Header pasamos como prop este titulo y en su return lo ponemos dentro de un nav, como trabajaremos con el framework css materialize este tiene clases y le da estilos a estas etiquetas:

                        const Header = ({ titulo }) => {
                            <nav>
                                <div className="nav-wrapper light-blue darken-2">
                                    <a href="#!" className="brand-logo">{titulo}</a>
                                </div>
                            </nav>;
                        };


Para el caso de los enlaces <a></a>, materialize requiere que se le pase un href valido o si no saca un error, pero se puede deshabilitar esta opcion poniendo en el href un signo de # con un !.

2- ahora en App.js creamos un contenedor div para el formulario principal, este contenedor lo dividiremos en 2 columnas principales usando las clases de materialize, las clases que tendran estos elementos html estan en el index.css que el profe nos dejo. La primera columna sera para el formulario, por lo tanto creamos este componente.(v116)

3- en el componente Formulario.js creamos la estructura html del formulario con las clases d e materialize, este formulario requiere dos campos,uno para la ciudad y otro para el pais,asi que en cada input le colocamos los atributos de id y name. El id sirve para activar el input desde un label que tendra cada input, osea al hacer click en el label de ciudad me activa el input,se ve que el label sube un poco pues se activa, para hacer esto dentro del elemento label utilizo htmlfor=""  dentro de las comillas ira el valor del id. En html puro solo se hace con for="" pero React no lo puede tomar asi, entonces la opcion que nos da es htmlfor=""(v116).

4- para el input de pais sera un select,no vamos a permitir todos los paises sino unos nada mas para hacerlo mas sencillo,entonces se utiliza un select. Los estilos de este input de pais los da el script que pegamos en el body del index.html, son estilos de materialize. Las opciones de este select estan en el codigo del gist que el profe nos dejo,las copiamos en nuestro select.

-------------------------------------------------------------------------------------------

ya creado el formulario, le creamos su state,lo llamaremos busqueda con su respectiva funcion guardarBusqueda, este state sera un objeto con las propiedades ciudad y pais que seran en principio string vacios.(v117)

1- creamos el state y hacemos destructuring de las propiedades ciudad y pais para poder pasarselas a los inputs del  formulario por medio de la propiedad value y asi poder capturar lo que el usuario selecciona de los inputs.

                            value={ciudad}


2- ahora, creamosla funcion que actualizara el state, la llmamos handleChange(esta es la forma standard de nombrar a estas funciones), esta funcion en si llamara a la funcion guardarBusqueda que es la que en si actualiza el state. Siempre le pasamosuna copia del state y para capturar los valores que el usuario selecciona de los inputs colocamos el objeto del evento [e.target.name]:e.target.value. Recordar que e ste codigo lo utilizamos siempre que tengamos formularios para capturar el valor que el usuario pone en ellos.(v117)

3- ahora, esta funcion se la pasamos a cada nput del formulario por medio delevento onChnage,asi estara a la escucha de este evento y lo que el usuario seleccione se pasara al state del componente,para verlo vamos a components y al seleccionar algo debe d eguardarse en el state.

Listo, hasta aqui ya capturamos lo que el usuario selecciona y lo guardamos en el state para que este se vaya actualizando.!!!!!!

-------------------------------------------------------------------------------------

ahora vamos a crear la funcion para el submit del formulario y asi poder realizar la validacion del mismo.(v118)

1- creamos en el form un le pasamos una funcion handleSumit() que realizara el sumit del formulario.

2- esta funcion solo hace dos cosas, valida el formulario y si la validacion esta bien entonces pasa los datos que el usuario selecciono hacia el componente principal.
Para la validacion creamos un state para el error(en el componente Formulario.js), y en la funcion del submit validamos con un if tanto ciudad como pais si son string vacios(con ayuda de trim()).Si la validacion pasa pues la funcion del state d eerror pasa de nuevo a false.

3- dentro del form, con un ternario evaluamos si hay error, y si lo hay presentara en pantalla un parrafo con un mensaje de error,sino,pues sera null.

4- listo, ya funciona la validacion, ahora debemos tomar los datos que el usuario selecciona(osea lo que este guardado en el state) y pasarlos hacia el componente principal App.js para que alli se realice la consulta a la API. Entonces lo que el profe hace es tomar el state del formulario busqueda y quitarlo de Formulario y ponerlo pero en App.js, pues este state es el que tiene guardados los datos que el usuario va seleccionando. Este state busqueda y la funcion guardarBusqueda la pasamos via props hacia el formulario.(v119)

5- aplicamos destructuring de busqueda, ahora, utilizamos useEffect, recordemos que useEffect esta viendo si hay cambios del state, este useEffect lo usaremos para llamar a la funcion que consultara la API, para esto primero creamos otro state en App.js para que nos avise por medio de ese state que la consulta se realizo,osea que el usuario ya selecciono bien los datos y dio submit,este state se lo pasamos al formulario por medio de su funcion via props, y en el Formulario.js lo capturamos en las props y lo pasamos despues de haber echo la validacion del formulario en la funcion handleSubmit, este state sera false en principio, y si la validacion de los datos se hizo bien pues pasara a true,osea este state indicara que se ha echo un envio de datos correctamente, y este state se le pasa al useEffect en el array de dependencias pasamos este state que indica que se ha echo un envio de datos,osea que el otro state de busqueda a cambiado y se debe d ehacer una operacion,osea consultar la API. TODO ESTO SE HACE ASI ARA QUE LA FUNCION QUE HAGAMOS DE CONSULTAR LA API NO SE EJECUTE CADA VEZ QUE ESTEMOS DIGITANDO UNA LETRA., SINO QUE SE EJECUTE CUANDO YA LOS DATOS ESTEN CARGADOS COMPLETAMENTE(v119)

-----------------------------------------------------------------------------------------------

CONSULTAR A LA API

1- Dentro del useEffect creamos la funcion async-await que consultara a la API, aqui el useEffect ya sabe que se han cargado los datos completamente desde el Formulario.js y ejecutara la llmaada a esta nueva funcion que se llamara consultarAPI().

2-dentro del useEffect creamos la funcion que consulta a la API y la llamamos de una vez.
Ahora, si vemos la url de una consulta a esta API del clima tiene varias cosas, tiene la ciudad,el pais y ademas la key que creamos en la API la cual se pasa a la url como appid, debemos tener estos datos para poder hacer la consulta.

3- primero dentro de consultarAPI creamos una const para nuestra key llamada appId.(v120)
Despues pasamos la url en template string y le pasamos la ciudad y el pais y la key.

4- por ultimo hacemos la consulta con fetch utilizando await, toda esta consulta se hace dentro de un if evaluando si el state consultar es true.(v120)

5-cuando se ejecute esta consulta, podemos ver en consola que nos trae un objeto json con mucha informacion adentro, dentro de este objeto habra otro que dice "main" y este objeto tiene la informacion de la temperatura de la ciudad que consultamos.

-------------------------------------------------------------------------------------------
ya tenemos la consulta a la API y vemos que nos arroja un objeto con mucha informacion, ahora debemos mostrar esa respuesta en pantalla,para ello creamos un nuevo state en App.js para guardar el resultado de la consulta.

1- en App.js creamos un tercer state llamado resultado y su respectiva funcion guardarResultado(), este state sera un objeto vacio en principio.(v121)

2- entonces, la funcion de este state resultado la llamamos despues del await donde se pide el resultado en json, y le pasamos como parametro la const resultado,entonces aqui estaremos guardando la informacion del resultado de la consulta en este nuevo state,lo verificamos en components y realizando una consulta.

3- ahora, ya capturado el resultado de la consulta en el state resultado creamos un nuevo componente para mostrarlo en pantalla, nombramos a este componente Clima.js y lo ubicaremos en la segunda columna en la que dividimos la app.

4- Este componente Clima lo importamos en App.js y le pasamos el state resultado via prop, despues en el propio archivo Clima.js esta prop de clima la utilizamos para poder mostrar la informacion que tiene guardada el state resultado que le pasamos(v121).

5- ahora, este state de resultado llega con toda la informacion que nos envia la API, solo necesitamos la informacion de la propiedad name y main que viene en este resultado. Entonces hacemos destructuring en Clima.js solo de estas propiedades:

                        const {name,main}=resultado

creamos despues de este codigo un if que evalue si el usuario escogio un nombre de ciudad y si no lo ha echo pues que no se carge este componente Clima,pues solo debe cargar cuando ya se realizo una consulta y se va a mostrar el resultado, esto se hace con:

                        if(!name) return null;

6- ahora, en el return de Clima.js creamos el codigo html con sus clases para mostrar los resultados que necesitamos. El objeto main de la consulta tiene la propiedad temp que es la que tiene la informacion de la temperatura,ponemos {main.temp}

7- ahora, la temperatura nos la da en grados kelvin, para pasarla a grados centigrados le restamos a la temperatura que nos da la respuesta -273.15,osea asi:

                        {main.temp - 273.15}

y como esto nos arroja muchos decimales, lo corregimos colocando todo asi:

                        {parseFloat(main.temp - 273.15, 10).toFixed(2)}

los grados kelvin los podemos dejar dentro de una const. El 10 es ara decir que estaremos trabajando en base 10,osea en decimal. Por ultimo le ponemos la siguiente entidad dentro de una etiqueta spam para el simbolo de grados centigrados:

                        <spam>&#x2103;</spam>



8- creamos dos arrafos mas paaateperatura maxima y minima.

9- ahora, asi como esta la app,debemos recargar para poder ejecutar otra consulta, esto pasa porque el state consultar en App esta como true,la funcion guardarConsultar queda como true en el componente Formulario, para reiniciar el formulario pues debemos llamar nuevamente a guardarConsultar pero ahora con false desde App.js en la funcion que consulta a la API..(v121)

10- ahora,cuando buscamos una ciudad que no existe debemos poder mostrar un mensaje al usuario, para eso utilizaremos los codigos que trae la consulta, cuando la ciudad existe y la consulta s eejecuta bien el codigo cod es 200(lo vemos en el objeto de la consulta), y si no se ejecuta bien el codigo es 404,utilizamosestos codigos para evaluar si las consultas estan bien o no. Para esto creamos en App.js un cuarto state de error para evaluar. Este if que evalua el codigo 404 lo colocamos dentro de la funcion que consulta a la API a lo ultmo,pues se ejecuta despues de habr realizado una consulta y se espera si se ejecuto bien o no(v122)

11- ahora,vemos que el state error  pasa de false a true si la consulta falla, entonces con otro if hacemos una carga condicional de componentes, ponemos en caso de que haya un error un componente Error, y si no hay error cargamos el componente Clima que muestra el resultado, esto en App.js, debemos crear el componente de Error que muestre el mensaje.(v122)

12- el componente Error tendra como parametro un mensaje que pasamos via prop, lo importamos en App.js. Este nuevo componentee Error lo podemos retilizar en Formularo cuand valuamos con el ternario, entonces se lo importamos a Formulario y lo ponemos en el ternario donde evaluamos si todos los campos fueron seleccionados por el usuario,(v122). LISTO EL PROYECTO!!!  POR ULTIMO AGREGAMOS LA DOCUMENTACION DE LOS PROPTYPES Y HACEMOS EL DEPLOYMENT EN NETLIFY. (RECORDAR QUE PARA USAR PROPTYPES SOLO HACEMOS EL IMPORT,NO HAY QUE INSTALAR NADA,NODE YA LOS TRAE AL CREAR EL PROYECTO, PARA REVISAR SI QUEDARON BIEN SE VE EN CONSOLA SI SALE ALGUN ERROR.)

AL PROFE LE SALE UN ERROR DE DEPENDENCIA PERO TODO ESTA BIEN, A VECES EL SLINT LO SACA PORQUE LO VE COMO ERROR, PARA DESHABILITARLO EL PROFE PONE ESTO EN EL USEEFFECT EN LA PARTE DE ABAJO:

                        //eslint-disable-next-line

lo unico que hace esa linea es eliminar la advertencia en nuestra consola, nada más, no afecta el código en nada. Si todo esta bien no hay problema, se prueba la app que funcione como esperamos y listo.

NOTA IMPORTANTE: EL PROFE HIZO EL DEPLOYMENT NORMAL EN NETLIFY PERO AL PROBAR LA APP EN INTERNET NO SACA RESULTADOS, ESTO ES PORQUE LA URL DE LA API EN App.js ESTABA SOLO COMO HTTP, DEBE DE PONERSE COMO HTPPS(OSEA MODO SEGURO). AHORA, SI POR EJEMPLO HICE UN CAMBIO DEBO VOLVER A HACER EL BUILD, PERO COMO QUIERO QUE SE QUEDE EN EL MISMO DOMINIO (OSEA LA MISMA URL DE NETLIFY QUE TENIA ANTES DE CORREGIR EL ERROR) LO QUE DEBO HACER ES EN NETLIFY IR A LA PESTAÑA DEPLOYS Y SUBIR LA CARPETA BUILD ALLI, ASI QUEDARA CON EL DOMINIO QUE YA TENIA ANTES DE CORREGIR EL ERROR(V124).

HAY UNAS APIS QUE NO ACEPTAN CUALQUIER DOMINIO, ELLAS NOS INDICAN CUAL DEBE DE SER PARA QUE ASI LOS ENPOINTS TRABAJEN BIEN, DEPENDE DE LA API.

*/
