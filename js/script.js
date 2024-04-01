document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.getElementById("signatureCanvas");
    const context = canvas.getContext("2d");
  
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;
  
    canvas.addEventListener("mousedown", function(event) {
      isDrawing = true;
      [lastX, lastY] = [event.offsetX, event.offsetY];
    });
  
    canvas.addEventListener("mousemove", function(event) {
      if (!isDrawing) return;
      context.strokeStyle = "#000";
      context.lineJoin = "round";
      context.lineWidth = 2;
      context.beginPath();
      context.moveTo(lastX, lastY);
      context.lineTo(event.offsetX, event.offsetY);
      context.stroke();
      [lastX, lastY] = [event.offsetX, event.offsetY];
    });
  
    canvas.addEventListener("mouseup", function() {
      isDrawing = false;
    });
  
    canvas.addEventListener("mouseout", function() {
      isDrawing = false;
    });
  
    document.getElementById("clearButton").addEventListener("click", function() {
      context.clearRect(0, 0, canvas.width, canvas.height);
    });
  
    document.getElementById("changeBackgroundButton").addEventListener("click", function() {
      const colors = ["#ffffff", "#ffcccb", "#a9a9a9", "#87ceeb", "#90ee90"];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      canvas.style.background = randomColor;
    });
  
    document.getElementById("downloadButton").addEventListener("click", function() {
      const url = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = url;
      link.download = "signature.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  });
  