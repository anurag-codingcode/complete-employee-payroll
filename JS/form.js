$(document).ready(() => {

    dateSelect()
    
    $("form").submit(function (e) {
        e.preventDefault()
        formSubmit()
    });
})

function dateSelect(){
    var daySelect = $("#daySelect")
    for (let i = 1; i <= 31; i++) {
        daySelect.append($('<option>', {
            value: i,
            text: i,
            
        }))
    }
    var monthSelect = $('#monthSelect')
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    monthNames.forEach((month)=>{
        monthSelect.append($('<option>',{
            text:month,
            value:month.slice(0,3)
        }))
    })

    var yearSelect=$('#yearSelect')
    var currentYear=new Date().getFullYear()

    for (let i=currentYear;i>=currentYear-100;i--){
        yearSelect.append($('<option>',{
            value:i,
            text:i
        }))

    }
}

function formSubmit() {

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
    var day=$('form')[0].elements['daySelect'].value
    var month=$('form')[0].elements['monthSelect'].value
    var year=$('form')[0].elements['yearSelect'].value
    console.log(salary)
    var startDate=`${day} ${month} ${year}`


    var notes=$('form')[0].elements['notes'].value
    if(department.length==0){
        alert("select all options")
        return
    }
    const toSend=JSON.stringify({
            name,img,department,salary,startDate,notes,gender
        })
    
    
    $.ajax({
        url:"http://localhost:3000/employee",
        type:'POST',
        data:toSend,
        success:(data)=>{
            window.location.replace("index.html");
        }
    })
 

}