// DOM Elements
const homeSection = document.getElementById('home');
const filterSection = document.getElementById('filter');
const homeLink = document.getElementById('homeLink');
const filterLink = document.getElementById('filterLink');
const startButton = document.getElementById('startButton');
const uploadButton = document.getElementById('uploadButton');
const imageUpload = document.getElementById('imageUpload');
const imageCanvas = document.getElementById('imageCanvas');
const placeholder = document.getElementById('placeholder');
const resetButton = document.getElementById('resetButton');
const downloadButton = document.getElementById('downloadButton');

// Filter controls
const brightnessSlider = document.getElementById('brightness');
const contrastSlider = document.getElementById('contrast');
const saturationSlider = document.getElementById('saturation');
const grayscaleSlider = document.getElementById('grayscale');
const blurSlider = document.getElementById('blur');
const hueRotateSlider = document.getElementById('hueRotate');

// Filter values display
const brightnessValue = document.getElementById('brightnessValue');
const contrastValue = document.getElementById('contrastValue');
const saturationValue = document.getElementById('saturationValue');
const grayscaleValue = document.getElementById('grayscaleValue');
const blurValue = document.getElementById('blurValue');
const hueRotateValue = document.getElementById('hueRotateValue');

// Preset buttons
const presetButtons = document.querySelectorAll('.preset-btn');

// Canvas context and image variables
let ctx;
let originalImage = null;

// Navigation
homeLink.addEventListener('click', function(e) {
    e.preventDefault();
    homeSection.style.display = 'block';
    filterSection.style.display = 'none';
});

filterLink.addEventListener('click', function(e) {
    e.preventDefault();
    homeSection.style.display = 'none';
    filterSection.style.display = 'block';
});

startButton.addEventListener('click', function(e) {
    e.preventDefault();
    homeSection.style.display = 'none';
    filterSection.style.display = 'block';
});

// Image upload
uploadButton.addEventListener('click', function() {
    imageUpload.click();
});

imageUpload.addEventListener('change', function() {
    const file = this.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        const img = new Image();
        img.onload = function() {
            // Initialize canvas
            const canvas = imageCanvas;
            ctx = canvas.getContext('2d');
            
            // Set canvas dimensions based on image
            const maxWidth = 800;
            const maxHeight = 500;
            let width = img.width;
            let height = img.height;
            
            // Resize if needed
            if (width > maxWidth) {
                height = (maxWidth / width) * height;
                width = maxWidth;
            }
            
            if (height > maxHeight) {
                width = (maxHeight / height) * width;
                height = maxHeight;
            }
            
            canvas.width = width;
            canvas.height = height;
            
            // Draw image
            ctx.drawImage(img, 0, 0, width, height);
            
            // Store original image data
            originalImage = {
                img: img,
                width: width,
                height: height
            };
            
            // Show canvas, hide placeholder
            imageCanvas.style.display = 'block';
            placeholder.style.display = 'none';
            
            // Reset filters
            resetFilters();
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
});

// Apply filters
function applyFilters() {
    if (!originalImage) return;
    
    // Get current filter values
    const brightness = brightnessSlider.value;
    const contrast = contrastSlider.value;
    const saturation = saturationSlider.value;
    const grayscale = grayscaleSlider.value;
    const blur = blurSlider.value;
    const hueRotate = hueRotateSlider.value;
    
    // Update display values
    brightnessValue.textContent = brightness + '%';
    contrastValue.textContent = contrast + '%';
    saturationValue.textContent = saturation + '%';
    grayscaleValue.textContent = grayscale + '%';
    blurValue.textContent = blur + 'px';
    hueRotateValue.textContent = hueRotate + '°';
    
    // Clear canvas
    ctx.clearRect(0, 0, imageCanvas.width, imageCanvas.height);
    
    // Apply CSS filters to canvas
    ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%) grayscale(${grayscale}%) blur(${blur}px) hue-rotate(${hueRotate}deg)`;
    
    // Draw image with filters
    ctx.drawImage(originalImage.img, 0, 0, originalImage.width, originalImage.height);
}

// Reset filters
function resetFilters() {
    brightnessSlider.value = 100;
    contrastSlider.value = 100;
    saturationSlider.value = 100;
    grayscaleSlider.value = 0;
    blurSlider.value = 0;
    hueRotateSlider.value = 0;
    
    applyFilters();
}

// Add filter slider event listeners
brightnessSlider.addEventListener('input', applyFilters);
contrastSlider.addEventListener('input', applyFilters);
saturationSlider.addEventListener('input', applyFilters);
grayscaleSlider.addEventListener('input', applyFilters);
blurSlider.addEventListener('input', applyFilters);
hueRotateSlider.addEventListener('input', applyFilters);

// Reset button
resetButton.addEventListener('click', resetFilters);

// Download button
downloadButton.addEventListener('click', function() {
    if (!originalImage) return;
    
    const link = document.createElement('a');
    link.download = 'filtered-image.png';
    link.href = imageCanvas.toDataURL('image/png');
    link.click();
});

// Preset filters
presetButtons.forEach(button => {
    button.addEventListener('click', function() {
        const preset = this.getAttribute('data-preset');
        
        switch(preset) {
            case 'vintage':
                brightnessSlider.value = 120;
                contrastSlider.value = 90;
                saturationSlider.value = 85;
                grayscaleSlider.value = 30;
                blurSlider.value = 0;
                hueRotateSlider.value = 20;
                break;
            case 'sepia':
                brightnessSlider.value = 110;
                contrastSlider.value = 110;
                saturationSlider.value = 60;
                grayscaleSlider.value = 0;
                blurSlider.value = 0;
                hueRotateSlider.value = 40;
                break;
            case 'dramatic':
                brightnessSlider.value = 80;
                contrastSlider.value = 160;
                saturationSlider.value = 110;
                grayscaleSlider.value = 0;
                blurSlider.value = 0;
                hueRotateSlider.value = 0;
                break;
            case 'cool':
                brightnessSlider.value = 105;
                contrastSlider.value = 100;
                saturationSlider.value = 90;
                grayscaleSlider.value = 0;
                blurSlider.value = 0;
                hueRotateSlider.value = 200;
                break;
            case 'warm':
                brightnessSlider.value = 110;
                contrastSlider.value = 110;
                saturationSlider.value = 120;
                grayscaleSlider.value = 0;
                blurSlider.value = 0;
                hueRotateSlider.value = 330;
                break;
        }
        
        applyFilters();
    });
});

// Initialize
homeSection.style.display = 'block';
filterSection.style.display = 'none';
