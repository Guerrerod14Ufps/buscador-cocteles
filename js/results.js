// Función para obtener el valor de un parámetro en la URL
function obtenerParametroUrl(parametro) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(parametro);
}

// Función para mostrar los resultados según la búsqueda
function mostrarResultados() {
    const nombre = obtenerParametroUrl('nombre');
    const ingrediente = obtenerParametroUrl('ingrediente');
    const tipo = obtenerParametroUrl('tipo');
    const resultadosDiv = document.getElementById('resultados');
    
    if (nombre) {
        // Búsqueda por nombre
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${nombre}`)
            .then(response => response.json())
            .then(data => {
                mostrarCocteles(data.drinks, resultadosDiv);
            })
            .catch(error => {
                console.error('Error al cargar los resultados por nombre:', error);
                resultadosDiv.innerHTML = '<p>Error al cargar los resultados.</p>';
            });
    } else if (ingrediente) {
        // Búsqueda por ingrediente
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingrediente}`)
            .then(response => response.json())
            .then(data => {
                mostrarCocteles(data.drinks, resultadosDiv);
            })
            .catch(error => {
                console.error('Error al cargar los resultados por ingrediente:', error);
                resultadosDiv.innerHTML = '<p>Error al cargar los resultados.</p>';
            });
    } else if (tipo) {
        // Búsqueda por tipo
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=${tipo}`)
            .then(response => response.json())
            .then(data => {
                mostrarCocteles(data.drinks, resultadosDiv);
            })
            .catch(error => {
                console.error('Error al cargar los resultados por tipo:', error);
                resultadosDiv.innerHTML = '<p>Error al cargar los resultados.</p>';
            });
    }
}

// Función para mostrar los cócteles
function mostrarCocteles(cocteles, container) {
    if (cocteles && cocteles.length > 0) {
        cocteles.forEach(coctel => {
            const coctelDiv = document.createElement('div');
            coctelDiv.innerHTML = `
                <h3>${coctel.strDrink}</h3>
                <img src="${coctel.strDrinkThumb}" alt="${coctel.strDrink}" width="100">
            `;
            container.appendChild(coctelDiv);
        });
    } else {
        container.innerHTML = '<p>No se encontraron cócteles para esta búsqueda.</p>';
    }
}

// Llamar a la función para mostrar resultados al cargar la página
window.onload = mostrarResultados;
