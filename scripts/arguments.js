const sentenceContainer = document.getElementById('sentenceContainer');
const checkBtn = document.getElementById('checkBtn');
const resultText = document.getElementById('resultText');

let correctOrder = ['Sentence 1', 'Sentence 2', 'Sentence 3', 'Sentence 4'];

let draggedSentence = null;

// Fonction pour mélanger un tableau de manière aléatoire
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Fonction pour gérer l'événement de démarrage du glisser-déposer (souris et tactile)
function dragStart(event) {
    draggedSentence = event.target;
    // Vérifier si event.dataTransfer est défini avant d'essayer d'accéder à ses propriétés
    if (event.dataTransfer) {
      event.dataTransfer.setData('text/plain', event.target.textContent);
    }
  }

// Fonction pour gérer l'événement de survol du glisser-déposer (souris et tactile)
function dragOver(event) {
  event.preventDefault();
  const draggedRect = draggedSentence.getBoundingClientRect();
  const targetRect = event.target.getBoundingClientRect();
  const mouseY = event.clientY || event.touches[0].clientY;

  // Vérifier si l'élément survolé est la phrase elle-même
  const isTargetSentence = event.target.classList.contains('sentence');

  // Vérifier si la souris est au-dessus ou au-dessous du point médian vertical de la phrase survolée
  const targetMidY = targetRect.top + (targetRect.height / 2);

  // Ajouter une classe pour indiquer si la phrase doit être placée avant ou après la phrase survolée,
  // uniquement si la souris est au-dessus ou au-dessous du point médian vertical de la phrase
  if (isTargetSentence) {
    if (mouseY < targetMidY) {
      event.target.classList.add('drag-over-top');
      event.target.classList.remove('drag-over-bottom');
    } else {
      event.target.classList.add('drag-over-bottom');
      event.target.classList.remove('drag-over-top');
    }
  }
}

// Fonction pour gérer l'événement de sortie du glisser-déposer (souris et tactile)
function dragLeave(event) {
  event.target.classList.remove('drag-over', 'drag-over-top', 'drag-over-bottom');
}

// Fonction pour gérer l'événement de dépôt du glisser-déposer (souris et tactile)
function drop(event) {
  event.preventDefault();
  event.target.classList.remove('drag-over', 'drag-over-top', 'drag-over-bottom');
  const isTargetSentence = event.target.classList.contains('sentence');
  if (isTargetSentence) {
    if (draggedSentence !== event.target) {
      const rect = event.target.getBoundingClientRect();
      const mouseY = (event.clientY || event.touches[0].clientY) - rect.top;
      const isBelow = mouseY > event.target.clientHeight / 2;
      event.target.parentNode.insertBefore(draggedSentence, isBelow ? event.target.nextSibling : event.target);
    }
  } else {
    sentenceContainer.appendChild(draggedSentence); // Remettre la phrase à sa place d'origine
  }
}

// Fonction pour vérifier l'ordre
function checkOrder() {
  const currentOrder = Array.from(sentenceContainer.querySelectorAll('.sentence')).map(sentence => sentence.textContent.trim());
  if (JSON.stringify(currentOrder) === JSON.stringify(correctOrder)) {
    resultText.textContent = 'Congratulations! You got the correct order!';
    resultText.style.color = 'green';
  } else {
    resultText.textContent = 'Incorrect order. Try again!';
    resultText.style.color = 'red';
  }
}

// Mélanger l'ordre des phrases
const sentences = Array.from(sentenceContainer.querySelectorAll('.sentence'));
shuffleArray(sentences);
sentences.forEach(sentence => sentenceContainer.appendChild(sentence));

// Ajouter les écouteurs d'événements pour les appareils tactiles
sentenceContainer.addEventListener('touchstart', dragStart);
sentenceContainer.addEventListener('touchend', drop);
sentenceContainer.addEventListener('touchmove', dragOver);

// Ajouter les écouteurs d'événements pour les appareils non tactiles
sentenceContainer.addEventListener('dragstart', dragStart);
sentenceContainer.addEventListener('dragover', dragOver);
sentenceContainer.addEventListener('dragleave', dragLeave);
sentenceContainer.addEventListener('drop', drop);
checkBtn.addEventListener('click', checkOrder);
