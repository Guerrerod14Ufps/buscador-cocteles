document.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);
    const idDrink = params.get('id');

    if (idDrink) {
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idDrink}`)
            .then(response => response.json())
            .then(data => {
                mostrarDetalle(data.drinks[0]);
            })
            .catch(error => console.error('Error al cargar los detalles del cóctel:', error));
    } else {
        document.getElementById('detalleCoctel').innerHTML = '<p>No se encontró información del cóctel.</p>';
    }

    function mostrarDetalle(coctel) {
        const container = document.getElementById('detalleCoctel');
        
        if (coctel) {
            container.innerHTML = `
                <h2>${coctel.strDrink}</h2>
                <img src="${coctel.strDrinkThumb}" alt="${coctel.strDrink}" width="300">
                <p><strong>Instrucciones:</strong> ${coctel.strInstructions}</p>
                <h3>Ingredientes:</h3>
                <ul>
                    ${getIngredientes(coctel).map(ingrediente => `<li>${ingrediente}</li>`).join('')}
                </ul>
            `;
        } else {
            container.innerHTML = '<p>No se encontraron detalles del cóctel.</p>';
        }
    }

    function getIngredientes(coctel) {
        let ingredientes = [];
        for (let i = 1; i <= 15; i++) {
            const ingrediente = coctel[`strIngredient${i}`];
            const medida = coctel[`strMeasure${i}`];
            if (ingrediente) {
                ingredientes.push(`${medida ? medida : ''} ${ingrediente}`);
            }
        }
        return ingredientes;
    }
});
