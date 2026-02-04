const tableStudents = document.querySelector('#tableStudents')
let urlAvatar = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQr0R0KswnhNi-1bsU96g79bF4IafZtcrAVzg&s"
let urlApi = "https://698300279c3efeb892a408bf.mockapi.io/crud-student/students/"
let idStudents = -1
function updateItem(){
    
}

function createRow(data){
    let row = document.createElement('tr')
    let arrCell = []
    for(let key in data){
        let cell = document.createElement('td')
        if(key != "avatar")
            cell.innerText = data[key]
        else 
            cell.innerHTML = `<img src="${data[key]}" class="img" />`
        arrCell.push(cell)
    }
    row.appendChild(arrCell[2])
    row.appendChild(arrCell[1])
    row.appendChild(arrCell[0])

    let td1 = document.createElement('td')
    td1.innerHTML = `<span class="btn bg-danger" value=${data.id}>Delete</span>`
    td1.innerHTML += `<span class="btn bg-warning" value=${data.id}>Edit</span>`
    row.appendChild(td1)
    return row
}
function students(){
    fetch("https://698300279c3efeb892a408bf.mockapi.io/crud-student/students")
    .then(res => res.json())
    .then(data => {
        for(let i of data)
            tableStudents.appendChild(createRow(i))
                
        let btnDelete = document.querySelectorAll('.bg-danger')
        let btnUpdate = document.querySelectorAll('.bg-warning')

        btnDelete.forEach(item => {
            let id = item.getAttribute('value')
            item.onclick = (e) => {
                const row = e.target.closest('tr')
                fetch(`https://698300279c3efeb892a408bf.mockapi.io/crud-student/students/${id}`,{
                    method:"DELETE"
                })
                .then(res => res.json())
                .then(student => {
                    if(student.id == id){
                        row.remove()
                    }
                })
            }
        })

        btnUpdate.forEach(item => {
            item.onclick = () => {
                idStudents = Number(item.getAttribute('value'))
                for(let i of data){
                    if(i.id == idStudents)
                        text.value = i.name
                }
                text.focus()
            }
        })
        
    })
    .catch(err => {
        console.log(err)
    })
}
students()
const headerTable = "<tr><th>ID</th><th>Avatar</th><th>Full Name</th><th>Action</th></tr>"
let text = document.querySelector('#username')
let btnSave = document.querySelector('#btnSave')
btnSave.onclick = (e) => {
    let name = text.value
    if(name != ""){
        if(idStudents == -1){
            fetch('https://698300279c3efeb892a408bf.mockapi.io/crud-student/students/',{
                method:"POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({
                    name:name,
                    avatar:urlAvatar
                })
            })
            .then(res => res.json())
            .then(student => {
                console.log(student)
                if(student.name == name){
                    tableStudents.appendChild(createRow(student))
                    text.value = ""
                }
                else{
                    fetch(`https://698300279c3efeb892a408bf.mockapi.io/crud-student/students/${student.id}`,{
                        method:"DELETE"
                    })
                }
            })
        }
        else{
            fetch(`https://698300279c3efeb892a408bf.mockapi.io/crud-student/students/${idStudents}`,{
                method:"PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({
                    name:name,
                })
            })
            .then(res => res.json())
            .then(student => {
                if(student.name == name){
                    text.value = ""
                    idStudents = -1
                    tableStudents.innerHTML = ""
                    tableStudents.innerHTML = headerTable
                    students()
                }
                else{
                    alert("Cập nhật thất bại !")
                }
            })
        }
    }
    else
        alert("Vui lòng nhập tên !")
}