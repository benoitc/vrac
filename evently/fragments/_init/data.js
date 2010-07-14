function(data) {
  
  var base_uri = "/vrac/";
  
  data.nothumb = [];

  return {
     fragments: data.rows.map(function(r) {
       var doc = r.value;
       
       var thumb_name = "";
       var thumb_uri = "";
       var uri = "#";
       var thumb_name = "";
       
       var nothumb = true;
       if (/^(?:image|audio|video|file)$/.test(doc.fragment_type)) {
         for (att_name in doc._attachments) {
           if (att_name.startsWith("thumb_")) {
             thumb_uri= base_uri + doc._id + "/" + att_name;
             nothumb = false;
           } else {
             uri = base_uri + doc._id + "/" + att_name;
             thumb_name = att_name;
           }
         }
       }
       
       if (nothumb) {
         var row_thumb = $.extend(true, {}, r, {
                  att_uri: uri,
                  thumb_name: thumb_name
                });
       
         data.nothumb.push(row_thumb);
       }

       var title = doc.title || "";
       
       return {
         id: doc._id,
         uri: uri,
         title: title,
         class_: doc.fragment_type,
         thumb_uri: thumb_uri
       };
     })
  }
}
