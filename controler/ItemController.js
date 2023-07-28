import { Item } from "../model/Item.js";

//create class itemController
export class ItemController {

    constructor() {
        $('#btn_AddItem').click((event) => {

        });
        $('#btn_UpdateItem').click((event) => {

        });
        $('#btn_DeleteItem').click((event) => {

        });
        this.getSelectedRow();
    }
    
    //chech validations
    inputValidation(){

    }

    // save item function
    saveItem(){
        const itmObj=JSON.stringify(new Item(
            $('#itemCode').val(),
            $('#itemName').val(),
            $('#itemCategory').val(),
            $('#itemBrand').val(),
            $('#itemQty').val(),
            $('#itemPrice').val()
        ));

        $.ajax({
            type: "POST",
            url: "http://localhost:8080/mypos/item",
            data: itmObj,
            dataType: "json",
            headers:{
                "Content-Type":"Application/json"
            },
            success: function (response) {
                if(response.status===200){
                    alert('Item data Sent')
                }else{
                    alert('Task Faild');
                }
            }
        });
    }
   

// Load Item data on table
    loadTableData() {
        $('table tbody tr td').remove();
        getAllItemData("ItemData").map((value) => {
            let row = "<tr>" +
                "<td>" + value._itemCode + "</td>" +
                "<td>" + value._itemName + "</td>" +
                "<td>" + value._itemCategory + "</td>" +
                "<td>" + value._itemBrand + "</td>" +
                "<td>" + value._itemPrice + "</td>" +
                "<td>" + value._itemQty + "</td>" +
                "</tr>";
            $('#item-tbody').append(row);
        });
    }

//get Selected table row event
    getSelectedRow() {
        $('#item-tbody').click('tr', (event) => {
            let itemCode = $(event.target).closest('tr').find('td').eq(0).text();
            let itemName = $(event.target).closest('tr').find('td').eq(1).text();
            let itemCategory = $(event.target).closest('tr').find('td').eq(2).text();
            let itemBrand = $(event.target).closest('tr').find('td').eq(3).text();
            let itemQty = $(event.target).closest('tr').find('td').eq(4).text();
            let itemPrice = $(event.target).closest('tr').find('td').eq(5).text();

            $('#itemCode').val(itemCode);
            $('#itemName').val(itemName);
            $('#itemCategory').val(itemCategory);
            $('#itemBrand').val(itemBrand);
            $('#itemQty').val(itemQty);
            $('#itemPrice').val(itemPrice);
        });
    }

// clear input fields 
    clearInputData() {
        $('#itemCode').val("");
        $('#itemName').val("");
        $('#itemCategory').val("");
        $('#itemBrand').val("");
        $('#itemQty').val("");
        $('#itemPrice').val("");
    }
}

new ItemController();




