$(document).ready(function () {
  var strHtmlOutput = "";
  $.ajax("/project/byuser/" + userID, {
    dataType: "json",
    error: function () {
      console.log("ajax error ");
    },
    success: function (data) {
      if (data.length > 0) {
        if (data.status && data.status === "error") {
          strHtmlOutput = "<li>Error: " + data.error + "</li>";
        } else {
          var intItem,
            totalItems = data.length;
          arrLI = [];
          for (intItem = 0; intItem <= totalItems - 1; intItem++) {
            arrLI.push(
              // '<a href="/project/' +
              //   data[intItem]._id +
              //   '">' +
              //   data[intItem].projectName +
              //   "</a>",
              `<a href="/project/${data[intItem]._id}">  ${data[intItem].projectName}  </a>`
            );
          }
          strHTMLOutput = "<li>" + arrLI.join("</li><li>") + "</li>";
        }
      } else {
        strHTMLOutput = "<li>You haven't created any projects yet</li>";
      }
      //select the item with the id myprojects
      $("#myprojects").html(strHTMLOutput);
    },
  });
});
