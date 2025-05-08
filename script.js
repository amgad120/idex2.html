let users = [];

document.addEventListener('DOMContentLoaded', () => {
  fetch('https://jsonplaceholder.typicode.com/users')
    .then(res => res.json())
    .then(data => {
      users = data;
      renderTable();
    });

  document.getElementById('addBtn').addEventListener('click', () => {
    document.getElementById('formTitle').textContent = 'Add User';
    document.getElementById('userForm').reset();
    document.getElementById('userId').value = '';
    document.getElementById('formContainer').classList.remove('hidden');
  });

  document.getElementById('cancelBtn').addEventListener('click', () => {
    document.getElementById('formContainer').classList.add('hidden');
  });

  document.getElementById('userForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const id = document.getElementById('userId').value;
    const name = document.getElementById('name').value;
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;

    if (id) {
      const index = users.findIndex(u => u.id == id);
      users[index] = { ...users[index], name, username, email };
    } else {
      const newUser = {
        id: users.length ? users[users.length - 1].id + 1 : 1,
        name,
        username,
        email
      };
      users.push(newUser);
    }

    renderTable();
    document.getElementById('formContainer').classList.add('hidden');
  });
});

function renderTable() {
  const tbody = document.getElementById('userTableBody');
  tbody.innerHTML = '';

  users.forEach(user => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${user.id}</td>
      <td>${user.name}</td>
      <td>${user.username}</td>
      <td>${user.email}</td>
      <td>
        <button class="update-btn" onclick="editUser(${user.id})">Update</button>
        <button class="delete-btn" onclick="deleteUser(${user.id})">Delete</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function editUser(id) {
  const user = users.find(u => u.id == id);
  document.getElementById('formTitle').textContent = 'Update User';
  document.getElementById('userId').value = user.id;
  document.getElementById('name').value = user.name;
  document.getElementById('username').value = user.username;
  document.getElementById('email').value = user.email;
  document.getElementById('formContainer').classList.remove('hidden');
}

function deleteUser(id) {
  users = users.filter(u => u.id != id);
  renderTable();
}
