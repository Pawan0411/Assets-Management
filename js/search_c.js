
const firebaseConfig = {
    apiKey: "AIzaSyDMXaX8AR8MKDoZohHewzphFERUEubVm0Y",
    authDomain: "assests-managment.firebaseapp.com",
    databaseURL: "https://assests-managment.firebaseio.com",
    projectId: "assests-managment",
    storageBucket: "assests-managment.appspot.com",
    messagingSenderId: "429074630365",
    appId: "1:429074630365:web:62f74225288877aa"
};

firebase.initializeApp(firebaseConfig);
var messagesRef = firebase.database().ref('Capax');
var events = [];
var i = 0;
var pushkey;
$('#capaxdetails').submit(function (e) {
    $(this),
        e.preventDefault();

    messagesRef.once("value").then(function (snapshot) {

        var a = snapshot.child(document.getElementById('exampleserailNumber_c').value).exists();
        if (!a) {
            window.alert("No Data");
            $('#capax')[0].reset();
            document.getElementById("examplepoDate").readOnly = false;
            document.getElementById('examplepoDate').value = "";
            document.getElementById("examplepoDate").readOnly = true;
            document.getElementById("exampleInvoiceDate").readOnly = false;
            document.getElementById('exampleInvoiceDate').value = "";
            document.getElementById("exampleInvoiceDate").readOnly = true;
            document.getElementById("exampleRecieveDate").readOnly = false;
            document.getElementById('exampleRecieveDate').value = "";
            document.getElementById("exampleRecieveDate").readOnly = true;
            document.getElementById('delete').style.visibility = "hidden";
            document.getElementById('edit').style.visibility = "hidden";
            document.getElementById('history').style.visibility = "hidden";
            document.getElementById('exampleserailNumber_c').value = "";
        } else {
            window.alert("Retrived  Succesfully");
            messagesRef.child(document.getElementById('exampleserailNumber_c').value)
            .on("child_added", function (data) {
                console.log(JSON.stringify(data.val()));
                // window.open("/check/" + JSON.stringify(data.val()));
                var event = data.val();
                events.push({
                    serialNumber: event.serialNumber,
                    sapcode: event.sapcode,
                    materialcode: event.materialcode,
                    materialquantity: event.materialquantity,
                    ponumber: event.ponumber,
                    podate: event.podate,
                    invoiceDate: event.invoiceDate,
                    invoiceNumber: event.invoiceNumber,
                    receiveDate: event.receiveDate,
                    model: event.model,
                    modelDescp: event.modelDescp,
                    summit: event.summit
                });
                // console.log(events[i]);
                document.getElementById('exampleserailNumber').value = data.val().serialNumber;
                document.getElementById('exampleSapCode').value = data.val().sapcode;
                document.getElementById('exampleMaterialCode').value = data.val().materialcode;
                document.getElementById('exampleMaterialQuantity').value = data.val().materialquantity;
                document.getElementById('examplepoNumber').value = data.val().ponumber;
                document.getElementById('examplepoDate').value = data.val().podate;
                document.getElementById('exampleInvoiceDate').value = data.val().invoiceDate;
                document.getElementById('exampleRecieveDate').value = data.val().receiveDate;
                document.getElementById('exampleModel').value = data.val().model;
                document.getElementById('exampleModelDescp').value = data.val().modelDescp;
                document.getElementById('exampleInvoiceNumber').value = data.val().invoiceNumber;
                document.getElementById('exampleUpdateSummit').value = data.val().summit;
                // $('.success-message').show();
                document.getElementById('delete').style.visibility = "visible";
                document.getElementById('edit').style.visibility = "visible";
                document.getElementById('history').style.visibility = "visible";

            });
        }
    });

});
document.getElementById('edit').onclick = function () {

    document.getElementById('exampleserailNumber_c').readOnly = true;
    document.getElementById('btn_cap').disabled = true;
    document.getElementById('exampleserailNumber').readOnly = false;
    document.getElementById('exampleSapCode').readOnly = false;
    document.getElementById('exampleMaterialCode').readOnly = false;
    document.getElementById('exampleMaterialQuantity').readOnly = false;
    document.getElementById('examplepoDate').readOnly = false;
    document.getElementById('examplepoNumber').readOnly = false;
    document.getElementById('exampleInvoiceDate').readOnly = false;
    document.getElementById('exampleRecieveDate').readOnly = false;
    document.getElementById('exampleModel').readOnly = false;
    document.getElementById('exampleModelDescp').readOnly = false;
    document.getElementById('exampleInvoiceNumber').readOnly = false;
    document.getElementById('exampleUpdateSummit').disabled = false;

    document.getElementById('delete').style.visibility = "hidden";
    document.getElementById('edit').style.visibility = "hidden";
    document.getElementById('history').style.visibility = "hidden";
    document.getElementById('update').style.visibility = "visible";

};
$('#capax').submit(function (e) {
    $(this);
    e.preventDefault();

    $('#capax :input').change(function () {
        $('#capax').data('changed', true);
    });
    if ($('#capax').data('changed')) {
        console.log("changed");
        var messagesRef1 = firebase.database().ref('Capax');
        var messagesRef2 = firebase.database().ref('Capax Details');
        var newMessageRef = messagesRef1.child(document.getElementById('exampleserailNumber').value).push();
        pushkey = newMessageRef.key;
        newMessageRef.set({
            pushID: pushkey,
            serialNumber: $('.snumber').val(),
            sapcode: $('.sapcode').val(),
            materialcode: $('.materialcode').val(),
            materialquantity: $('.materialquantity').val(),
            ponumber: $('.ponumber').val(),
            podate: $('.podate').val(),
            invoiceDate: $('.invoicedate').val(),
            invoiceNumber: $('.invoicenumber').val(),
            receiveDate: $('.receivedate').val(),
            model: $('.model').val(),
            modelDescp: $('.modeldescp').val(),
            summit: $('.summit').val()
        });
        var newMessageRef = messagesRef2.child(pushkey);
        newMessageRef.set({
            a_serialNumber: $('.snumber').val(),
            sapcode: $('.sapcode').val(),
            materialcode: $('.materialcode').val(),
            materialquantity: $('.materialquantity').val(),
            ponumber: $('.ponumber').val(),
            podate: $('.podate').val(),
            invoiceDate: $('.invoicedate').val(),
            invoiceNumber: $('.invoicenumber').val(),
            receiveDate: $('.receivedate').val(),
            model: $('.model').val(),
            modelDescp: $('.modeldescp').val(),
            summit: $('.summit').val(),
        });
        window.alert("Submitted Successfully");
        window.location.reload();

    } else {
        console.log("not changed");
        window.alert("No data changed");
    }
});

