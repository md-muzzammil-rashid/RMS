export const  extractErrorMessage = (loginStatusMessage)=> {
    // Create a temporary DOM element to parse the HTML
    const tempElement = document.createElement('div');
    tempElement.innerHTML = loginStatusMessage;
  
    // Extract the error message from the parsed HTML
    const preElement = tempElement.querySelector('pre');
    console.log("pre",preElement.inn);
    if (preElement) {
      // Extract the text content of the pre element and remove leading/trailing whitespaces
      return  preElement.innerHTML.split('<br>')[0].trim().slice(7,);
    } else {
      return 'Error message not found'; // Default message if pre element is not found
    }
  }