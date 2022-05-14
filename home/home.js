let data = localStorage.getItem("data");
let obj = JSON.parse(data);
let idSp = obj.id; // supplier_id
function showListServiceBySup_id() {

        $.ajax({
            type: "GET",
            url: `http://localhost:8080/koibito/findPriceBySupplierId/${idSp}`,
            success: function (data) {
                let content = "";
                for (let i = 0; i < data.length; i++) {
                    content += `<tr>
            <td>${data[i].id}</td>    
            <td>${data[i].name}</td>            
            <td>${data[i].price}</td>   
            <td><button type="button" onclick="showEditForm(${data[i].id})" data-bs-toggle="modal" data-bs-target="#myModal1">Update</button></td>           
            <td><button onclick="deletePrice(${data[i].id})">Delete</button></td> 
                      
        </tr>`
                }
                $("#listService").html(content);
            }
        })

}
showListServiceBySup_id();

function deletePrice(id) { // id của price
    $.ajax({
        type: "DELETE",
        url:`http://localhost:8080/price/${id}`,
        success:
        showListServiceBySup_id
    })
    event.preventDefault();
}


function showEditForm(id){ // id của price
    let content = `<div class="container">
                    <form>
                        <div class="mb-3">
                            <label for="service1" class="form-label"  >Service</label>
                            <input type="text" class="form-control" id="service1" readonly>
                        </div>
                        <div class="mb-3">
                            <label for="price1" class="form-label">Price</label>
                            <input type="text" class="form-control" id="price1">
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" onclick="editPrice(${id})" data-bs-dismiss="modal">Edit</button>

                        </div>
                    </form>
                </div>`
    $("#showModalEdit").html(content);
    $.ajax({
        type: "GET",
        url:`http://localhost:8080/price/${id}`,
        success: function (priceName) {
            $(`#service1`).val(priceName.appService.name)
            $(`#price1`).val(priceName.price)
        }
    })
}

function editPrice(id){

    let price = $(`#price1`).val();

    let newPrice = {
        "price": price
    };
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "PUT",
        data: JSON.stringify(newPrice),
        url: `http://localhost:8080/price/${id}`,
        success: showListServiceBySup_id
    })

}



















