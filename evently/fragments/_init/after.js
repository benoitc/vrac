function(data) {
  
  var app = $$(this).app;
  
  var util = app.require("lib/util");
    
  if (data.nothumb.length) {
    data.nothumb.map(function(r) {
      util.createThumb(app, r)
    });
    
  }
  
  
}