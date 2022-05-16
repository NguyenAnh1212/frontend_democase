
showAllSupplier();
showListGender();
showListAddress();

function showAllSupplier() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/koibito/listSupplier",
        success: function (sup) {
            let content = "";
            for (let i = 0; i < sup.length; i++) {
                content += `<tr>
            </tr><th scope="row">${sup[i].name}</th>
            <td><img src="${'http://localhost:8080/image/' + sup[i].image}" width="100px"></td>
            <td>${sup[i].age}</td>
            </tr>`
            }
            $("#listSupplier").html(content);
        }
    })
}


function showListAge() {
    let content= "";
    for (let i = 18; i < 40 ; i++) {
        content += `<option value="${i}">${i}</option>`
    }
    $("#listAge1").html(content);
    $("#listAge2").html(content);
}
showListAge();

function showSupplierByAge() {
    let age1 = $('#listAge1').val();
    let age2 = $('#listAge2').val();
    let idG = $('#listGender').val();
    let idAd = $('#listAddress').val();

    $.ajax({
        type: "GET",
        url: `http://localhost:8080/koibito/supByMultiCondition?age1=${age1}&age2=${age2}&idG=${idG}&idAd=${idAd}`,
        success: function (sup){
            let content = "";
            for (let i = 0; i < sup.length; i++) {
                content += `<tr>
            </tr><th scope="row">${sup[i].name}</th>
            <td><img src="${'http://localhost:8080/image/' + sup[i].image}" width="100px"></td>
            <td>${sup[i].age}</td>
            </tr>`
            }
            $("#listSupplier").html(content);
        }
    })
    event.preventDefault();
}

function showListGender() {
    $.ajax({
        type: "GET",
        url: `http://localhost:8080/koibito/gender`,
        success: function (gender) {
            let content = "";
            for (let i = 0; i < gender.length; i++) {
                content += `<option value="${gender[i].id}">${gender[i].gender}</option>`
            }
            $(`#listGender`).html(content);
        }
    })
}


function showListAddress() {
    $.ajax({
        type: "GET",
        url: `http://localhost:8080/koibito/address`,
        success: function (address) {
            let content = "";
            for (let i = 0; i < address.length; i++) {
                content += `<option value="${address[i].id}">${address[i].address}</option>`
            }
            $("#listAddress").html(content);
        }
    })
}



