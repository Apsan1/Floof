export default function fetchUsers(){
    fetch('http://localhost:3000/users/all')
    .then(response => response.json())
    .then(data => console.log(data));
}