var alerts = []
//Hide alert div on load
$("#alerts").hide()


const createAlert = (alertClass) =>
{
  const alertUl = `
  <ul id="alertList">
      
  </ul>
  `

  $("#alerts").addClass(`alert alert-${alertClass} alert-dismissible`)
  $("#alerts").html(alertUl + `<button type="button" class="btn-close" id="btn-alert-close" aria-label="Close"></button>`)

  if(alerts.length > 0)
  {
    alerts.forEach(alert =>
      {
        $("#alertList").append(`<li>${alert}</li>`)
      })
      $("#alerts").show()
  }
  //clear alerts array after its been shown
  alerts = []
  $('#btn-alert-close').click(() =>
  {
    $('#alerts').hide()
  }) 
}