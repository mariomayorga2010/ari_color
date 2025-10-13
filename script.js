// ==========================================
// CALCULADORA DE PINTURA - Ari Color
// ==========================================

/**
 * Función principal para calcular la cantidad de pintura necesaria
 */
function calculatePaint() {
    // Obtener valores del formulario
    const width = parseFloat(document.getElementById('width').value);
    const height = parseFloat(document.getElementById('height').value);
    const coats = parseInt(document.getElementById('coats').value);
    const quality = document.getElementById('quality').value;
    const surface = document.getElementById('surface').value;
    const walls = parseInt(document.getElementById('walls').value);

    // Validación de datos
    if (!validateInputs(width, height, coats, walls)) {
        alert('Por favor, completa todos los campos correctamente');
        return;
    }

    // Calcular área total
    const areaPerWall = width * height;
    const totalArea = areaPerWall * walls;
    const areaWithCoats = totalArea * coats;

    // Obtener rendimiento según calidad
    const coverage = getCoverage(quality, surface);

    // Calcular litros necesarios
    const litersNeeded = areaWithCoats / coverage;
    const litersRounded = Math.ceil(litersNeeded * 2) / 2; // Redondear a 0.5

    // Obtener recomendación de compra
    const recommendation = getRecommendation(litersRounded);

    // Mostrar resultados
    displayResults(totalArea, coverage, litersRounded, recommendation, {
        width,
        height,
        walls,
        coats,
        quality,
        surface
    });
}

/**
 * Valida que los inputs sean correctos
 */
function validateInputs(width, height, coats, walls) {
    if (isNaN(width) || isNaN(height) || isNaN(coats) || isNaN(walls)) {
        return false;
    }
    if (width <= 0 || height <= 0 || coats <= 0 || walls <= 0) {
        return false;
    }
    return true;
}

/**
 * Obtiene el rendimiento de pintura según calidad y tipo de superficie
 */
function getCoverage(quality, surface) {
    const coverageMatrix = {
        basica: { lisa: 10, texturizada: 9, rugosa: 8 },
        media: { lisa: 12, texturizada: 11, rugosa: 10 },
        premium: { lisa: 14, texturizada: 13, rugosa: 12 }
    };

    return coverageMatrix[quality][surface] || 10;
}

/**
 * Genera la recomendación de compra basada en litros necesarios
 */
function getRecommendation(liters) {
    const gallonSize = 3.78; // 1 galón = 3.78 litros

    if (liters <= 1) {
        return `${liters} litro${liters !== 1 ? 's' : ''} (1 litro de pintura)`;
    } else if (liters <= gallonSize) {
        return `${liters} litros (1 galón de pintura)`;
    } else if (liters <= gallonSize * 2) {
        return `${liters} litros (2 galones de pintura)`;
    } else if (liters <= gallonSize * 3) {
        return `${liters} litros (3 galones de pintura - Combo Especial)`;
    } else {
        const gallons = Math.ceil(liters / gallonSize);
        return `${liters} litros (${gallons} galones de pintura)`;
    }
}

/**
 * Muestra los resultados en la sección correspondiente
 */
function displayResults(totalArea, coverage, litersRounded, recommendation, details) {
    const resultDiv = document.getElementById('result');
    
    if (!resultDiv) {
        console.error('No se encontró el elemento #result');
        return;
    }

    // Actualizar valores en el resultado
    document.getElementById('totalArea').textContent = `${totalArea.toFixed(2)} m²`;
    document.getElementById('coverage').textContent = `${coverage} m²/litro`;
    document.getElementById('liters').textContent = `${litersRounded} litros`;
    document.getElementById('recommendation').textContent = recommendation;

    // Actualizar detalles
    const detailsText = `
        Ancho: ${details.width}m | Alto: ${details.height}m | Paredes: ${details.walls} | 
        Manos: ${details.coats} | Calidad: ${translateQuality(details.quality)} | 
        Superficie: ${translateSurface(details.surface)}
    `;
    document.getElementById('details').textContent = detailsText;

    // Mostrar la sección de resultados
    resultDiv.style.display = 'block';

    // Scroll suave hacia los resultados
    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

/**
 * Traduce el valor de calidad al español
 */
function translateQuality(quality) {
    const map = {
        basica: 'Básica',
        media: 'Media',
        premium: 'Premium'
    };
    return map[quality] || quality;
}

/**
 * Traduce el valor de superficie al español
 */
function translateSurface(surface) {
    const map = {
        lisa: 'Lisa',
        texturizada: 'Texturizada',
        rugosa: 'Rugosa'
    };
    return map[surface] || surface;
}

// ==========================================
// EVENTOS Y INICIALIZACIÓN
// ==========================================

/**
 * Permite calcular presionando Enter en los inputs
 */
function initializeCalculatorEvents() {
    const inputFields = ['width', 'height', 'walls'];
    
    inputFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
            field.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    calculatePaint();
                }
            });
        }
    });
}

/**
 * Botón de WhatsApp con mensaje predefinido
 */
function initializeWhatsAppButton() {
    const whatsappBtn = document.querySelector('.whatsapp-btn');
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', () => {
            const message = encodeURIComponent('Hola Ari Color, quisiera más información sobre sus productos de pintura.');
            window.open(`https://wa.me/?text=${message}`, '_blank');
        });
    }
}

/**
 * Animaciones al hacer scroll
 */
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.feature-card, .product-card, .testimonial-card').forEach(el => {
        observer.observe(el);
    });
}

/**
 * Manejador para botones de promoción
 */
function initializePromotionButtons() {
    const promoButtons = document.querySelectorAll('.promo-btn');
    promoButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            alert('¡Gracias por tu interés! Pronto redireccionaremos a tu WhatsApp.');
            // Aquí puedes agregar la lógica de WhatsApp o contacto
        });
    });
}

/**
 * Manejador para botones de productos
 */
function initializeProductButtons() {
    const productButtons = document.querySelectorAll('.product-btn');
    productButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            alert('Producto seleccionado. Próximamente podrás comprarlo directamente.');
            // Aquí puedes agregar lógica de carrito de compras
        });
    });
}

/**
 * Inicializa todos los eventos cuando el DOM está listo
 */
document.addEventListener('DOMContentLoaded', () => {
    initializeCalculatorEvents();
    initializeWhatsAppButton();
    initializeScrollAnimations();
    initializePromotionButtons();
    initializeProductButtons();
    
    console.log('✓ Ari Color - Todos los scripts inicializados correctamente');
});