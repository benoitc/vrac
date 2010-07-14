exports.createThumb = function(app, row) {
  var doc = row.value;
  
  var img = new Image();
  // added cause it wasnt defined
  var canvas = document.createElement("canvas");
  
  $(canvas).appendTo($("#" + doc._id + " a"))

  var ctx = canvas.getContext("2d");
  var canvasCopy = document.createElement("canvas");

  var bgw = $("#bgwork");
  
  $(canvasCopy).appendTo(bgw);

  var copyContext = canvasCopy.getContext("2d");

  img.onload = function()
  {
    var ratio = 1;

    // defining cause it wasnt
    var maxWidth = 180,
        maxHeight = 180;

    if(img.width > maxWidth)
            ratio = maxWidth / img.width;
    else if(img.height > maxHeight)
            ratio = maxHeight / img.height;

    canvasCopy.width = img.width;
    canvasCopy.height = img.height;
    copyContext.drawImage(img, 0, 0);

    canvas.width = img.width * ratio;
    canvas.height = img.height * ratio;

    ctx.drawImage(canvasCopy, 0, 0, canvas.width, canvas.height);
                
    var dataURL = canvas.toDataURL();
    
    // get content type and base64
    parts = dataURL.split(",");
    var data = parts[1];
    var meta = parts[0];
    
    var meta_parts = meta.substr(5).split(";");
    var ctype = meta_parts[0];
    
    // save thumbnail in attachments
    var attachments = doc["_attachments"] || {};
    attachments["thumb_" + row.thumb_name] = {
      data: data,
      content_type: ctype
    };  
    doc["_attachments"] = attachments;
    app.db.saveDoc(doc);

    $(canvasCopy).remove()
          
  };

  img.src = row.att_uri;
}