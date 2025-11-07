document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('showLocationBtn');
    const mapContainer = document.getElementById('map-container');
    
    btn.addEventListener('click', () => {
        if (!navigator.geolocation) {
            alert('Geolocation is not supported by your browser');
            return;
        }
        
        btn.textContent = '🔄 Encontrando tu ubicación';
        btn.disabled = true;
        
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                
                // Show the map container
                mapContainer.style.display = 'block';
                
                // Create Google Maps iframe
                const iframe = document.createElement('iframe');
                iframe.id = 'map';
                iframe.src = `https://www.google.com/maps?q=${lat},${lng}&z=15&output=embed`;
                iframe.style.border = '0';
                iframe.style.width = '100%';
                iframe.style.height = '500px';
                iframe.style.borderRadius = '15px';
                iframe.allowFullscreen = true;
                iframe.loading = 'lazy';
                
                // Replace map div with iframe
                const mapDiv = document.getElementById('map');
                mapDiv.parentNode.replaceChild(iframe, mapDiv);
                
                btn.textContent = '✅ Ubicaciones mostradas';
                
                // Scroll to map
                iframe.scrollIntoView({ behavior: 'smooth', block: 'center' });
            },
            (error) => {
                alert('Unable to get your location. Please enable location services in your browser.');
                btn.textContent = '📍 Show My Location';
                btn.disabled = false;
            }
        );
    });
});