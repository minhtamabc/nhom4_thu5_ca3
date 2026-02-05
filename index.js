const tableStudents = document.querySelector('#tableStudents')
let urlAvatar = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQr0R0KswnhNi-1bsU96g79bF4IafZtcrAVzg&s"
let urlApi = "https://698300279c3efeb892a408bf.mockapi.io/crud-student/students/"
let idStudents = -1
let elementForUpdate = null
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

    let btnDelete = document.createElement('button')
    btnDelete.classList.add('btn','bg-danger')
    btnDelete.innerText = 'Delete'

    let btnUpdate = document.createElement('button')
    btnUpdate.classList.add('btn', 'bg-warning')
    btnUpdate.innerText = 'Edit'

    btnDelete.value = data.id
    btnUpdate.value = data.id

    btnDelete.onclick = (e) => {
        fetch(`https://698300279c3efeb892a408bf.mockapi.io/crud-student/students/${data.id}`,{
            method:"DELETE"
        })
        .then(res => res.json())
        .then(student => {
            if(student.id == data.id){
                row.remove()
            }
        })
    }

    btnUpdate.onclick = (e) => {
        idStudents = data.id
        text.value = data.name
        elementForUpdate = arrCell[0]
        text.focus()
    }

    td1.appendChild(btnDelete)
    td1.appendChild(btnUpdate)
    row.appendChild(td1)
    return row
}

function students(){
    fetch("https://698300279c3efeb892a408bf.mockapi.io/crud-student/students")
    .then(res => res.json())
    .then(data => {
        for(let i of data)
            tableStudents.appendChild(createRow(i))
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
                if(student.name == name){
                    tableStudents.appendChild(createRow(student))
                    text.value = ""
                    alert("Thêm thành công !")
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
                    elementForUpdate.innerText = student.name
                    alert("Cập nhật thành công !")
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