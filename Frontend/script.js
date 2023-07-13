async function getChatGPTResponse(inputText) {
    const apiKey = "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"; // Replace with your actual API key
    const apiUrl = 'https://api.openai.com/v1/chat/completions';
  
    const requestBody = {
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: inputText }
      ]
    };
  
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify(requestBody)
      });
  console.log(response);
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }
  
      const data = await response.json();
  
      if (data.choices && data.choices.length > 0) {
        const completionText = data.choices[0].message.content;
        return completionText;
      } else {
        throw new Error('No choices found in API response');
      }
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
  
  document.getElementById('storyForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevents the form from being submitted and the page from reloading
  
    const inputText = document.getElementById('inputText').value;
    console.log('Input Text:', inputText);
  
    getChatGPTResponse(inputText)
      .then(response => {
        console.log('Generated Response:', response);
        // Handle the response as needed
      })
      .catch(error => {
        console.error('Error:', error);
        // Handle the error as needed
      });
  });
  