// Function to trigger file input click
function uploadSubFile() {
  document.getElementById('fileInput').click(); // Simulates a click on the hidden file input
}

// Function to handle file upload and processing
function handleFileUpload() {
  const file = document.getElementById('fileInput').files[0];
  if (!file) return;

  // Change the button text to the filename
  document.getElementById('uploadBtn').textContent = file.name;

  const reader = new FileReader();
  reader.onload = function(e) {
      const content = e.target.result;
      const dataRawLine = content.split('\n').find(line => line.startsWith('Data_RAW:'));
      
      if (dataRawLine) {
          const data = dataRawLine.split(': ')[1].trim();
          const numbers = data.split(' ').slice(7); // Neem alleen de cijfers na "00 00 00 00 00 00 01"

          // Verwijder de 3e, 4e, 7e, 8e nummers
          const filteredNumbers = numbers.filter((_, index) => ![2, 3, 6, 7].includes(index));

          console.log(filteredNumbers.join('')); // Print de overgebleven nummers in de console
          document.getElementById('output').textContent = filteredNumbers.join('').replace(/1/g, '0').replace(/3/g, '1');

          // After processing, set the switches using filteredNumbers
          setSwitchesFromFilteredNumbers(filteredNumbers);
      } else {
          console.error('Data_RAW rij niet gevonden.');
          document.getElementById('output').textContent = 'Data_RAW rij niet gevonden.';
      }
  };
  reader.readAsText(file);
}

// Create 12 custom switches
const switchContainer = document.getElementById('switchContainer');
for (let i = 0; i < 12; i++) {
  const switchDiv = document.createElement('div');
  switchDiv.classList.add('switch');

  const switchInput = document.createElement('input');
  switchInput.type = 'checkbox';
  switchInput.id = 'switch' + i;

  const slider = document.createElement('span');
  slider.classList.add('slider');

  const toggleSwitch = document.createElement('label');
  toggleSwitch.classList.add('toggle-switch');
  toggleSwitch.appendChild(switchInput);
  toggleSwitch.appendChild(slider);

  const label = document.createElement('label');
  label.innerText = i + 1;
  label.htmlFor = switchInput.id;

  switchDiv.appendChild(toggleSwitch);
  switchDiv.appendChild(label);
  switchContainer.appendChild(switchDiv);
}

function setSwitchesFromFilteredNumbers(filteredNumbers) {
  const switchesCode = filteredNumbers.join('');
  for (let i = 0; i < 12; i++) {
    const switchInput = document.getElementById('switch' + i);
    switchInput.checked = switchesCode[i] === '3'; // 3 betekent aan, 1 betekent uit
    switchInput.disabled = true; // Disable user interaction
  }
}
