$(document).ready(function () {
  $.support.cors = true;
  ImportFile();
});

window.workbook;
window.jsonData;
function ImportFile() {
  var excelUrl = "./tg_db_details.xlsx";

  var oReq = new XMLHttpRequest();
  oReq.open("get", excelUrl, true);
  oReq.responseType = "blob";
  oReq.onload = function () {
    excelFileToJSON(oReq.response);
  };
  oReq.send(null);
}

//Method to read excel file and convert it into JSON
function excelFileToJSON(file) {
  $("#dropdowns").prop("hidden", false);
  try {
    var reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = function (e) {
      var data = e.target.result;
      window.workbook = XLSX.read(data, {
        type: "binary",
      });
      displayJsonToHtmlTable(workbook);
    };
  } catch (e) {
    console.error(e);
  }
}

function displayJsonToHtmlTable(workbook) {
  var SheetNames = workbook.SheetNames;
  for (let sheetname in SheetNames) {
    $("#sheetname").append(
      `<option value=
          ${SheetNames[sheetname]}
            > 
            ${SheetNames[sheetname]}
            </option>`
    );
  }
}

function dropdownTrigger(selectedObject) {
  $("#client").html(`<option selected>Select the client</option>`);
  $("#ClientID").val("");
  $("#ActiveDsnId").val("");
  $("#Active_DB_server").val("");
  $("#Active_DB_name").val("");
  $("#LoginDsnId").val("");
  $("#Login_DB_server").val("");
  $("#Login_DB_name").val("");
  $("#PassiveDsnId").val("");
  $("#Status").val("");
  window.jsonData = XLSX.utils.sheet_to_json(
    window.workbook.Sheets[selectedObject.value]
  );
  console.log(window.jsonData);
  append(window.jsonData);
}

function append(jsonData) {
  for (let data in jsonData) {
    $("#client").append(
      `<option value= 
              ${data}
              > 
              ${jsonData[data].ClientName}
              </option>`
    );
  }
}

function appendData(selected) {
  // console.log(window.jsonData[selected.value])
  $("#ClientID").val(window.jsonData[selected.value].ClientID);
  $("#ActiveDsnId").val(window.jsonData[selected.value].ActiveDsnId);
  $("#Active_DB_server").val(window.jsonData[selected.value].Active_DB_server);
  $("#Active_DB_name").val(window.jsonData[selected.value].Active_DB_name);
  $("#LoginDsnId").val(window.jsonData[selected.value].LoginDsnId);
  $("#Login_DB_server").val(window.jsonData[selected.value].Login_DB_server);
  $("#Login_DB_name").val(window.jsonData[selected.value].Login_DB_name);
  $("#PassiveDsnId").val(window.jsonData[selected.value].PassiveDsnId);
  $("#Status").val(window.jsonData[selected.value].Status);
}

function copyActive() {
  navigator.clipboard.writeText($("#Active_DB_server").val());
  $("#activecopy")
    .html(`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="green" class="bi bi-check-square" viewBox="0 0 16 16">
  <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
  <path d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.235.235 0 0 1 .02-.022z"/>
</svg>`);
  setTimeout(() => {
    $("#activecopy")
      .html(` <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clipboard" viewBox="0 0 16 16">
                  <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
                  <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
                </svg>`);
  }, 2000);
}
function copyLogin() {
  navigator.clipboard.writeText($("#Login_DB_server").val());
  $("#logincopy")
    .html(`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="green" class="bi bi-check-square" viewBox="0 0 16 16">
  <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
  <path d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.235.235 0 0 1 .02-.022z"/>
</svg>`);
  setTimeout(() => {
    $("#logincopy")
      .html(` <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clipboard" viewBox="0 0 16 16">
                  <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
                  <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
                </svg>`);
  }, 2000);
}
