function(doc) {
  if (doc.type && doc.type == "fragment") {
    emit(doc._id, doc);
  }
}