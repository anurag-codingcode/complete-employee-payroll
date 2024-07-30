$(document).ready(() => {
    if (localStorage.getItem('id')) {
        getFormElements(localStorage.getItem('id'))
    }

    dateSelect()

    $("form").submit(function (e) {
        e.preventDefault()
        formSubmit()
    });
})

function getFormElements(id) {

    var x = $.ajax({
        url: "http://localhost:3000/employee/" + id,
        type: 'GET',
        success: (data) => {
            console.log(data)

            $('#name')[0].value = data.name
            $(`input[class='form-check-input'][value='${data.img}']`).prop('checked', true)
            $(`input[class='form-check-input'][value='${data.gender}']`).prop('checked', true)
            const departments = data.department
            for (let i = 0; i < departments.length; i++) {
                $(`input[class='form-check-input'][value='${departments[i]}']`).prop('checked', true)
            }
            $(`option[value='${data.salary}']`).prop('selected', true)
            const [day, month, year] = data.startDate.split(" ")
            $(`option[value='${day}']`).prop('selected', true)
            $(`option[value='${month}']`).prop('selected', true)
            $(`option[value='${year}']`).prop('selected', true)
            $('textarea')[0].value = data.notes
        }

    })





}
function dateSelect() {
    var daySelect = $("#daySelect")
    for (let i = 1; i <= 31; i++) {
        daySelect.append($('<option>', {
            value: i,
            text: i,

        }))
    }
    var monthSelect = $('#monthSelect')
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    monthNames.forEach((month) => {
        monthSelect.append($('<option>', {
            text: month,
            value: month.slice(0, 3)
        }))
    })

    var yearSelect = $('#yearSelect')
    var currentYear = new Date().getFullYear()

    for (let i = currentYear; i >= currentYear - 100; i--) {
        yearSelect.append($('<option>', {
            value: i,
            text: i
        }))

    }
}

function formSubmit() {
    let url = "http://localhost:3000/employee"
    let method = 'POST'
    const id = localStorage.getItem('id')

    console.log(url)
    console.log(method)
    var name = $('form')[0].elements['name'].value
    var img = $('form')[0].elements['img'].value
    var gender = $('form')[0].elements['gender'].value
    var dep = $('form')[0].elements['department']
    var department = []
    dep.forEach((element) => {
        if (element.checked) {
            department.push(element.value)
        }

    })
    var salary = $('form')[0].elements['salary'].value
    var day = $('form')[0].elements['daySelect'].value
    var month = $('form')[0].elements['monthSelect'].value
    var year = $('form')[0].elements['yearSelect'].value
    var startDate = `${day} ${month} ${year}`
    var notes = $('form')[0].elements['notes'].value
    if (department.length == 0) {
        alert("select all options")
        return
    }
    let toSend = {
        name, img, department, salary, startDate, notes, gender
    }
    if (id) {
        url = "http://localhost:3000/employee/" + id
        method = 'PUT'
        console.log(url,method)
        toSend['id']=id
        console.log(toSend)
        localStorage.removeItem('id')
    }
    toSend=JSON.stringify(toSend)
    $.ajax({
        url: url,
        type: method,
        data: toSend,
        success: (data) => {
            window.location.replace("index.html");
        }
    })


}