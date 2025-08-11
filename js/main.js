function loadHTML(containerId, filePath) {
    fetch(filePath)
        .then(res => res.text())
        .then(data => {
            document.getElementById(containerId).innerHTML = data;
        })
        .catch(err => console.error(`Erro ao carregar ${filePath}:`, err));
}

// Carregar cada componente
loadHTML("header", "components/header/header.html");
loadHTML("hero", "components/hero/hero.html");
loadHTML("featuredProperties", "components/featuredProperties/featuredProperties.html");

// Inicializar o Slick após carregar o componente
function initFeaturedPropertiesSlider() {
    if (window.jQuery && $(".meu-slider").length && $(".meu-slider").slick) {
        $(".meu-slider").slick({
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 1,
            arrows: false,
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                    },
                },
            ],
        });
    }
}

// Recarregar o Slick sempre que o HTML for carregado
const oldLoadHTML = loadHTML;
loadHTML = function(containerId, filePath) {
    fetch(filePath)
        .then(res => res.text())
        .then(data => {
            document.getElementById(containerId).innerHTML = data;
            if (containerId === "featuredProperties") {
                // Aguarda o DOM atualizar
                setTimeout(initFeaturedPropertiesSlider, 100);
            }
        })
        .catch(err => console.error(`Erro ao carregar ${filePath}:`, err));
};
loadHTML("properties-for-sale", "components/propertiesForSale/propertiesForSale.html");
loadHTML("rental-properties", "components/rentalProperties/rentalProperties.html");
loadHTML("opening-hours", "components/openingHours/openingHours.html");
loadHTML("footer", "components/footer/footer.html");