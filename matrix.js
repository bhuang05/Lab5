function generateMatrices() {
  createMatrix(
    "The 1st Matrix",
    "matrix1",
    document.getElementById("matrix1Rows").value,
    document.getElementById("matrix1Cols").value
  );
  createMatrix(
    "The 2nd Matrix",
    "matrix2",
    document.getElementById("matrix2Rows").value,
    document.getElementById("matrix2Cols").value
  );
  // When generating new matrices you would want your reuslt to also dissapear
  let container = document.getElementById("matrix3");
  container.innerHTML = "";
}

const createMatrix = (title, containerId, rows, cols) => {
  let container = document.getElementById(containerId);
  container.innerHTML = ""; // Clear previous content
  let table = document.createElement("table");
  for (let i = 0; i < rows; i++) {
    let tr = document.createElement("tr");
    for (let j = 0; j < cols; j++) {
      let td = document.createElement("td");
      let input = document.createElement("input");
      input.type = "number";
      input.value = Math.floor(Math.random() * 100); // Random value between 0 and 99
      td.appendChild(input);
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
  let caption = table.createCaption();
  caption.textContent = title;
  container.appendChild(table);
};

const showResult = (title, containerId, rows, cols, dataArray) => {
  let container = document.getElementById(containerId);
  container.innerHTML = ""; // Clear previous content
  let table = document.createElement("table");

  for (let i = 0; i < rows; i++) {
    let tr = document.createElement("tr");
    for (let j = 0; j < cols; j++) {
      let td = document.createElement("td");
      let span = document.createElement("span");
      // Calculate the index in the dataArray based on current row and column
      let index = i * cols + j;
      if (index < dataArray.length) {
        span.innerHTML = dataArray[index];
      }
      td.appendChild(span);
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
  let caption = table.createCaption();
  caption.textContent = title;
  container.appendChild(table);
};

const showResult2D = (title, containerId, rows, cols, dataArray) => {
  if (typeof dataArray === "string") {
    let container = document.getElementById(containerId);
    container.innerHTML = dataArray;
  } else {
    let container = document.getElementById(containerId);
    container.innerHTML = "";
    let table = document.createElement("table");
    for (let i = 0; i < rows; i++) {
      let tr = document.createElement("tr");
      for (let j = 0; j < cols; j++) {
        let td = document.createElement("td");
        let input = document.createElement("input");
        input.type = "number";
        input.value = dataArray[i][j]; // Random value between 0 and 99
        td.appendChild(input);
        tr.appendChild(td);
      }
      table.appendChild(tr);
    }
    let caption = table.createCaption();
    caption.textContent = title;
    container.appendChild(table);
  }
};

function performOperation(operation) {
  let matrix1 = getMatrixData2D("matrix1");
  let matrix2 = getMatrixData2D("matrix2");
  console.log("1st Matrix", matrix1);
  console.log("2nd Matrix", matrix2);
  console.log("Operation", operation);

  if (operation === "add") {
    result = addMatrices(matrix1, matrix2);
  } else if (operation === "subtract") {
    result = subtractMatrices(matrix1, matrix2);
  } else if (operation === "multiply") {
    result = multiplyMatrices(matrix1, matrix2);
  }

  rows = result.length;
  cols = result[0].length;

  showResult2D("The Result", "matrix3", rows, cols, result);
}

const getMatrixData1D = function (matrixId) {
  let matrixData = [];
  let inputs = document.querySelectorAll(`#${matrixId} input`);
  inputs.forEach((input) => {
    matrixData.push(parseInt(input.value, 10));
  });
  return matrixData;
};

const getMatrixData2D = function (matrixId) {
  let matrixData = [];
  let rows = parseInt(document.getElementById(matrixId + "Rows").value, 10);
  let cols = parseInt(document.getElementById(matrixId + "Cols").value, 10);
  let inputs = document.querySelectorAll(`#${matrixId} input`);

  for (let i = 0; i < rows; i++) {
    let rowData = [];
    for (let j = 0; j < cols; j++) {
      // Calculate index in the flat list of inputs
      let index = i * cols + j;
      if (index < inputs.length) {
        rowData.push(parseInt(inputs[index].value, 10));
      } else {
        rowData.push(0); // Default value if input is missing
      }
    }
    matrixData.push(rowData);
  }
  return matrixData;
};

// Add your matrix calculation functions here
// The functions must check the posibility of calculation too.
function addMatrices(matrix1, matrix2) {
  m1rows = matrix1.length;
  m1cols = matrix1[0].length;
  m2rows = matrix2.length;
  m2cols = matrix2[0].length;
  if (m1rows !== m2rows || m1cols !== m2cols) {
    console.log("Matrices must have the same dimensions for addition.");
    return "Matrices must have the same dimensions for addition.";
  }

  let result = [];
  for (let i = 0; i < matrix1.length; i++) {
    let row = [];
    for (let j = 0; j < matrix1[i].length; j++) {
      row.push(matrix1[i][j] + matrix2[i][j]);
    }
    result.push(row);
  }

  console.log(result);

  return result;
}
const subtractMatrices = function (matrix1, matrix2) {
  m1rows = matrix1.length;
  m1cols = matrix1[0].length;
  m2rows = matrix2.length;
  m2cols = matrix2[0].length;
  if (m1rows !== m2rows || m1cols !== m2cols) {
    console.log("Matrices must have the same dimensions for addition.");
    return "Matrices must have the same dimensions for addition.";
  }

  let result = [];
  for (let i = 0; i < matrix1.length; i++) {
    let row = [];
    for (let j = 0; j < matrix1[i].length; j++) {
      row.push(matrix1[i][j] - matrix2[i][j]);
    }
    result.push(row);
  }

  console.log(result);

  return result;
};
const multiplyMatrices = (matrix1, matrix2) => {
  m1rows = matrix1.length;
  m1cols = matrix1[0].length;
  m2rows = matrix2.length;
  m2cols = matrix2[0].length;

  if (m1cols !== m2rows) {
    console.log(
      "The number of columns in the first matrix must be equal to the number of rows in the second matrix for multiplication."
    );
    return "The number of columns in the first matrix must be equal to the number of rows in the second matrix for multiplication.";
  }

  let result = [];
  for (let i = 0; i < m1rows; i++) {
    let row = [];
    for (let j = 0; j < m2cols; j++) {
      let sum = 0;
      for (let k = 0; k < m1cols; k++) {
        sum += matrix1[i][k] * matrix2[k][j];
      }
      row.push(sum);
    }
    result.push(row);
  }

  console.log(result);

  return result;
};
