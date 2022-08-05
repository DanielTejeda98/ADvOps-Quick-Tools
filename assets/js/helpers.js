const cleanOutput = (data) =>
{
  return data.replace('<', '&lt').replace('>', '&gt')
}

const loadTesterOptions = () =>
{
  chrome.storage.local.get(['testerData'], (result) =>
  {
    htmlString = `<legend class="form-check-label">Select Testers</legend>`
    if(result.testerData)
    {
      const res = JSON.parse(result.testerData)
      res.forEach(line => {
        htmlString += `<input type="checkbox" class="form-check-input" name="testing_tester" value="${cleanOutput(line)}"><span> ${cleanOutput(line)}</span><br>`
      })
    }
    $("#optionsCheckboxes").html(htmlString)
  })
}

const loadDeviceOptions = () =>
{
  chrome.storage.local.get(['deviceData'], (result) =>
  {
    htmlString = `<legend class="form-check-label">Select Testing Devices</legend>`
    if(result.deviceData)
    {
      const res = JSON.parse(result.deviceData)
      res.forEach(line => {
        htmlString += `<input type="checkbox" class="form-check-input" name="testing_devices" value="${cleanOutput(line)}"><span> ${cleanOutput(line)}</span><br>`
      })
    }
    $("#optionsCheckboxes").html(htmlString)
  })
}

const loadForm = () =>
{
  $("#form").show(0, () =>
  {
    //Load default state
    $('#bulkTypeTaskSelectorTesters').prop("checked", true)
    loadTesterOptions()
  })
}
