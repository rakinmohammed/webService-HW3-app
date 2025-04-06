const API_URL = "https://webservice-hw3-app-hycneybzc9dhbxbq.eastus-01.azurewebsites.net/food";

document.addEventListener("DOMContentLoaded", loadFoods);

async function loadFoods() {
    const response = await fetch(API_URL);
    const foods = await response.json();

    const tableBody = document.getElementById("food-table");
    tableBody.innerHTML = ""; // Clear table before loading data

    foods.forEach(food => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td contenteditable="true" onBlur="updateFood(${food.id}, this, 'name')">${food.name}</td>
            <td contenteditable="true" onBlur="updateFood(${food.id}, this, 'description')">${food.description}</td>
            <td contenteditable="true" onBlur="updateFood(${food.id}, this, 'calories')">${food.calories}</td>
            <td><button onclick="deleteFood(${food.id})">Delete From Table</button></td>
        `;

        tableBody.appendChild(row);
    });
}

// Add new food item
async function addFood() {
    const name = document.getElementById("name").value;
    const description = document.getElementById("description").value;
    const calories = document.getElementById("calories").value;

    if (!name || !description || !calories) {
        alert("All fields are required!");
        return;
    }

    await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description, calories })
    });

    loadFoods();
}

// Update food item
async function updateFood(id, element, column) {
    const newValue = element.innerText;
    const row = element.parentElement.children;
    const name = row[0].innerText;
    const description = row[1].innerText;
    const calories = row[2].innerText;

    await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description, calories })
    });

    loadFoods();
}

// Delete food item
async function deleteFood(id) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    loadFoods();
}
