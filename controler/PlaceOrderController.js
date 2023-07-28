import { PlaceOrder } from "../model/PlaceOrder.js";

export class PlaceOrderController {

    constructor() {
        $('#btn_addToCart').click((event) => {

        });
        $('#btn_updateCart').click((event) => {
        });
        $('#btn-Refresh').click((event) => {
        });
        $('#btn-Clear').click((event) => {
        });
        $('#btn-PlaceOrder').click((event) => {
        });
    }

    //chech validations
    inputValidation(){

    }

    saveOrder(){
        const ordObj=JSON.stringify(new PlaceOrder(
            $('#order_Id').val(),
            $('#item_Code').val(),
            $('#item_Name').val(),
            $('#item_Price').val(),
            $('#item_Qty').val(),
            this.getAmount()
        ));

        $.ajax({
            type: "POST",
            url: "http://localhost:8080/mypos/placeorder",
            data: ordObj,
            dataType: "json",
            headers:{
                "Content-Type":"Application/json"
            },
            success: function (response) {
                if(response.status===200){
                    alert('PlaceOrder data Sent')
                }else{
                    alert('Task Failed');
                }
            }
        });
    }
    
    //get Amount calculation
    getAmount() {
        let itemPrice = $('#item_Price').val();
        let itemQty = $('#item_Qty').val();
        const netAmount = itemPrice * itemQty;
        return netAmount;
    }

    //get Net Amount
    netAmount() {
        let value = getPlaceOrderDetails("PlaceOrderDetails");
        let result = "";
        let passint = 0;
        value.forEach(element => {
            result += element._amount;
        });
        passint = parseInt(result);
        console.log(passint);

    }


    // load table data
    loadTableData() {
        $('table tbody tr td').remove();
        getPlaceOrderDetails("PlaceOrderDetails").map((value) => {
            let row = "<tr>" +
                "<td>" + value._orderId + "</td>" +
                "<td>" + value._itemCode + "</td>" +
                "<td>" + value._itemName + "</td>" +
                "<td>" + value._itemPrice + "</td>" +
                "<td>" + value._itemQty + "</td>" +
                "<td>" + value._amount + "</td>" +
                "</tr>";
            $('#order_tbody').append(row);
        });
    }

    // getting selected row
    getSelectedTableRow() {

        $('#order_tbody').click('tr', (event) => {

            let orderID = $(event.target).closest('tr').find('td').eq(0).text();
            let itemCode = $(event.target).closest('tr').find('td').eq(1).text();
            let itemName = $(event.target).closest('tr').find('td').eq(2).text();
            let itemPrice = $(event.target).closest('tr').find('td').eq(3).text();
            let itemQty = $(event.target).closest('tr').find('td').eq(4).text();

            $('#order_Id').val(orderID);
            $('#item_Code').val(itemCode);
            $('#item_Name').val(itemName);
            $('#item_Price').val(itemPrice);
            $('#item_Qty').val(itemQty);

        });

    }

    // clear input fields
    clearInputFields() {
        $('#item_Code').val("");
        $('#item_Name').val("");
        $('#item_Price').val("");
        $('#item_Qty').val("");
    }
}

new PlaceOrderController();





