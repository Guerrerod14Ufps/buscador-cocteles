// Asegurarse de que el DOM esté completamente cargado antes de agregar el event listener
document.addEventListener('DOMContentLoaded', function() {

    // Función para cargar la lista de ingredientes
    function cargarIngredientes() {
        fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list')
            .then(response => response.json())
            .then(data => {
                const ingredienteSelect = document.getElementById('ingrediente');
                ingredienteSelect.innerHTML = '<option value="">Selecciona un ingrediente</option>';
                data.drinks.forEach(drink => {
                    const option = document.createElement('option');
                    option.value = drink.strIngredient1;
                    option.textContent = drink.strIngredient1;
                    ingredienteSelect.appendChild(option);
                });
            })
            .catch(error => console.error('Error al cargar los ingredientes:', error));
    }

    // Función para cargar la lista de tipos de cóctel
    function cargarTipos() {
        fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?a=list')
            .then(response => response.json())
            .then(data => {
                const tipoSelect = document.getElementById('tipo');
                tipoSelect.innerHTML = '<option value="">Selecciona un tipo de cóctel</option>';
                data.drinks.forEach(drink => {
                    const option = document.createElement('option');
                    option.value = drink.strAlcoholic;
                    option.textContent = drink.strAlcoholic;
                    tipoSelect.appendChild(option);
                });
            })
            .catch(error => console.error('Error al cargar los tipos de cócteles:', error));
    }

    // Event listener para la búsqueda priorizada
    document.getElementById('searchForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nombre = document.getElementById('nombre').value;
        const ingrediente = document.getElementById('ingrediente').value;
        const tipo = document.getElementById('tipo').value;

        // Prioridad 1: Buscar por nombre si hay uno ingresado
        if (nombre) {
            window.location.href = `results.html?nombre=${nombre}`;
        }
        // Prioridad 2: Buscar por ingrediente si no se ha ingresado un nombre
        else if (ingrediente) {
            window.location.href = `results.html?ingrediente=${ingrediente}`;
        }
        // Prioridad 3: Buscar por tipo si no se ingresó nombre ni ingrediente
        else if (tipo) {
            window.location.href = `results.html?tipo=${tipo}`;
        } else {
            alert('Por favor, ingresa un nombre, selecciona un ingrediente o elige un tipo de cóctel.');
        }
    });

    // Llamar a las funciones para cargar ingredientes y tipos al cargar la página
    cargarIngredientes();
    cargarTipos();
});
