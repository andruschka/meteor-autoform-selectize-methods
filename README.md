# selectize-methods
A Meteor-Methods based Selectize for [aldeed:autoform](https://github.com/aldeed/meteor-autoform). Provides the custom input type, "selectize-methods", which renders a select using the [selectize](http://brianreavis.github.io/selectize.js/) plugin.   
**-> Available options will be loaded by Meteor Methods!**  
**-> So you don't need to handle Subscriptions - e.g. for huge data stacks...**   
**-> Currently no multi select available**

## Prerequisites

The plugin library must be installed separately.

In a Meteor app directory, enter:

```bash
$ meteor add aldeed:autoform
$ meteor add chhib:selectize-bootstrap-3
```

## Installation

In a Meteor app directory, enter:

```bash
$ meteor add andruschka:autoform-selectize-methods
```

## Usage
Just create 2 Methods for fetching the data. The first one is for getting the option Object for an already set value (for example if you are updating an exiting document). The second is for fetching search results as selectable options.


### Initial Method
Gets (only) invoked by an "update" autoform-field (to get the label for the set value)
- Passes param: the current value of the doc
- Needs to return: an Object (containing a value and label)

### Search Method
Gets invoked as the user types.
- Passes Param: the current searchString
- Needs to return: an Array with Objects (containing a value and label)

### The option Object
Each returned option Object needs a value (this will get stored to the DB) and a label (this will be displayed).
```
= {value: "1003", label: "Betawerk"}
```

### Example
```javascript
Meteor.methods({
  "supplier_option_by_no": function(no) {
    // initial fetch
    let supplier =  Suppliers.findOne({no})
    // the first Method should return one! doc with label & value
    return {label: supplier.name, value: supplier.no}
  },
  "suppliers_options": function(searchString){
    // for searching
    var result = []
    if (searchString) {
      let rgx = new RegExp(`${searchString}.*`, 'i')
      result =  Suppliers.find({name: rgx}, {limit: 10}).fetch().map(sup => { 
        return {label: sup.name, value: sup.no}
      })
    }
    // the second Method should return the search results as array
    // a result also contains a label and a value
    return result
  }
})
```
Finally edit your schema like this:
```javascript

var Item = new SimpleSchema({
  name: {
    type: String,
    index: 1,
    label: "Item Name"
  },
  supplierNo: {
    type: String,
    label: "Supplier",
    autoform: {
      type: 'selectize-methods',
      placeholder: "Select Supplier", // custom placeholder
      selectizeOptions: {}, /// you know what it is...
      fetchMethods: {
        initial: 'supplier_option_by_no', // name of initial Method
        search: 'suppliers_options' // name of search Method
      }
    }
  }
})
```
