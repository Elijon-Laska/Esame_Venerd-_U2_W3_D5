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

      const card = document.createElement("div");
      card.className = "card mb-4 shadow-sm";

      const img = document.createElement("img");
      img.src = product.imageUrl;
      img.className = "card-img-top";
      img.alt = product.name;

      const cardBody = document.createElement("div");
      cardBody.className = "card-body";

      const cardTitle = document.createElement("h5");
      cardTitle.className = "card-title";
      cardTitle.textContent = product.name;

      const cardText = document.createElement("p");
      cardText.className = "card-text";
      cardText.textContent = `${product.price} 💲`;

      const buttonContainer = document.createElement("div");
      buttonContainer.className = "d-flex justify-content-between";

      const editButton = document.createElement("button");
      editButton.className = "btn btn-secondary";
      editButton.textContent = "Modifica 🔧";
      editButton.onclick = () => {
        window.location.href = `./backoffice.html?productId=${product._id}`;
      };

      const detailsLink = document.createElement("a");
      detailsLink.className = "link-secondary";
      detailsLink.textContent = "Dettagli";
      detailsLink.href = `./dettagli.html?productId=${product._id}`;

      buttonContainer.appendChild(editButton);
      buttonContainer.appendChild(detailsLink);

      cardBody.appendChild(cardTitle);
      cardBody.appendChild(cardText);
      cardBody.appendChild(buttonContainer);

      card.appendChild(img);
      card.appendChild(cardBody);

      col.appendChild(card);
      mainRow.appendChild(col);
    });
  })
  .catch((error) => console.error("Error fetching data:", error));
