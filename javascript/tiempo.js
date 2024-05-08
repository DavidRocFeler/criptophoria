    // Función para calcular y mostrar el tiempo transcurrido
    function mostrarTiempoTranscurrido() {
        // Obtener la fecha actual
        var ahora = new Date();

        // Obtener todos los elementos con la clase 'tiempo-transcurrido'
        var elementosTiempo = document.querySelectorAll(".tiempo-transcurrido");

        // Iterar sobre cada elemento y calcular el tiempo transcurrido para cada artículo
        elementosTiempo.forEach(function(elemento) {
            // Obtener la fecha de publicación del artículo
            var fechaPublicacion = new Date(elemento.dataset.fechaPublicacion);

            // Calcular la diferencia de tiempo en milisegundos
            var diferencia = ahora - fechaPublicacion;

            // Convertir la diferencia de tiempo a minutos, horas, días, semanas, meses y años
            var minutos = Math.floor(diferencia / 60000);
            var horas = Math.floor(minutos / 60);
            var dias = Math.floor(horas / 24);
            var semanas = Math.floor(dias / 7);
            var meses = Math.floor(dias / 30);
            var anos = Math.floor(dias / 365);

            // Mostrar el tiempo transcurrido en el formato deseado
            var tiempoTranscurrido = "";
            if (minutos < 60) {
                tiempoTranscurrido = "hace " + minutos + " minutos";
            } else if (horas < 24) {
                tiempoTranscurrido = "hace " + horas + " horas";
            } else if (dias < 7) {
                tiempoTranscurrido = "hace " + dias + " días";
            } else if (semanas < 4) {
                tiempoTranscurrido = "hace " + semanas + " semanas";
            } else if (meses < 12) {
                tiempoTranscurrido = "hace " + meses + " meses";
            } else {
                tiempoTranscurrido = "hace " + anos + " años";
            }

            // Mostrar el tiempo transcurrido en el elemento del DOM
            elemento.innerText = tiempoTranscurrido;
        });
    }

    // Llamar a la función al cargar la página para mostrar el tiempo transcurrido
    window.onload = mostrarTiempoTranscurrido;

