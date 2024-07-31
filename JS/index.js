
$(document).ready(() => {
    var tbody = $(tbody)
    const deleted=localStorage.getItem('deleted')

    console.log("dleted value",deleted)


    getUser('')
 

    $('#search-icon').on('click', () => {
        click = true
        $('#search').css('width', '400px');
        var inp = $('<input>', {
            type: 'text',
            id: 'input-search',
            style: 'border:none',
            onkeyup:'someFunction(event)'

        });
        $('#search').html(inp)
        

    });

    $('#search').on('input', () => {
        const filterData = $('#input-search')[0].value
        getUser(filterData)
    })
    if(deleted && deleted=='true'){
        showDeletePopUp()
        localStorage.setItem('deleted',false)
    }



}
);
function someFunction(e) {
    if (e.key == 'Enter') {
       
        var symbol = '<img class="p-2" id="search-icon" src="Assets/search.png" height="50px" width="50px" alt=""></img>';
        
        $('#search').html(symbol); // Use html() instead of innerText
        $('#search').css('width', '77px');
    }
}



function showDeletePopUp() {
    var x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
}

function getUser(filterData) {
    console.log("table updated")
    $.ajax({
        url: "http://localhost:3000/employee",
        type: "GET",
        success: (data) => {
            console.log(data)
            if (filterData!=NaN && filterData != '') {
                data = filterItems(data,filterData)
            }
            var tbody = $('tbody')[0]
            tbody.innerHTML = ''
           
            for (let i = 0; i < data.length; i++) {
                var { id, img, name, gender, department, salary, startDate } = data[i]

                var trow = $(`<tr id="${id}"></tr>`);
                var td1 = $(`<td><img src='${img}' alt=""></td>`);
                var td2 = $("<td></td>").text(name);
                var td3 = $("<td class='gender-hide'></td>").text(gender);
                var td4 = $(`<td>${department.map(element => `<span class="crl">${element}</span>`).join(' ')}</td>`);

                var td5 = $(`<td class="salary-hide">₹${salary}</td>`)
                var td6 = $('<td  class="startDate-hide"></td>').text(startDate)
                var td7 = $(`<td class="icons"><span onclick="delEmployee('${id}')" ><img class="delIcon" src="Assets/delete-black-18dp.svg" height="28px" width="28px" alt=""></span><span onclick="ediEmployee('${id}')" ><img class="creIcon" src="Assets/create-black-18dp.svg" style="margin-left: 50px;" height="28px" width="28px" alt=""></span></td>`)
                trow.append(td1, td2, td3, td4, td5, td6, td7)

                tbody.append(trow[0])
            }
            

        }
    }
    )
}

function filterItems(data,filterData) {
    console.log("filtered")
    data = data.filter((item) => {
        return item.gender.toLowerCase()[0] === filterData.toLowerCase()[0] || item.name.toLowerCase().includes(filterData.toLowerCase());
    })
    return data

}


function delEmployee(id) {
    $.ajax({
        url: "http://localhost:3000/employee/" + id,
        type: "DELETE",
        success: () => {
            localStorage.setItem('deleted',true)
        }
    })


}
function ediEmployee(id){
    console.log(id)
    window.location.replace('form.html')
    localStorage.setItem("id",id)
}