$(document).ready(() => {

    // $.get('http://localhost:3000/employee',(data,status)=>{
    //     console.log(status)
    //     console.log(data)
    // })

    $.ajax({
        url:"http://localhost:3000/employee",
        type:"GET",
        success:(data)=>{
            console.log(data)
            

        }
    })
}
)