const ACCESS_KEY = "y0RXjtKN10wbXGLzfmtXMcrd42rtkreSKJ_M4nbhy9o"; // <- Pega tu Access Key aquí

async function buscarAuto() {
    const q = document.getElementById("inputBuscar").value.trim();
    const resDiv = document.getElementById("resultado");

    if (!q) {
        alert("Escribe el nombre del auto.");
        return;
    }

    document.getElementById("search-box").style.display = "none";
    resDiv.innerHTML = `<p>Cargando imágenes...</p>`;

    try {
        const response = await fetch(`https://api.unsplash.com/search/photos?query=${encodeURIComponent(q)}&client_id=${ACCESS_KEY}&per_page=4`);
        const data = await response.json();

        if (!data.results || data.results.length === 0) {
            resDiv.innerHTML = `<p>No se encontraron imágenes de "${q}".</p><button id="back-button" onclick="regresar()">Regresar</button>`;
            return;
        }

        // Carrusel horizontal
        let html = `<div class="carousel">`;
        data.results.forEach(img => {
            html += `<img src="${img.urls.small}" alt="${q}">`;
        });
        html += `</div><button id="back-button" onclick="regresar()">Regresar</button>`;

        resDiv.innerHTML = html;

    } catch (err) {
        console.error(err);
        resDiv.innerHTML = `<p>Error al cargar imágenes.</p>`;
    }
}

function regresar() {
    document.getElementById("resultado").innerHTML = "";
    document.getElementById("search-box").style.display = "inline-flex";
    document.getElementById("inputBuscar").value = "";
}
