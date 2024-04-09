document.addEventListener("DOMContentLoaded", () => {
    const data = [];

    document.getElementById("addDataBtn").addEventListener("click", (e) => {
        e.preventDefault();
        const firstName = document.getElementById("firstName").value.trim();
        const lastName = document.getElementById("lastName").value.trim();
        const gender = document.querySelector('input[name="gender"]:checked')?.value;
        const age = parseInt(document.getElementById("age").value, 10);
        const position = document.getElementById("position").value;

        if (firstName && lastName && gender && !isNaN(age)) {
            data.push({ fullName: `${firstName} ${lastName}`, gender, age, position });
            displayData(data);
        } else {
            alert("Please fill in all the fields correctly.");
        }
    });

    document.getElementById("filterBtn").addEventListener("click", () => {
        const searchQuery = document.getElementById("search").value.toLowerCase();
        const selectedGender = document.querySelector('input[name="searchGender"]:checked')?.value;
        const selectedPosition = document.querySelector('input[name="searchPosition"]:checked')?.value;
        const ageMin = parseInt(document.getElementById("ageMin").value, 10);
        const ageMax = parseInt(document.getElementById("ageMax").value, 10);

        const filteredData = data.filter(entry => {
            return (searchQuery === "" || entry.fullName.toLowerCase().includes(searchQuery)) &&
                   (!selectedGender || entry.gender === selectedGender) &&
                   (!selectedPosition || entry.position === selectedPosition) &&
                   (isNaN(ageMin) || entry.age >= ageMin) &&
                   (isNaN(ageMax) || entry.age <= ageMax);
        });

        displayData(filteredData);
    });

    function displayData(filteredData) {
        const tableBody = document.getElementById("dataTable").getElementsByTagName("tbody")[0];
        tableBody.innerHTML = "";

        filteredData.forEach(item => {
            const row = tableBody.insertRow();
            row.insertCell(0).textContent = item.fullName;
            row.insertCell(1).textContent = item.gender;
            row.insertCell(2).textContent = item.age;
            row.insertCell(3).textContent = item.position;
            row.classList.add("text-center"); // Ensure the data is centered
        });
    }
});