document.getElementById('delete').onclick = function () {
    var messagesRef = firebase.database().ref('Capax');
    var messagesRef2 = firebase.database().ref('Capax Details');
    var cap, capd;
    if (confirm("Are you sure want to delete ?")) {
        messagesRef.child(document.getElementById('exampleserailNumber').value)
            .on("child_added", function (data) {
                pushkey = data.val().pushID;
            });
        console.log(pushkey);
        messagesRef2.child(pushkey).remove();
        messagesRef.child(document.getElementById('exampleserailNumber').value).child(pushkey).remove();
        messagesRef.once("child_added").then(function (snapshot) {
            cap = snapshot.child(document.getElementById('exampleserailNumber').value).child(pushkey).exists();
        });
        messagesRef2.once('value').then(function (snap) {
            capd = snap.child(pushkey).exists();
        });
        if (cap == true && capd == true) {
            console.log("Not removed");
        } else {
            console.log('Removed');
            window.alert("Deleted Successfully.");
            window, location.reload();
        }
    }
}
var current_page = 1;
document.getElementById('history').onclick = function () {
    // document.getElementById('btn_prev').style.visibility = "visible";
    document.getElementById('btn_next').style.visibility = "visible";
    document.getElementById('page').style.visibility = "visible";
    document.getElementById('show').style.visibility = "visible";
    var page_span = document.getElementById("page");
    page_span.innerHTML = 1;
    document.getElementById('delete').style.visibility = "hidden";
    document.getElementById('edit').style.visibility = "hidden";
    document.getElementById('history').style.visibility = "hidden";
    document.getElementById('btn_prev').onclick = function prevPage() {
        if (current_page > 1) {
            current_page--;
            changePage(current_page);
        }

        console.log(events[i]);
        document.getElementById('exampleserailNumber').value = events[i].serialNumber;
        document.getElementById('exampleSapCode').value = events[i].sapcode;
        document.getElementById('exampleMaterialCode').value = events[i].materialcode;
        document.getElementById('exampleMaterialQuantity').value = events[i].materialquantity;
        document.getElementById('examplepoNumber').value = events[i].ponumber;
        document.getElementById('examplepoDate').value = events[i].podate;
        document.getElementById('exampleInvoiceDate').value = events[i].invoiceDate;
        document.getElementById('exampleInvoiceNumber').value = events[i].invoiceNumber;
        document.getElementById('exampleRecieveDate').value = events[i].receiveDate;
        document.getElementById('exampleModel').value = events[i].model;
        document.getElementById('exampleModelDescp').value = events[i].modelDescp;
        document.getElementById('exampleUpdateSummit').value = events[i].summit;
        // $('.success-message').show();
        --i;

    }

    document.getElementById('btn_next').onclick = function nextPage() {
        document.getElementById('btn_prev').style.visibility = "visible";
        if (current_page < events.length) {
            current_page++;
            changePage(current_page);
        }

        console.log(events[i]);
        document.getElementById('exampleserailNumber').value = events[i].serialNumber;
        document.getElementById('exampleSapCode').value = events[i].sapcode;
        document.getElementById('exampleMaterialCode').value = events[i].materialcode;
        document.getElementById('exampleMaterialQuantity').value = events[i].materialquantity;
        document.getElementById('examplepoNumber').value = events[i].ponumber;
        document.getElementById('examplepoDate').value = events[i].podate;
        document.getElementById('exampleInvoiceDate').value = events[i].invoiceDate;
        document.getElementById('exampleInvoiceNumber').value = events[i].invoiceNumber;
        document.getElementById('exampleRecieveDate').value = events[i].receiveDate;
        document.getElementById('exampleModel').value = events[i].model;
        document.getElementById('exampleModelDescp').value = events[i].modelDescp;
        document.getElementById('exampleUpdateSummit').value = events[i].summit;
        // $('.success-message').show();
        ++i;

    }

    function changePage(page) {


        // Validate page
        if (page < 1) page = 1;
        if (page > events.length) page = events.length;

        page_span.innerHTML = page;


        if (page == 1) {
            document.getElementById('btn_prev').style.visibility = "hidden";
        } else {
            document.getElementById('btn_prev').style.visibility = "visible";
        }

        if (page == events.length) {
            document.getElementById('btn_next').style.visibility = "hidden";
        } else {
            document.getElementById('btn_next').style.visibility = "visible";
        }
    }
    window.onload = function () {
        changePage(1);
    };

}
