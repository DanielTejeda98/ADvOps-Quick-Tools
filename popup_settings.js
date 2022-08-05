//Globals
var SETTINGS_OPENED = false

//Settings button
$("#btnSettings").click(() => {
  if(SETTINGS_OPENED)
  {
    SETTINGS_OPENED = false
    $("#settings").hide()
    loadForm()
  }
  else
  {
    SETTINGS_OPENED = true
    $("#form").hide()
    $("#settings").show()
  }
})

//Discard button
$("#btnDiscard").click(() =>
{
  $('#settings').hide()
  $('#form').show()
})

//Dropdown Edit list selector
$('#editListSelector').change(() =>
{
  const selected = $("select option:selected").val()
  $("#editArea").children().addClass('hidden')
  $(`#edit${selected}Div`).removeClass('hidden')
})

$("#btnSave").click(() =>
{
  //Split the values based on the new lines (make helper function)
  const testerDataRaw = $("#editTesters").val()
  const testerDataArray = testerDataRaw.split(/\r?\n/).filter(data => data)
  testerDataArray.forEach((data, index) =>
    {
      testerDataArray[index] = data.trim()
    })
  
  chrome.storage.local.set({'testerData': JSON.stringify(testerDataArray)})

  const deviceDataRaw = $("#editDevices").val()
  const deviceDataArray = deviceDataRaw.split(/\r?\n/).filter(data => data)
  deviceDataArray.forEach((data, index) =>
  {
    deviceDataArray[index] = data.trim()
  })
  
  chrome.storage.local.set({'deviceData': JSON.stringify(deviceDataArray)})
  alerts.push("Saved successfully!")
  createAlert('success')
  setEditableValues()
})

const setEditableValues = () =>
{
  console.log("setEditableValues called ")
  chrome.storage.local.get(['testerData'], (result) =>
  {
    console.log("Results: ", result.testerData)
    let valueString = ''
    if(result)
    {
      const res = JSON.parse(result.testerData)
      res.forEach(line => {
        valueString += line + '\n'
      })
    }
    $("#editTesters").val(valueString) 
  })

  chrome.storage.local.get(['deviceData'], (result) =>
  {
    console.log("Results: ", result.deviceData)
    let valueString = ''
    if(result.deviceData)
    {
      const res = JSON.parse(result.deviceData)
      res.forEach(line => {
        valueString += line + '\n'
      })
    }
    $("#editDevices").val(valueString) 
  })
}

//Set editable values on load
setEditableValues()