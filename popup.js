var bulkType = 'testing_tester'

document.querySelector("#submit").addEventListener("click", () =>
{
  
  const workItemElement = document.querySelector("#workItemCode")
  const workItemId = workItemElement.value.trim()
  const prefix = document.querySelector("#prefix").value.trim()
  const taskTitle = document.querySelector("#taskTitle").value.trim()
  const checkboxes = document.getElementsByName(bulkType)
  const workItemsToAdd = []
  if((/^[0-9]*$/.test(workItemId)))
  {
    checkboxes.forEach(checkbox =>
      {
        if(checkbox.checked)
        {
          workItemsToAdd.push({title: `${prefix} - ${checkbox.value} - ${taskTitle}`})
          // chromeMessage(workItemId, prefix, checkbox.value , taskTitle)
        }
      })
      if(workItemsToAdd.length > 0)
      {
        chromeMessage(workItemId, workItemsToAdd)
      }
  }
  workItemElement.value = ""
  window.close()
})

document.querySelector("#selectAll").addEventListener("click", () =>
{
  const checkboxes = document.getElementsByName(bulkType)
  checkboxes.forEach(checkbox => 
    {
      checkbox.checked = true
    })
})

const chromeMessage = (workItemId, workItemsToAdd) =>
{
  chrome.tabs.query({currentWindow: true, active: true}, (tabs) => {
    var activeTab = tabs[0]
    chrome.tabs.sendMessage(activeTab.id, {workItemToMatch: workItemId, workItems: workItemsToAdd}, (res) =>
    {
      if(res.error)
      {
        alert(res.error)
      }
    })
  })
}

$('input[name="bulkTypeTaskSelector"]').change(e =>
  {
    console.log(e.currentTarget.id)
    if(e.currentTarget.id === "bulkTypeTaskSelectorTesters")
    {
      bulkType = "testing_tester"
      loadTesterOptions()
    }
    else if (e.currentTarget.id === "bulkTypeTaskSelectorDevices")
    {
      bulkType = "testing_devices"
      loadDeviceOptions()
    }
  })

loadForm()
