Template.afSelectizeMethods.onCreated(function() {
  // vars
  let {atts} = this.data
  checkAtts(atts)
  this.dsKey = atts['data-schema-key']
  this.initialOption = new ReactiveVar()
  // helpers
  this.placeholder = function(){
    return atts.placeholder || "Select one"
  }  
  this.valueOut = function(){
    if (this.selectedOption.get()) {
      return this.selectedOption.get().value
    } else if (this.initialOption.get()) {
      return this.initialOption.get().value
    }
  }
  this.atts = function(){
    let atts = _.clone(this.data.atts)
    delete atts.fetchMethods
    delete atts.inputPlaceholder
    return atts
  }
})

Template.afSelectizeMethods.onRendered(function() {
  let {atts} = this.data
  let initSelectize = (parOpts={})=> {
    let initOpts = {
      valueField: 'value',
      labelField: 'label',
      searchField: 'label',
      sortField: 'label',
      load: (query, callback)=> {
        // fetch data via Methods
        Meteor.call(atts.fetchMethods.search, query, function(err, res){
          errs(err)
          if (res) {
            callback(res)
          }
        })
      }
    }
    Meteor.defer(()=>{
      this.$selectize = this.$('select').selectize(_.extend(parOpts, initOpts))
    })
  }
  
  if (this.data.value) {
    // fetch initial option first...
    Meteor.call(atts.fetchMethods.initial, this.data.value, (err, res)=>{
      errs(err)
      if (res) {
        this.initialOption.set(res)
      }
      // ...and init selectize
      initSelectize(atts.selectizeOptions)
      })
  } else {
    // init selectize
    initSelectize(atts.selectizeOptions)
  }
})

Template.afSelectizeMethods.onDestroyed(function (){
  var $elem = this.$('select')[0]
  if ($elem) {
    $elem.selectize.destroy()
  }
})


Template.afSelectizeMethods.helpers({
  "instance": ()=> Template.instance()
})

function errs(err) {
  if (err) {
    console.error(err)
  } 
}

function checkAtts(atts) {
  if (atts && atts.fetchMethods){
    if (!atts.fetchMethods.initial) {
      console.error("'fetchMethods' needs the prop 'initial'")
    }
    if (!atts.fetchMethods.search) {
      console.error("'fetchMethods' needs the prop 'search'")
    }
  } else {
    console.error("You need to pass a 'fetchMethods' prop")
  }
}
