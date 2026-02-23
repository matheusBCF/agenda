// Função para carregar contatos do LocalStorage
function loadContacts() {
  const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
  displayContacts(contacts);
  document.getElementById('totalContacts').innerText = `Total de contatos: ${contacts.length}`;
}

// Função para exibir os contatos na tabela
function displayContacts(contacts) {
  const tableBody = document.getElementById('contactsTable').getElementsByTagName('tbody')[0];
  tableBody.innerHTML = '';
  contacts.forEach((contact, index) => {
    const row = tableBody.insertRow();
    row.innerHTML = `
      <td>${contact.name}</td>
      <td>${contact.email}</td>
      <td>${contact.phone}</td>
      <td>
        <button onclick="editContact(${index})">Editar</button>
        <button onclick="deleteContact(${index})">Excluir</button>
      </td>
    `;
  });
}

// Função para filtrar contatos
function filterContacts() {
  const filterText = document.getElementById('filter').value.toLowerCase();
  const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
  const filteredContacts = contacts.filter(contact => contact.name.toLowerCase().includes(filterText));
  displayContacts(filteredContacts);
}

// Função para adicionar um novo contato
function addContact() {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;

  if (!name || !email || !phone) {
    alert('Por favor, preencha todos os campos!');
    return;
  }

  const newContact = { name, email, phone };
  const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
  contacts.push(newContact);
  localStorage.setItem('contacts', JSON.stringify(contacts));

  loadContacts();

  // Limpar campos
  document.getElementById('name').value = '';
  document.getElementById('email').value = '';
  document.getElementById('phone').value = '';
}

// Função para editar um contato
function editContact(index) {
  const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
  const contact = contacts[index];

  document.getElementById('name').value = contact.name;
  document.getElementById('email').value = contact.email;
  document.getElementById('phone').value = contact.phone;

  // Remover contato antigo e permitir editar
  contacts.splice(index, 1);
  localStorage.setItem('contacts', JSON.stringify(contacts));
  loadContacts();
}

// Função para excluir um contato
function deleteContact(index) {
  const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
  contacts.splice(index, 1);
  localStorage.setItem('contacts', JSON.stringify(contacts));
  loadContacts();
}

// Carregar contatos ao inicializar
loadContacts();