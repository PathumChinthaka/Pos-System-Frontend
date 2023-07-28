import { Customer } from "../model/Customer.js";

export class CustomerController{

    constructor(){
        $('#btn-add').on('click',()=>{
            if(this.inputValidation()){
                this.saveCustomerData();
            }
        });
    }

    //chech validations
    inputValidation(){
      
        !/^(C)([0-9]{2,})$/.test($("#customer_id").val())
          ? alert("Invalid ID")
          : !$("#customer_first_name").val()
          ? alert("Invalid name")
          : !$("#customer_last_name").val()
          ? alert("Invalid Last Name")
          : !$("#customer_address").val()
          ? alert("Invalid address")
          : !$("#customer_nic").val()
          ? alert("Invalid Nic Number")
          : !$("#customer_email").val()
          ? alert("Invalid e-mail")
          : !/^(075|077|071|074|078|076|070|072)([0-9]{7})$/.test($("#customer_contact").val())
          ? alert("Invalid Contact Number")
          : null
        }
    

    saveCustomerData(){

        const cusObj=JSON.stringify(new Customer(
            $('#customer_id').val(),
            $('#customer_name').val(),
            $('#customer_address').val(),
            $('#customer_nic').val(),
            $('#customer_email').val(),
            $('#customer_contact').val()
        ));

        $.ajax({
            type: "POST",
            url: "http://localhost:8080/mypos/customer",
            data: cusObj,
            dataType: "json",
            headers:{
                "Content-Type":"Application/json"
            },
            success: function (response) {
                if(response.status===200){
                    alert('Customer data Sent')
                }else{
                    alert('TaskFail');
                }
            }
        });
    }

    updateCustomer(){
        const cusObj=JSON.stringify(new Customer(
            $('#customer_id').val(),
            $('#customer_name').val(),
            $('#customer_address').val(),
            $('#customer_nic').val(),
            $('#customer_email').val(),
            $('#customer_contact').val()
        ));

        $.ajax({
            type: "PUT",
            url: "http://localhost:8080/mypos/Updatecustomer",
            data: cusObj,
            dataType: "json",
            headers:{
                "Content-Type":"Application/json"
            },
            success: function (response) {
                if(response.status===200){
                    alert('Customer Updated Data sent')
                }else{
                    alert('Task Failed');
                }
            }
        });
    }

}

new CustomerController();