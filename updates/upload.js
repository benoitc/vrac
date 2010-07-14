function(doc, req) {
  
  log(req.query)
  
  if (!doc) {
    return [null, {
      json: {"error": true, "reason": "no doc"}
    }];
  } else {
    var imageUrl = req.query.image || "",
        name = req.query.name || "";
    
    if (!imageUrl || !name) 
      return [null, {
        json: {"error": true, "reason": "invalid url or name"}
      }];
    
    
    [meta, data] = image.split(",");
    
    [ctype, format] = meta.substr(5).split(";");

    var attachments = doc["_attachments"] || {};
    
    attachments[name] = {
      "data": data,
      "content-type": ctype
    };
    
    doc["_attachments"] = attachments;
    
    return [doc, {
      json: { "ok": true }
    }]
  }
  
}