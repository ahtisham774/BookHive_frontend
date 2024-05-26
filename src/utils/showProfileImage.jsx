

export const createImageLetter = (ch) => {
    const canvas = document.createElement("canvas");
    canvas.width = 100;
    canvas.height = 100;
    
    const context = canvas.getContext("2d");
    context.fillStyle = "#f1f1f1";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.font = "35px Arial";
    context.fillStyle = "#000";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(ch, 50, 50);
    return canvas.toDataURL();
  
}