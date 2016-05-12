AutoForm.addInputType("selectize-methods", {
  template: "afSelectizeMethods",
  valueOut: function(){
    if (this && this[0].selectize) {
      return this[0].selectize.getValue()
    }
  }
})
