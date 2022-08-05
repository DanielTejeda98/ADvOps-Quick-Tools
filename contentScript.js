chrome.runtime.onMessage.addListener(
  (request, sender, sendResponse) => {
    console.log(request.workItemToMatch)
    if (!!request.workItemToMatch)
    {
      //find the work item
      const workItemRowIdentified = findWorkItem(request.workItemToMatch)
      if(!workItemRowIdentified)
      {
        sendResponse({error: "No PBI was found!"})
      }
      createWorkItems(workItemRowIdentified, request.workItems)
    }
  }
)

const findWorkItem = (workItemId) =>
{
  //Change nodelist objects to an array to search easier for elements
  const idDivs = Array.from(document.querySelectorAll("td.taskboard-parent"))
  let workItemRow = null
  //Filter and find the work item
  idDivs.filter(workItem => {
    if(workItem.querySelector(".id").innerHTML === workItemId )
    {
      workItemRow = workItem.parentElement
      return true
    }
  });

  return workItemRow

}

const createWorkItems = (workItemRow, workItems) =>
{

  workItems.forEach((workItem, index) =>
  { 
    setTimeout(() =>
    {
      const newItemButton = workItemRow.querySelector(".add-new-item")
      if(newItemButton)
      {
        newItemButton.click()
      }
      else
      {
        console.log('No button to click!')
      }
      setTimeout(() =>
      {
        const titleArea = document.querySelector("textarea")
        titleArea.value = workItem.title
        titleArea.blur()
      }, 1000)
      
    }, index * 3000)
  })
}