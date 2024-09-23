const switchContainer = document.getElementById('switchContainer');
    const resultDisplay = document.getElementById('result');

    // Mapping of the first 4 numbers to custom 4-number combinations
  const mapping = {
    '1111': '33 33', // 0000
    '1113': '33 31', // 0001
    '1131': '33 11', // 0010
    '1311': '31 11', // 0011
    '3111': '11 11', // 0100
    '1133': '33 13', // 0101
    '1331': '31 31', // 0110
    '3311': '13 11', // 0111
    '1313': '31 13', // 1000
    '3131': '11 31', // 1001
    '3113': '11 13', // 1010
    '1333': '31 33', // 1011
    '3331': '13 31', // 1100
    '3313': '13 13', // 1101
    '3133': '11 33', // 1110
    '3333': '13 33', // 1111
  };


    // Create 12 custom switches
    for (let i = 0; i < 12; i++) {
      const switchDiv = document.createElement('div');
      switchDiv.classList.add('switch');

      // Create the switch input (hidden)
      const switchInput = document.createElement('input');
      switchInput.type = 'checkbox';
      switchInput.id = 'switch' + i;
      switchInput.addEventListener('change', updateResult);

      // Create the slider (visible toggle part)
      const slider = document.createElement('span');
      slider.classList.add('slider');

      // Create the toggle switch container
      const toggleSwitch = document.createElement('label');
      toggleSwitch.classList.add('toggle-switch');
      toggleSwitch.appendChild(switchInput);
      toggleSwitch.appendChild(slider);

      // Create the label (number under the switch)
      const label = document.createElement('label');
      label.innerText = i + 1;
      label.htmlFor = switchInput.id;

      switchDiv.appendChild(toggleSwitch);
      switchDiv.appendChild(label);
      switchContainer.appendChild(switchDiv);
    }

    function updateResult() {
      let result = '';

      // Get values from switches
      for (let i = 0; i < 12; i++) {
        const switchInput = document.getElementById('switch' + i);
        result += switchInput.checked ? '3' : '1';
      }

      // Split the result into 3 groups of 4
      const firstGroup = result.substring(0, 4);
      const secondGroup = result.substring(4, 8);
      const thirdGroup = result.substring(8, 12);

      // Get the mapped value for the first 4 numbers
      const mappedValue = mapping[firstGroup];

      // Format the result with "00000000000001", mapped value, and spaces every 2 digits
      const formattedResult = `00 00 00 00 00 00 01 ${addSpaces(firstGroup)} ${mappedValue} ${addSpaces(secondGroup)} ${mappedValue} ${addSpaces(thirdGroup)}`;
      
      // Display the result
      resultDisplay.innerText = formattedResult;
    }

    // Function to add a space every 2 digits
    function addSpaces(str) {
      return str.replace(/(.{2})/g, "$1 ");
    }

    // Function to download the .sub file
    function downloadSubFile() {
      const inputField = document.getElementById('myInput');
      const result = resultDisplay.innerText;
      const filename = inputField.value.replace(/\s+/g, '_'); // Replace spaces with underscores
          // Check if the input field is empty
      if (!filename) {
        alert("Benoem je bestand!");
        return; // Exit the function if the input is empty
      }
      const content = `Filetype: Flipper SubGhz Key File\nVersion: 1\nFrequency: 433920000\nPreset: FuriHalSubGhzPresetOok650Async\nProtocol: BinRAW\nBit: 130\nTE: 285\nBit_RAW: 130\nData_RAW: ${result}`;
      const blob = new Blob([content], { type: 'text/plain' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `${filename}.sub`;
      link.click();
    }