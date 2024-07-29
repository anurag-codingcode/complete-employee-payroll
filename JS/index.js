$(document).ready(() => {
    var tbody = $(tbody)

    $.ajax({
        url: "http://localhost:3000/employee",
        type: "GET",
        success: (data) => {

            var tbody = $('tbody')[0]

            for (let i = 0; i < data.length; i++) {
                var { id,img, name, gender, department, salary, startDate } = data[i]

                var trow = $('<tr></tr>');
                var td1 = $(`<td><img src='${img}' alt=""></td>`);
                var td2 = $("<td></td>").text(name);
                var td3 = $("<td></td>").text(gender);
                var td4 = $(`<td>${department.map(element => `<span class="crl">${element}</span>`).join(' ')}</td>`);

                var td5 = $(`<td>₹${salary}</td>`)
                var td6 = $('<td></td>').text(startDate)
                var td7 = $(`<td class="icons"><span><img class="delIcon" id="${id}" src="Assets/delete-black-18dp.svg" height="28px" width="28px" alt=""></span><span><img class="creIcon" src="Assets/create-black-18dp.svg" style="margin-left: 50px;" height="28px" width="28px" alt=""></span></td>`)
                trow.append(td1, td2, td3, td4, td5, td6, td7)

                tbody.append(trow[0])
            }

        }
    }
    )
    $('tbody').on('click', '.delIcon', function() {
        delEmployee(this.id);
    });

    
    
}
)

function delEmployee(id){
    $.ajax({
        url:"http://localhost:3000/employee/"+id,
        type:"DELETE",
        success:()=>{
            alert("deleted successfully")
        }
    })
    

}