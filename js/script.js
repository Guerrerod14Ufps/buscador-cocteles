// Función para obtener la lista de ingredientes de TheCocktailDB
function cargarIngredientes() {
    const selectIngrediente = document.getElementById('ingrediente');

    fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la respuesta de la API de ingredientes');
            }
            return response.json();
        })
        .then(data => {
            console.log('Ingredientes recibidos:', data.drinks); // Debugging
            // Elimina la opción inicial "Cargando ingredientes..."
            selectIngrediente.innerHTML = '<option value="">Selecciona un ingrediente</option>';

            // Agrega cada ingrediente a la lista desplegable
            data.drinks.forEach(ingrediente => {
                const option = document.createElement('option');
                option.value = ingrediente.strIngredient1;
                option.textContent = ingrediente.strIngredient1;
                selectIngrediente.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error al cargar los ingredientes:', error);
            selectIngrediente.innerHTML = '<option value="">Error al cargar ingredientes</option>';
        });
}

// Función para obtener la lista de tipos de bebidas de TheCocktailDB
function cargarTipos() {
    const selectTipo = document.getElementById('tipo');

    fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?a=list')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la respuesta de la API de tipos');
            }
            return response.json();
        })
        .then(data => {
            console.log('Tipos recibidos:', data.drinks); // Debugging
            // Elimina la opción inicial "Selecciona un tipo"
            selectTipo.innerHTML = '<option value="">Selecciona un tipo</option>';

            // Agrega cada tipo a la lista desplegable
            data.drinks.forEach(tipo => {
                const option = document.createElement('option');
                option.value = tipo.strAlcoholic;
                option.textContent = tipo.strAlcoholic;
                selectTipo.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error al cargar los tipos de bebidas:', error);
            selectTipo.innerHTML = '<option value="">Error al cargar tipos</option>';
        });
}

// Llama a ambas funciones cuando se carga la página
window.onload = function() {
    cargarIngredientes();
    cargarTipos();
};
