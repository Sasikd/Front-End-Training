let editingRow = null;
function handleSubmit() {
  const name = document.getElementById("name").value.trim();
  const age = document.getElementById("age").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const genderElements = document.getElementsByName("gender");
  const subjectElements = document.querySelectorAll(
    "input[type='checkbox']:checked"
  );
  const dob = document.getElementById("dob").value.trim();
  const location = document.getElementById("location").value;
  let gender = "";
  for (const element of genderElements) {
    if (element.checked) {
      gender = element.value;
      break;
    }
  }
  let subjects = Array.from(subjectElements)
    .map((element) => element.value)
    .join(", ");
  const errors = [];
  if (!/^[a-zA-Z\s']{2,}$/.test(name)) errors.push("Invalid Name");
  if (!/^\d{1,2}$/.test(age) || parseInt(age) < 1 || parseInt(age) > 100)
    errors.push("Invalid Age");
  if (!/^[6-9]\d{9}$/.test(phone)) errors.push("Invalid Phone Number");
  if (!gender) errors.push("Please select Gender");
  if (!subjects) errors.push("Please select at least one Subject");
  if (!/^\d{2}\/\d{2}\/\d{4}$/.test(dob)) errors.push("Invalid DOB (DD/MM/YYYY)");
  if (!location) errors.push("Please select Location");

  const notification = document.getElementById("notification");
  if (errors.length) {
    notification.textContent = errors.join(", ");
    notification.style.color = "red";
    return;
  }
  notification.textContent = "Submitted successfully!";
  notification.style.color = "green";
  if (editingRow) {
    editingRow.innerHTML = `
      <td>${name}</td>
      <td>${age}</td>
      <td>${phone}</td>
      <td>${gender}</td>
      <td>${subjects}</td>
      <td>${dob}</td>
      <td>${location}</td>
      <td>
        <button onclick="editRow(this)">Edit</button>
        <button onclick="deleteRow(this)">Delete</button>
      </td>
    `;
    editingRow = null;
    notification.textContent = "Updated successfully!";
  } else {
    const tableBody = document.querySelector("#crudTable tbody");
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${name}</td>
      <td>${age}</td>
      <td>${phone}</td>
      <td>${gender}</td>
      <td>${subjects}</td>
      <td>${dob}</td>
      <td>${location}</td>
      <td>
        <button onclick="editRow(this)">Edit</button>
        <button onclick="deleteRow(this)">Delete</button>
      </td>
    `;
    tableBody.appendChild(row);
  }
  document.getElementById("crudForm").reset();
  document.getElementById("submitButton").textContent = "Submit";
}
function deleteRow(button) {
  const row = button.closest("tr");
  row.remove();
}
function editRow(button) {
  const row = button.closest("tr");
  const cells = row.querySelectorAll("td");
  document.getElementById("name").value = cells[0].textContent;
  document.getElementById("age").value = cells[1].textContent;
  document.getElementById("phone").value = cells[2].textContent;
  const gender = cells[3].textContent;
  const genderElements = document.getElementsByName("gender");
  for (const element of genderElements) {
    element.checked = element.value === gender;
  }
  const subjects = cells[4].textContent.split(", ");
  const subjectElements = document.querySelectorAll("input[type='checkbox']");
  for (const element of subjectElements) {
    element.checked = subjects.includes(element.value);
  }
  document.getElementById("dob").value = cells[5].textContent;
  document.getElementById("location").value = cells[6].textContent;
  editingRow = row;
  document.getElementById("submitButton").textContent = "Update";
}
