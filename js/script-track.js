let trackList = [];
let debounceTimer;
const maxTracks = 10;
const basePrice = 9.5;
const pricePerTrack = 1.5;


function Timer() {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        searchTrack();
    }, 300); 
}
function updatePrice() {
    const totalPrice = basePrice + (trackList.length * pricePerTrack);
    document.getElementById('totalPrice').textContent = `Prix: ${totalPrice.toFixed(2)}€`;
}


function searchTrack() {
    if (trackList.length >= maxTracks) {
        alert('Limite de 8 titres atteinte');
        return;
    }

    var trackName = document.getElementById('trackName').value;
    fetch(`http://url/search_track?track=${encodeURIComponent(trackName)}`)
        .then(response => response.json())
        .then(data => {
            if (data.tracks && data.tracks.items.length > 0) {
                const track = data.tracks.items[0]; // Prend le premier résultat

                trackList.push(track); // Ajoute le titre à la liste
                updateTrackList(); // Met à jour l'affichage
            } else {
                alert('Aucun morceau trouvé');
            }
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des données:', error);
        });
}

function updateTrackList() {
    const resultsContainer = document.getElementById('trackResults');
    resultsContainer.innerHTML = ''; // Efface les résultats précédents

    trackList.forEach((track, index) => {
        const resultItem = document.createElement('div');
        resultItem.className = 'result-item';
        resultItem.draggable = true;
        resultItem.setAttribute('data-index', index);

        resultItem.ondragstart = dragStart;
        resultItem.ondragover = dragOver;
        resultItem.ondrop = drop;
        resultItem.ondragenter = dragEnter;
        resultItem.ondragleave = dragLeave;

        const coverImg = document.createElement('img');
        coverImg.src = track.album.images[0].url;
        coverImg.alt = track.name;
        coverImg.className = 'cover';

        const trackInfo = document.createElement('div');
        trackInfo.className = 'track-info';

        const trackNameElement = document.createElement('h3');
        trackNameElement.textContent = track.name;

        const artistName = document.createElement('p');
        artistName.textContent = track.artists.map(artist => artist.name).join(', ');

        trackInfo.appendChild(trackNameElement);
        trackInfo.appendChild(artistName);
        resultItem.appendChild(coverImg);
        resultItem.appendChild(trackInfo);

        resultsContainer.appendChild(resultItem);
        localStorage.setItem('trackList', JSON.stringify(trackList));
        updatePrice();
    });
}


let draggedItemIndex = -1;

function dragStart(event) {
    draggedItemIndex = parseInt(event.target.getAttribute('data-index'));
    event.dataTransfer.setData("text/plain", draggedItemIndex);
    event.dataTransfer.effectAllowed = 'move';
}

function dragOver(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
    const targetIndex = parseInt(event.target.closest('.result-item').getAttribute('data-index'));
    swapItems(draggedItemIndex, targetIndex);
    updateTrackList();
}

function dragEnter(event) {
    event.preventDefault();
}

function dragLeave(event) {
    event.preventDefault();
}

function swapItems(fromIndex, toIndex) {
    const tempItem = trackList[fromIndex];
    trackList[fromIndex] = trackList[toIndex];
    trackList[toIndex] = tempItem;
}

function confirmSelection() {
    if (trackList.length < 3) {
        alert('Veuillez ajouter au moins 3 titres.');
        return;
    }

}

function updatePrice() {
    const totalPrice = basePrice + (trackList.length * pricePerTrack);
    document.getElementById('totalPrice').textContent = `Prix: ${totalPrice.toFixed(2)}€`;
}

function confirmSelection () {
    if (trackList.length < 3) {
        alert('Veuillez ajouter au moins 3 titres.');
        return;
    }

    const totalPrice = basePrice + (trackList.length * pricePerTrack);
    const confirmMessage = `Voulez-vous confirmer votre sélection pour ${totalPrice.toFixed(2)}€ ?`;
    if (confirm(confirmMessage)) {
        localStorage.setItem('trackList', JSON.stringify(trackList));
        window.location.href = 'index.html';
    }
}