document.querySelector("#submit").addEventListener("click", () =>
{
  window.close()
  const workItemElement = document.querySelector("#workItemCode")
  const workItemId = workItemElement.value.trim()
  const prefix = document.querySelector("#prefix").value.trim()
  const taskTitle = document.querySelector("#taskTitle").value.trim()
  const checkboxes = document.getElementsByName("testing_devices")
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
})

document.querySelector("#selectAll").addEventListener("click", () =>
{
  const checkboxes = document.getElementsByName("testing_devices")
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