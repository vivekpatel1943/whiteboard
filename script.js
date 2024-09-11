
function draw() {
    const canvas = document.getElementById('canvas');
    const dots = document.getElementById('dots');
    const eraser = document.getElementById('eraser');
    const lines = document.getElementById('lines');
    const images = document.getElementById('images');
    const imageInput = document.getElementById('imageInput');

    if (canvas.getContext) {
        const ctx = canvas.getContext('2d');
/* 
        ctx.beginPath();
        ctx.arc(155, 80, 60, 0, 2 * Math.PI, true);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(155, 120, 60, 0, 2 * Math.PI, true);
        ctx.fillStyle = "rgb(200 0 0)";
        ctx.fill();

        // ctx.clearRect(150,90,50,50);
        // ctx.clearRect(50,50,50,50); */

        let prevX = 0, prevY = 0; //flag to store coordinates

        // Eraser

        let isErasing = false; //flag to check if erasing is active

        eraser.addEventListener('click', function () {

            if (eraser.className == 'eraserInactive') {

                eraser.className = 'eraserActive';
                enableEraser();

                // when the eraser button is active
                // canvas.addEventListener('mousemove', eraseOnCanvas)
            } else if (eraser.className == 'eraserActive') {

                eraser.className = 'eraserInactive';
                disableEraser();


                // when the eraser button is inactive
                // canvas.removeEventListener('mousemove', eraseOnCanvas)
            }


        })



        function startingCoordinatesErase(event) {


            // get the bounding rectangle  of the canvas
            // getBoundingClientRect gives you the position of the canvas with respect to the viewport
            const rect = canvas.getBoundingClientRect();

            // calculate the mouse coordinates relative to the canvas
            // event.clientX gives you the x-coordinate of the mousepointer with respect to the viewport
            // event.clientY gives you the y-coordinate of the mousepointer with respect to the viewport

            prevX = event.clientX - rect.left;
            prevY = event.clientY - rect.top;

            // console.log(`mouse coordinates (x,y): ${x}:${y}, `)/

            // ctx.clearRect(x, y, 25, 25);
        }

        canvas.addEventListener('mouseup', function (event) {
            isErasing = false;
        })

        function Erase(event) {
            if (!isErasing) return;

            const rect = canvas.getBoundingClientRect();

            let x = event.clientX - rect.left;
            let y = event.clientY - rect.top;


            ctx.clearRect(x, y, 25, 25);

            prevX = x;
            prevY = y;



        }

        function enableEraser(event) {
            canvas.addEventListener('mousedown', (event) => {
                isErasing = true;
                startingCoordinatesErase(event);
            });
            canvas.addEventListener('mousemove', Erase);
        }

        function disableEraser(event) {
            canvas.removeEventListener('mousedown', startingCoordinatesErase);
            canvas.removeEventListener('mousemove', Erase);
        }

        dots.addEventListener('click', function () {
            if (dots.className == 'dotsInactive') {
                dots.className = 'dotsActive';

                // when the pencil button is active 
                canvas.addEventListener('mousemove', dotsOnCanvas)

            } else if (dots.className == 'dotsActive') {
                dots.className = 'dotsInactive';

                // when the pencil button is inactive
                canvas.removeEventListener('mousemove', dotsOnCanvas)

            }

        })

        function dotsOnCanvas(event) {

            // get the bounding rectangle  of the canvas
            // getBoundingClientRect gives you the position of the canvas with respect to the viewport
            const rect = canvas.getBoundingClientRect();

            // calculate the mouse coordinates relative to the canvas
            // event.clientX gives you the x-coordinate of the mousepointer with respect to the viewport
            // event.clientY gives you the y-coordinate of the mousepointer with respect to the viewport

            let x = event.clientX - rect.left;
            let y = event.clientY - rect.top;

            console.log(`mouse coordinates (x,y): ${x}:${y}, `)

            ctx.beginPath();
            ctx.arc(x, y, 1, 0, 2 * Math.PI, true);
            ctx.fillStyle = "rgb(0 0 0)";
            ctx.fill();

        }

        // drawing lines

        let isDrawing = false;

        lines.addEventListener('click', function () {
            if (lines.className == 'linesInactive') {

                lines.className = 'linesActive';
                

                enableLineDraw();


            } else if (lines.className == 'linesActive') {
                lines.className = 'linesInactive';
                disableLineDraw();



            }

        })

        canvas.addEventListener('mouseup', () => {
            isDrawing = false;
        })





        function lineCoordinates(event) {


            // getBoundingClientRect method measures the position of the canvas with respect to the viewport
            const rect = canvas.getBoundingClientRect();
            //event.clientX measures the x-coordinate of the event with respect to the viewport
            // event.clientX - rect.left basically gives you the x-coordinate of the event with respect to the canvas
            // rect.left gives you the x-coordinate of the point of canvas with respect to the viewport
            prevX = event.clientX - rect.left;
            //event.clientY measures the y-coordinate of the event with respect to the viewport
            // event.clientY - rect.top basically gives you the y-coordinate of the event with respect to the canvas
            // rect.top gives you the y-coordinate of the point of canvas with respect to the viewport
            prevY = event.clientY - rect.top;


        }



        function drawLine(event) {
            if (!isDrawing) return;
            // getBoundingClientRect method is used to measure the position of the canvas with respect to the viewport 
            const rect = canvas.getBoundingClientRect();
            //event.clientX measures the x-coordinate of the mousepointer with respect to the viewport
            // event.clientX - rect.left basically gives you the x-coordinate of the mousepointer with respect to the canvas
            // rect.left gives you the x-coordinate of the point of canvas with respect to the viewport
            let x = event.clientX - rect.left;
            //event.clienty measures the y-coordinate of the event(in this case mousedown) with respect to the viewport
            // event.clientX - rect.left basically gives you the x-coordinate of the mousepointer with respect to the canvas
            // rect.left gives you the x-coordinate of the point of canvas with respect to the viewport
            let y = event.clientY - rect.top;

            // begin drawing a line from the points to the current ones
            ctx.beginPath();
            ctx.moveTo(prevX, prevY); //start from the previous position
            ctx.lineTo(x, y); //line to present position
            ctx.strokeStyle = "rgb(0,0,0)";
            ctx.lineWidth = 2;
            ctx.stroke();

            // update the previous coordinates
            prevX = x;
            prevY = y;
        }

        // Enable line drawing by adding event listeners
        function enableLineDraw() {
            canvas.addEventListener('mousedown', (event) => {
                isDrawing = true;
                lineCoordinates(event); //set starting coordinates on mousedown
            });
            canvas.addEventListener('mousemove', drawLine);
        }

        // disable line drawing by removing event listeners
        function disableLineDraw() {
            canvas.removeEventListener('mousedown', lineCoordinates); //should remove the wrapper function
            canvas.removeEventListener('mousemove', drawLine);
        }

        /*   function drawOnCanvas() {
              let isDrawing = false;  //flag to check if drawing is active
              let prevX = 0, prevY = 0 //To store the previous coordinates
  
              // the line shall be drawn starting from the point where the mouse was clicked the first time
              canvas.addEventListener('mousedown', (event) => {
                  isDrawing = true; //start drawing when mouse is pressed
                  // getBoundingClientRect method measures the position of the canvas with respect to the viewport
                  const rect = canvas.getBoundingClientRect();
                  //event.clientX measures the x-coordinate of the event(in this case mousedown) with respect to the viewport
                  // event.clientX - rect.left basically gives you the x-coordinate of the mousedown event with respect to the canvas
                  // rect.left gives you the x-coordinate of the point of canvas with respect to the viewport
                  prevX = event.clientX - rect.left;
                  //event.clientY measures the y-coordinate of the event(in this case mousedown) with respect to the viewport
                  // event.clientY - rect.top basically gives you the y-coordinate of the mousedown event with respect to the canvas
                  // rect.top gives you the y-coordinate of the point of canvas with respect to the viewport
                  prevY = event.clientY - rect.top;
              })
  
              canvas.addEventListener('mouseup', () => {
                  // stop drawing when the mouse button is released
                  isDrawing = false; //the second the mouse is up isDrawing becomes false 
              })
  
              canvas.addEventListener('mousemove', (event) => {
                  if (!isDrawing) return; //Only draw if the mouse is down
  
                  // getBoundingClientRect method is used to measure the position of the canvas with respect to the viewport 
                  const rect = canvas.getBoundingClientRect();
                  //event.clientX measures the x-coordinate of the mousepointer with respect to the viewport
                  // event.clientX - rect.left basically gives you the x-coordinate of the mousepointer with respect to the canvas
                  // rect.left gives you the x-coordinate of the point of canvas with respect to the viewport
                  let x = event.clientX - rect.left;
                  //event.clienty measures the y-coordinate of the event(in this case mousedown) with respect to the viewport
                  // event.clientX - rect.left basically gives you the x-coordinate of the mousepointer with respect to the canvas
                  // rect.left gives you the x-coordinate of the point of canvas with respect to the viewport
                  let y = event.clientY - rect.top;
  
                  // begin drawing a line from the points to the current ones
                  ctx.beginPath();
                  ctx.moveTo(prevX, prevY); //start from the previous position
                  ctx.lineTo(x, y); //line to present position
                  ctx.strokeStyle = "rgb(0,0,0)";
                  ctx.lineWidth = 2;
                  ctx.stroke();
  
                  // update the previous coordinates
                  prevX = x;
                  prevY = y;
  
              })
  
          } */

        images.addEventListener('click', function () {
            if (images.className === 'imageInactive') {
                alert("please drag and drop your image..")

                images.className = 'imageActive';
                imageInput.click();
                enableImageDragAndDrop();

            } else if (images.className === 'imageActive') {
                images.className = 'imageInactive';
                disableImageDragandDrop();



            }

        })


        function handleDragOver(event) {
            event.preventDefault();  //necessary to allow a drop
        }

        function handleDrop(event) {
            event.preventDefault();

            // getBoundingClientRect measures the position of the canvas with repect to the viewport
            const rect = canvas.getBoundingClientRect();

            // 
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            // Get the dropped file (the first one if multiple files are dropped)
            const file = event.dataTransfer.files[0];

            // Ensure it's an image file
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();

                // once the file is loaded, create an image element
                reader.onload = function (e) {
                    const img = new Image();
                    img.src = e.target.result;

                    // once the image is loaded , draw it into the canvas
                    img.onload = function () {
                        // ctx.clearRect(0,0,300,300)
                        ctx.drawImage(img, x, y); //Draw the image

                    }


                }

                // Read the file as a data URL
                reader.readAsDataURL(file);

            } else {
                alert("Please drop an image file");
            }
        }

        function enableImageDragAndDrop() {
            canvas.addEventListener('dragover', handleDragOver);
            canvas.addEventListener('drop', handleDrop);
        }

        function disableImageDragandDrop() {
            canvas.removeEventListener('dragover', handleDragOver);
            canvas.removeEventListener('drop', handleDrop);
        }



        /*  function drawImage() {
 
 
             // prevent the default dragover behaviour to allow dropping
             canvas.addEventListener('dragover', function (event) {
                 event.preventDefault(); //necesarry to allow a drop
             })
 
             // Handle the drop event
             canvas.addEventListener('drop', function (event) {
                 event.preventDefault();
 
                 // getBoundingClientRect measures the position of the canvas with repect to the viewport
                 const rect = canvas.getBoundingClientRect();
 
                 // 
                 const x = event.clientX - rect.left;
                 const y = event.clientY - rect.top;
 
                 // Get the dropped file (the first one if multiple files are dropped)
                 const file = event.dataTransfer.files[0];
 
                 // Ensure it's an image file
                 if (file.type.startsWith('image/')) {
                     const reader = new FileReader();
 
                     // once the file is loaded, create an image element
                     reader.onload = function (e) {
                         const img = new Image();
                         img.src = e.target.result;
 
                         // once the image is loaded , draw it into the canvas
                         img.onload = function () {
                             // ctx.clearRect(0,0,300,300)
                             ctx.drawImage(img, x, y); //Draw the image
 
                         }
 
 
                     }
 
                     // Read the file as a data URL
                     reader.readAsDataURL(file);
 
                 } else {
                     alert("Please drop an image file");
                 }
 
 
             })
 
         }
  */
    }

}






// window.addEventListener('load',draw);
draw();

