const mainRow = document.getElementById("mainRow");
const apiUrl = "https://striveschool-api.herokuapp.com/api/product/";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzkzNjZjY2I3NDcwMTAwMTU4YjJiNTUiLCJpYXQiOjE3Mzc3MTMzNTYsImV4cCI6MTczODkyMjk1Nn0.ZqtC7vk3TvrTfksOYmLFSGTYApe7h_xCuH67Mk6zEs0";

fetch(apiUrl, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
})
  .then((response) => response.json())
  .then((data) => {
    data.forEach((product) => {
      const col = document.createElement("div");
      col.className = "col-md-4";
      col.innerHTML = `
            <div class="card mb-4 shadow-sm">
              <img src="${product.imageUrl}" class="card-img-top" alt="${product.name}">
              <div class="card-body">
                <h5 class="card-title">${product.name}</h5>
                <p class="card-text">${product.price} 💲</p>
              </div>
            </div>
          `;
      mainRow.appendChild(col);
    });
  })
  .catch((error) => console.error("Error fetching data:", error));
