let selectedRow = null;

// Show alerts
function showAlert(message, className) {
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;
    div.style.width = '300px'; // Set a custom width
    div.appendChild(document.createTextNode(message));

    // Target the form container to insert the alert above the input fields
    const formContainer = document.querySelector("#student-form");
    // Insert the alert before the form
    formContainer.insertBefore(div, formContainer.firstChild);

    // Remove the alert after 3 seconds
    setTimeout(() => div.remove(), 3000);
}

// Clear all fields
function clearFields() {
    document.querySelector('#FirstName').value = '';
    document.querySelector('#LastName').value = '';
    document.querySelector('#PhoneNumber').value = '';
    document.querySelector('#EmailId').value = '';
    document.querySelector('#Address').value = '';
}

// Add data
document.querySelector("#student-form").addEventListener("submit", (e) => {
    e.preventDefault();

    // Get form values
    const FirstName = document.querySelector("#FirstName").value;
    const LastName = document.querySelector("#LastName").value;
    const PhoneNumber = document.querySelector("#PhoneNumber").value;
    const EmailId = document.querySelector("#EmailId").value;
    const Address = document.querySelector("#Address").value;

    // Validation
    if (FirstName === "" || LastName === "" || PhoneNumber === "" || EmailId === "" || Address === "") {
        showAlert("Please fill in all fields", "danger");
        return; // Early return
    }

    if (selectedRow == null) {
        const list = document.querySelector("#student-list");
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${FirstName}</td>
            <td>${LastName}</td>
            <td>${PhoneNumber}</td>
            <td>${EmailId}</td>
            <td>${Address}</td>
            <td>
                <a href="#" class="btn btn-warning btn-sm edit">Edit</a>
                <a href="#" class="btn btn-danger btn-sm delete">Delete</a>
            </td>
        `;

        list.appendChild(row);
        showAlert("User added", "success");
    } else {
        selectedRow.children[0].textContent = FirstName;
        selectedRow.children[1].textContent = LastName;
        selectedRow.children[2].textContent = PhoneNumber;
        selectedRow.children[3].textContent = EmailId;
        selectedRow.children[4].textContent = Address;
        showAlert("User info edited", "info");
    }

    selectedRow = null; // Reset the selected row
    clearFields();
});

// Edit and delete data
document.querySelector("#student-list").addEventListener("click", (e) => {
    const target = e.target;

    if (target.classList.contains("edit")) {
        selectedRow = target.parentElement.parentElement;
        document.querySelector("#FirstName").value = selectedRow.children[0].textContent;
        document.querySelector("#LastName").value = selectedRow.children[1].textContent;
        document.querySelector("#PhoneNumber").value = selectedRow.children[2].textContent;
        document.querySelector("#EmailId").value = selectedRow.children[3].textContent;
        document.querySelector("#Address").value = selectedRow.children[4].textContent;
    }

    if (target.classList.contains('delete')) {
        if (confirm("Are you sure you want to delete this user?")) {
            target.parentElement.parentElement.remove();
            showAlert("User data deleted", "danger");
        }
    }
});


