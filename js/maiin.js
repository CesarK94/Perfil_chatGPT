
let competencias = ['Gestión eficaz de documentos', 'Atención al cliente', 'Manejo de software administrativo', 'Comunicación efectiva', 'Organización de eventos y reuniones']; // Replace with your array

/**
 * Funcion para generar el pdf
 * 
 * @param {string} contect_pdf - El id del elemento a convertir en pdf.
 * @param {string} filename - El nombre del archivo pdf.
 * @param {string} unit - La unidad de medida del pdf.
 * @param {string} format - El formato del pdf.
 * @param {string} orientation - La orientacion del pdf.
 * @param {string} margin - El margen del pdf.
 * 
 */

function pdf(){
    const docElement = document.getElementById('contect_pdf');
    let opt = {
        margin: [15,15,15,15],
        filename: 'myfile.pdf',
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        image: { type: 'jpeg', quality: 1 },
        html2canvas: {scrollX: 0, scrollY: 0},
    };
    html2pdf().set(opt).from(docElement).save();
}

/**
 * Actualiza el texto de un elemento HTML con el valor de un input.
 * 
 * @param {string} clase - La clase del elemento a actualizar.
 * 
 */

function updateText(clase) {
    const inputElement = document.getElementById('input_' + clase);
    const text = inputElement.value;
    const divElement = document.getElementById('td_' + clase);

    if (clase === 'puesto') {
        console.log('puesto');
        let addtext = document.getElementById('b_' + clase);
        let pElement = document.createTextNode(text + ':' );

        addtext.appendChild(pElement);
        divElement.innerHTML = text;
        listarCompetencias();
    } else {
        divElement.innerHTML = text;
    }
}

/**
 * Muestra un boton para aceptar las competencias preaceptadas
 */

function mostrarBotonAceptar() {
    const botonAceptar = document.getElementById('Aceptar_competencias');
    botonAceptar.removeAttribute('hidden');
}

/**
 * Muestra un listado de las competencias preaceptado
 * por el usuario y un boton para editarlas.
 */

function listarCompetencias() {
    const listContainer = document.getElementById('competenciasList');
    listContainer.innerHTML = ''; // Clear the existing list

    competencias.forEach((competencia, index) => {
        const liElement = document.createElement('li');
        liElement.textContent = competencia;

        const editButton = document.createElement('button');
        editButton.textContent = 'Editar';
        editButton.addEventListener('click', () => {
            const newCompetencia = prompt('Ingrese la nueva competencia:');
            if (newCompetencia) {
                modificarCompetencias(index, newCompetencia);
                listarCompetencias(); // Refresh the list
            }
        });

        liElement.appendChild(editButton);
        listContainer.appendChild(liElement);
        mostrarBotonAceptar();
    });
}

/**
 * Oculta el listado de las competencias aceptado por el usuarios. 
 */

function ocultarListado() {
    const listContainer = document.getElementById('competenciasList');
    listContainer.innerHTML = ''; // Clear the existing list

    const botonAceptar = document.getElementById('Aceptar_competencias');
    botonAceptar.setAttribute('hidden', true);
}

/**
 * Muestra un el listado de las competencias aceptado por el usuarios.
 */

function listar() {
    ocultarListado();
    const ulElement = document.createElement('ul');
    competencias.forEach(item => {
        const liElement = document.createElement('li');
        liElement.textContent = item;
        ulElement.appendChild(liElement);
        generarTabla(item);
    });

    const listContainer = document.getElementById('listContainer'); 
    listContainer.appendChild(ulElement);
}

/**
 * Modica el array de Competencias remplazando los elementos en el indice especifidado.
 * 
 * @param {number} index - El indice de los elementos a remplazar.
 * @param {...string} nuevasCompetencias - El nuevo valor de los elementos a remplazar.
 */

function modificarCompetencias(index, ...nuevasCompetencias) {
    competencias.splice(index, nuevasCompetencias.length, ...nuevasCompetencias);
}

/**
 * Genera una tabla con el contenido especificado.
 * 
 * @param {String} contenido - El titulo de la tabla.
 * 
 * @param {Array} contenido - El contenido de la tabla esto vendria de chatGPT no implementado.
 */
function generarTabla(contenido) {
    const tableElement = document.createElement('table');
    
    for (let i = 0; i < 5; i++) {
        const rowElement = document.createElement('tr');

        if (i === 0) {
            const cellElement = document.createElement('th');
            cellElement.textContent = contenido;
            cellElement.style.fontSize = '25px'; // Modificar tamaño de letra
            cellElement.style.padding = '8px'; // Modificar padding
            cellElement.colSpan = 4; // Modificar el tamaño de la celda
            rowElement.appendChild(cellElement);
        } else if (i === 1) {
            const cellElement = document.createElement('td');
            let textoAlAzar = generarTextoAlAzar(200); // Genero texto y lo asigno a la celda
            // aqui podria traer el texto de chatGPT
            cellElement.textContent = textoAlAzar;
            cellElement.colSpan = 4;
            rowElement.appendChild(cellElement);
        } else if (i === 3) {
            const cellElement = document.createElement('td');
            const textoAlAzar = "¿Cuáles de las siguientes conductas describen mejor al perfil?";
            const boldElement = document.createElement('b');
            boldElement.textContent = textoAlAzar;
            boldElement.style.fontSize = '15px';
            cellElement.style.textAlign = 'center';
            cellElement.appendChild(boldElement);
            cellElement.colSpan = 4;
            rowElement.appendChild(cellElement);
        } else {
            for (let j = 0; j < 4; j++) {
                const cellElement = document.createElement('td');
                let textoAlAzar = generarTextoAlAzar(200);
                cellElement.textContent = textoAlAzar;
                cellElement.style.width = '25%';
                rowElement.appendChild(cellElement);
            }
        }
        
        tableElement.appendChild(rowElement);
    }
    
    const tableContainer = document.getElementById('tableContainer');
    const brElement = document.createElement('br');
    tableContainer.appendChild(tableElement);
    tableContainer.appendChild(brElement);
}

/**
 * Genera un texto al azar.
 * 
 * @param {number} length - La longitud del texto a generar.
 * @returns {string} El texto generado.
 */
function generarTextoAlAzar(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
        if ((i + 1) % 5 === 0) {
            result += ' ';
        }
    }
    return result;
}