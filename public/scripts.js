const apiUrl = 'https://starwars-n5ec-developuptcs-projects.vercel.app/';

// Función para obtener todos los personajes
async function getAllCharacters() {
    const url = `${apiUrl}characters`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.result && data.data.length > 0) {
            displayCharacters(data.data);
        } else {
            document.getElementById('results').innerHTML = "<p>No se encontraron personajes.</p>";
        }
    } catch (error) {
        console.error("Error al obtener los personajes:", error);
        document.getElementById('results').innerHTML = "<p>Error al obtener los personajes. Inténtalo de nuevo más tarde.</p>";
    }
}

// Función para buscar un personaje por nombre
async function searchCharacter() {
    const name = document.getElementById('characterName').value.trim();
    if (!name) {
        alert("Por favor, ingresa un nombre de personaje.");
        return;
    }

    const url = `${apiUrl}name/${name}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.result && data.data.length > 0) {
            displayCharacters(data.data);
        } else {
            document.getElementById('results').innerHTML = "<p>No se encontraron personajes con ese nombre.</p>";
        }
    } catch (error) {
        console.error("Error al buscar personaje:", error);
        document.getElementById('results').innerHTML = "<p>Error al buscar personaje. Inténtalo de nuevo más tarde.</p>";
    }
}

// Función para mostrar los personajes en el HTML
function displayCharacters(characters) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = ""; // Limpiar resultados anteriores

    characters.forEach(character => {
        const characterDiv = document.createElement('div');
        characterDiv.className = 'character';
        characterDiv.innerHTML = `
            <h3>${character.name}</h3>
            <p><strong>Altura:</strong> ${character.height}</p>
            <p><strong>Peso:</strong> ${character.mass}</p>
            <p><strong>Color de cabello:</strong> ${character.hair_color}</p>
            <p><strong>Color de piel:</strong> ${character.skin_color}</p>
            <p><strong>Color de ojos:</strong> ${character.eye_color}</p>
            <p><strong>Año de nacimiento:</strong> ${character.birth_year}</p>
            <p><strong>Género:</strong> ${character.gender}</p>
            <p><strong>Planeta natal:</strong> ${character.homeworld}</p>
            <p><strong>Especie:</strong> ${character.species}</p>
        `;
        resultsDiv.appendChild(characterDiv);
    });
}
