window.addEventListener('DOMContentLoaded', (event) => {
    const divsToHide = document.querySelectorAll('.options-container-img'); 
    divsToHide.forEach(div => {
        div.style.display = 'none';
    });
});

window.addEventListener('DOMContentLoaded', (event) => {
    const divsToHide = document.querySelectorAll('.options-container-color'); 
    divsToHide.forEach(div => {
        div.style.display = 'none';
    });
});

window.addEventListener('DOMContentLoaded', (event) => {
    const divsToHide = document.querySelectorAll('.options-container-disque-perso-q');
    divsToHide.forEach(div => {
        div.style.display = 'none';
    });
});

window.addEventListener('DOMContentLoaded', (event) => {
    const divsToHide = document.querySelectorAll('.options-container-skin-photo');
    divsToHide.forEach(div => {
        div.style.display = 'none';
    });
});

window.addEventListener('DOMContentLoaded', (event) => {
    const divsToHide = document.querySelectorAll('.options-container-skin-couleur');
    divsToHide.forEach(div => {
        div.style.display = 'none';
    });
});

window.addEventListener('DOMContentLoaded', (event) => {
    const divsToHide = document.querySelectorAll('.options-container-tracklist');
    divsToHide.forEach(div => {
        div.style.display = 'none';
    });
});



function changeImage(src) {
    const image = document.getElementById('selected-image');
    
    image.style.opacity = '0';
  
    setTimeout(() => {
      image.src = src;
      image.style.opacity = '1'; 
    }, 300);
  }


function changeSkin(src) {
    const image = document.getElementById('skin');
    
    document.querySelector('.skin-c').style.display = 'block';
    image.style.opacity = '0';
  
    setTimeout(() => {
      image.src = src;
      image.style.opacity = '1';
    }, 300);
  }



function toggleDivsImg(divId) {
    document.querySelector('.options-container').style.display = 'none';
    
    const divsToHide = document.querySelectorAll('.options-container-img'); 
    divsToHide.forEach(div => {
        div.style.display = 'block';
    });
};

function toggleDivsSkin(divId) {
    document.querySelector('.options-container-img').style.display = 'none';
    document.querySelector('.options-container-color').style.display = 'none';

    const divsToHide = document.querySelectorAll('.options-container-disque-perso-q');
    divsToHide.forEach(div => {
        div.style.display = 'block';
    });

    const image = document.getElementById('selected-image');

    image.style.opacity = '0';


    setTimeout(() => {
        image.style.opacity = '1';
    }, 300);
};


function toggleDivsColor(divId) {
    document.querySelector('.options-container').style.display = 'none';
    
    const divsToHide = document.querySelectorAll('.options-container-color');
    divsToHide.forEach(div => {
        div.style.display = 'block';
    });
};

function toggleDivsSkinPhoto(divId) {
    document.querySelector('.options-container-disque-perso-q').style.display = 'none';
    
    const divsToHide = document.querySelectorAll('.options-container-skin-photo');
    divsToHide.forEach(div => {
        div.style.display = 'block';
    });
};

function toggleDivsSkinCouleur(divId) {
    document.querySelector('.options-container-disque-perso-q').style.display = 'none';
    
    const divsToHide = document.querySelectorAll('.options-container-skin-couleur');
    divsToHide.forEach(div => {
        div.style.display = 'block';
    });
};

function toggleDivsMusic(divId) {
    const skinPhotoDiv = document.querySelector('.options-container-skin-photo');
    const skinCouleurDiv = document.querySelector('.options-container-skin-couleur');
    
    if(skinPhotoDiv) {
        skinPhotoDiv.style.display = 'none';
    }
    if(skinCouleurDiv) {
        skinCouleurDiv.style.display = 'none';
    }
    
    const divsToShow = document.querySelectorAll('.track-search-container');
    divsToShow.forEach(div => {
        if(div) {
            div.style.display = 'block';
        }
    });
}


